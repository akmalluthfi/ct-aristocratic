$(document).ready(function () {
  // set awal mula admin berada
  setWhere('begin', 'admin');

  // load semua user
  // mengembalikan semua user, dan user yang diupdate
  getUser(async (users, changeEmail) => {
    // buat userList
    let userList = '';
    const docs = users.docs;
    // cek jika admin berada ditempat yang sama dengan data yang update
    if (changeEmail) {
      const active = await getWhere('admin');
      if (active === changeEmail) {
        // render ulang chat
        await renderUIChat(changeEmail);
      }
    }

    for (const doc of docs) {
      const currMessage = await getCurrMessage(doc.ref);
      const unread = doc.data().unread_admin;
      const status = doc.data().status;
      userList += renderUserItem(doc.id, unread, currMessage, status);
    }

    // render userList
    $('.list-contact').html(userList);

    // event ketika admin click user
    $('.contact-item').click(handleClick);
  });
});

async function handleClick(e) {
  e.preventDefault();
  const email = $(this).data('email');

  // ubah posisi admin
  setWhere(email, 'admin');

  // ubah semua seen pada pesan dengan from dari user
  await changeToSee(email, 'user');

  // beri class active
  $(this).parent().children().removeClass('active');
  $(this).addClass('active');

  // dapatkan semua pesan dari email,
  // lalu render
  await renderUIChat(email);
}

function renderUserItem(email, unread, currMessage, status) {
  const badge_unread =
    unread === 0
      ? ''
      : `<span class="badge rounded-pill bg-danger float-end">${unread}</span></p>`;

  const badge_status =
    status == 'deleted'
      ? `<span class="badge rounded-pill bg-danger float-end">${status}</span></p>`
      : '';

  const dots = currMessage.length > 17 ? '...' : '';

  return /* html */ `
    <div class="row contact-item py-2 m-0" role="button" data-email="${email}">
      <div class="pe-2 col-auto">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar1.png"
          class="rounded-circle" width="48"
        />
      </div>
      <div class="p-0 col user-detail">
        <p class="pe-3 m-0"><span>${email}</span>
        ${badge_unread}${badge_status}
        <h6 class="p-0 m-0">${currMessage.substring(0, 17) + dots}</h6>
      </div>
    </div>
  `;
}

async function renderUIChat(email) {
  const messages = await getMessages(email);

  let chatList = '';
  messages.forEach((message) => {
    chatList += renderChatItem(message);
  });

  // cari element ubah isinya
  $('.content-wrapper').html(renderChat(email, chatList));

  // auto scroll bottom
  const element = $('div.chat-content');
  $(element).scrollTop($('ul', element).height());

  const messageDel = await isUserDeleted(email);
  if (messageDel !== false) {
    const seconds = messageDel.end_at.toDate();
    const time = new Date(seconds).toLocaleTimeString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    $('div.chat-content').append(
      `<div class="text-center mt-4">
        <button type="button" class="btn btn-outline-secondary w-75" disabled>This chat session has been ended by admin at ${time}</button>
      </div>`
    );
  }

  // auto focus pada input
  $('form#message input').focus();

  // tambahkan event untuk form
  $('form#message').submit(async function (e) {
    e.preventDefault();

    const message = $('input#message');

    await addMessage(email, {
      msg: message.val(),
      from: 'admin',
    });

    message.val('');
  });

  // tambahkan event untuk kill chat by admin
  $('a#kill-chat').click(function (e) {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#004e7f',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // cek apakah user sudah didelete
        const messageDel = await isUserDeleted($(this).data('email'));
        if (messageDel !== false) {
          const seconds = messageDel.end_at.toDate();
          const time = new Date(seconds).toLocaleTimeString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          // tampilkan pesan
          Swal.fire({
            icon: 'error',
            title: 'Sorry, this chat session has ended',
            text: `this chat session ended at ${time}`,
          });
        } else {
          await killChat($(this).data('email'));
        }
      }
    });
  });
}

async function killChat(email) {
  // buat chat dengan format khusus
  await endChat(email);
  console.log('berhasil membuat pesan baru pesan baru');
  // ubah status user menjadi deleted
  await changeToDeleted(email);
  console.log('berhasil mengubah status menjadi deleted');
}
