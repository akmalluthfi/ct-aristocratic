$(document).ready(function () {
  // set awal mula admin berada
  setWhere('begin', 'admin');

  // load semua user
  // mengembalikan semua user, dan user yang diupdate
  getUser(async (users, user) => {
    // buat userList
    let userList = '';
    const docs = users.docs;

    // cek jika admin berada ditempat yang sama dengan data yang update
    if (user !== false) {
      const active = await getWhere('admin');
      if (active === user.email) {
        // render ulang chat
        await renderUIChat(user.email);
      }
    }

    for (const doc of docs) {
      const currMessage = await getCurrMessage(doc.ref);
      const unread = doc.data().unread_admin;
      userList += renderUserItem(doc.id, unread, currMessage);
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

function renderUserItem(email, unread, currMessage) {
  const status =
    unread === 0
      ? ''
      : `<span class="badge rounded-pill bg-danger float-end">${unread}</span></p>`;

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
        ${status}
        <h6 class="p-0 m-0">${currMessage.substring(0, 17) + dots}</h6>
      </div>
    </div>
  `;
}

async function renderUIChat(email) {
  const messages = await getMessages(email);

  let chatList = '';
  messages.forEach((message) => {
    chatList += renderChatItem(message.data());
  });

  // cari element ubah isinya
  $('.content-wrapper').html(renderChat(email, chatList));

  // auto focus pada input
  $('form#message input').focus();

  // auto scroll bottom
  const element = $('div.chat-content');
  $(element).scrollTop($('ul', element).height());

  // tambahkan event untuk form
  $('form#message').submit(async function (e) {
    e.preventDefault();

    const message = $('input#message');

    await addMessage(email, {
      msg: message.val(),
      from: 'admin',
    });
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
    }).then((result) => {
      if (result.isConfirmed) killChat($(this).data('email'));
    });
  });
}

function killChat(email) {
  // buat date
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = 'end' + date + 'at' + time;

  // ganti id email diatas dengan email
  console.log(dateTime);
}
