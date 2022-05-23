$(document).ready(function () {
  // event menampilkan live chat
  $('#btn-start-chat').click(async function (e) {
    e.preventDefault();

    let icon = $('i', this);

    if (icon.hasClass('fa-comment-dots')) {
      // hapus icon, ubah menjadi icon x
      icon.removeClass().addClass('fa-solid fa-xmark fa-xl');
      // beri tanda bahwa sekarang content sedang dibuka
      $(this).siblings('.chat').removeClass('close').addClass('open');

      // cek apakah user sedang login atau belum,
      if (window.userLogin !== undefined) {
        // set user where to stay
        setWhere('stay', 'user');
        // ubah semua seen pada pesan dari admin menjadi true
        await changeToSee(window.userLogin, 'admin');
        // hapus span notif
        $('button#btn-start-chat span').html('');
      }
    } else {
      // hapus icon, ubah menjadi icon comment
      icon.removeClass().addClass('fa-regular fa-comment-dots fa-xl');
      // beri tanda bahwa sekarang content diclose
      $(this).siblings('.chat').removeClass('open').addClass('close');

      // cek apakah user sedang login
      if (window.userLogin !== undefined) {
        // set user where to leave
        setWhere('leave', 'user');
      }
    }

    $(this).siblings('.chat').slideToggle();
  });

  // input data sebelum memulai chat
  $('form.start-chat').submit(async function (e) {
    e.preventDefault();

    const email = $('input#email', this).val();
    const message = $('textarea#message', this).val();

    await startChat(email, message);
  });
});

async function startChat(email, message) {
  // tentukan cara pembuatan user, dan mengembalikan email baru
  const newEmail = await createUser(email);

  // set default value
  setWhere('stay', 'user');

  // lalu tambahkan message;
  await addMessage(newEmail, { msg: message, from: 'user' });

  // set window userLogin
  window.userLogin = newEmail;

  // dapatkan data user chat
  getSnapshotMessages(newEmail, async (messages, endMessage) => {
    // render ulang tampilan chat
    let chatList = '';
    messages.forEach((message) => {
      chatList += renderChatItem(message);
    });

    // cek jika user sudah login dan element chat mempunyai class close
    if ($('.chat').hasClass('close')) {
      const unread_user = await getUnreadUser(window.userLogin);
      // cek jika unread bukan 0
      if (unread_user !== 0) {
        $('button#btn-start-chat span').html(unread_user);
      }
    }

    // cari element ubah isinya
    if (messages) {
      $('.chat').html(renderChat(messages[0].to, chatList));

      $('.chat').addClass('login');

      // auto scroll bottom
      const element = $('div.chat-content');
      $(element).scrollTop($('ul', element).height());

      // auto focus pada input
      $('form#message input').focus();
    }

    // cek apakah chat telah berakhir
    if (endMessage) {
      const seconds = endMessage.end_at.toDate();
      const time = new Date(seconds).toLocaleTimeString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      $('div.chat-content').append(
        `<div class="text-center mt-4">
          <button type="button" class="btn btn-outline-secondary w-75" disabled>
            <small>This chat session has been ended by admin at ${time}</small>
          </button>
          <button type="button" class="btn btn-outline-secondary w-75 mt-2" disabled>
            <small>You can start a new chat by refreshing the page</small>
          </button>
        </div>`
      );

      // matikan input pada form
      const form = $('form#message');
      $('input', form).attr('disabled', 'disabled');
      $('button', form).attr('disabled', 'disabled');
    }

    // auto scroll bottom
    const element = $('div.chat-content');
    $(element).scrollTop($('ul', element).height());

    // tambahkan event untuk form
    $('form#message').submit(async function (e) {
      e.preventDefault();

      const message = $('input#message');

      await addMessage(newEmail, { msg: message.val(), from: 'user' });
    });
  });
}

async function createUser(email) {
  // cek apakah user dengan email=email dan status=active

  // jika ada hapus, lalu buat baru
  // jika tidak ada, buat/timpa jika ada

  const { exists, isActive, user } = await isUserExists(email);

  if (exists === false) {
    // buat baru
    // tambahkan user, buat baru jika belum ada
    await addUser(email, email);
    // console.log('buat email baru pertama dan return email', email);
    return email;
  }

  if (exists == true && isActive == true) {
    // timpa (hapus pesan terlebih dahulu)
    // console.log('menimpa user dengan email', user.id);
    await deleteUserMessages(user.id);
    await addUser(user.id, email);
    return user.id;
  } else {
    // buat user dengan user_1++
    let [oldEmail, count = 0] = user.id.split('_');
    count = parseInt(count);
    const newEmail = `${oldEmail}_${count + 1}`;

    addUser(newEmail, email);
    return newEmail;
    // console.log('menambah user baru dengan email', newEmail);
  }
}
