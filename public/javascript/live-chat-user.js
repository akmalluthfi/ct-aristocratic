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
  // hapus semua chat user / meskipun user tersebut tidak ada
  await deleteUserMessages(email);

  // tambahkan user, timpa jika ada, buat baru jika belum ada
  await addUser(email);

  // set default value
  setWhere('stay', 'user');

  // lalu tambahkan message;
  await addMessage(email, { msg: message, from: 'user' });

  // set window userLogin
  window.userLogin = email;

  // dapatkan data user chat
  getSnapshotMessages(email, async (messages) => {
    // render ulang tampilan chat
    let chatList = '';
    messages.forEach((message) => {
      chatList += renderChatItem(message.data());
      // console.log(message);
    });

    console.log('huh? updated');

    // cek jika user sudah login dan element chat mempunyai class close
    if ($('.chat').hasClass('close')) {
      const unread_user = await getUnreadUser(window.userLogin);
      // cek jika unread bukan 0
      if (unread_user !== 0) {
        $('button#btn-start-chat span').html(unread_user);
      }
    }

    // cari element ubah isinya
    if (!messages.empty) {
      $('.chat').html(renderChat(messages.docs[0].data().to, chatList));
      $('.chat').addClass('login');
      // auto scroll bottom
      const element = $('div.chat-content');
      $(element).scrollTop($('ul', element).height());
    }

    // auto scroll bottom
    const element = $('div.chat-content');
    $(element).scrollTop($('ul', element).height());

    // tambahkan event untuk form
    $('form#message').submit(async function (e) {
      e.preventDefault();

      const message = $('input#message');

      await addMessage(email, { msg: message.val(), from: 'user' });
    });
  });
}
