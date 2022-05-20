const firebaseConfig = {
  apiKey: 'AIzaSyBLXkG3mvUcNUO5CsBLvvj_QH81QCjA28Y',
  authDomain: 'quiet-grail-344808.firebaseapp.com',
  projectId: 'quiet-grail-344808',
  storageBucket: 'quiet-grail-344808.appspot.com',
  messagingSenderId: '708330870729',
  appId: '1:708330870729:web:9430f6293efd0fb781ba18',
  measurementId: 'G-YC4PTSQVRB',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// dbRef
const chatsRef = db.collection('chats');

// cek apakah user sudah terdaftar atau belum
// return true if exist, false if does not exists
function isUserExists(email) {
  return chatsRef
    .doc(email)
    .get()
    .then((doc) => {
      return doc.exists;
    });
}

// function delete user
async function deleteUser(email) {
  const userRef = chatsRef.doc(email);
  const batch = db.batch();
  // delete collection message terlebih dahulu,
  const messages = await userRef.collection('messages').get();
  messages.forEach((doc) => {
    batch.delete(doc.ref);
  });

  // baru delete doc user
  batch.delete(userRef);

  // commit
  await batch.commit();
}

// function delete user message
async function deleteUserMessages(email) {
  const batch = db.batch();

  const messages = await chatsRef.doc(email).collection('messages').get();

  messages.forEach((message) => {
    batch.delete(message.ref);
  });

  // commit
  await batch.commit();
}

// function add User()
async function addUser(email) {
  await chatsRef.doc(email).set({
    email: email,
    updated_at: firebase.firestore.Timestamp.now(),
    created_at: firebase.firestore.Timestamp.now(),
    unread_admin: 0,
    unread_user: 0,
  });
}

// function add message
async function addMessage(email, { msg, from }) {
  // buat message Ref
  const userRef = chatsRef.doc(email);
  const messageRef = userRef.collection('messages');

  // cek apakah pesan dari admin atau bukan
  let to = 'admin';
  let seen = false;
  if (from === 'admin') {
    // ubah to menjadi user
    to = 'user';

    // cek dimana user berada
    if ((await getWhere('user')) === 'stay') seen = true;
  } else {
    // jika dari user
    // cek dimana admin sekarang
    // jika sama dengan email yang sekarang
    // maka seen menjadi true
    if ((await getWhere('admin')) === email) seen = true;
  }

  // tambahkan message baru
  await messageRef.add({
    created_at: firebase.firestore.Timestamp.now(),
    from: from,
    to: to,
    msg: msg,
    seen: seen,
  });

  // hitung jumlah pesan yang belum dibaca
  const unread = await userRef
    .collection('messages')
    .where('seen', '==', false)
    .where('from', '==', from)
    .get();

  // jika pesan dari admin
  // update unread_user
  if (from === 'admin') {
    await userRef.update({
      updated_at: firebase.firestore.Timestamp.now(),
      unread_user: unread.size,
    });
  } else {
    await userRef.update({
      updated_at: firebase.firestore.Timestamp.now(),
      unread_admin: unread.size,
    });
  }
}

// untuk mendapatkan pesan user berdasarkan email
function getSnapshotMessages(email, callback) {
  chatsRef
    .doc(email)
    .collection('messages')
    .orderBy('created_at')
    .onSnapshot(
      (querySnaphot) => {
        let isNotModified = true;
        querySnaphot.docChanges().forEach((change) => {
          if (change.type === 'modified') {
            isNotModified = false;
          }
        });

        if (isNotModified) callback(querySnaphot);
      },
      (error) => {
        console.log(error);
      }
    );
}

// untuk mendapatkan data baru tanpa snapshot
// return messages
function getMessages(email) {
  return chatsRef.doc(email).collection('messages').orderBy('created_at').get();
}

// dapatkan semua user
function getUser(callback) {
  chatsRef.orderBy('updated_at', 'desc').onSnapshot(
    (querySnapshot) => {
      let userChange = false;
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          // return change.doc.data();
          userChange = change.doc.data();
        }
      });

      callback(querySnapshot, userChange);
    },
    (error) => {
      console.log(error);
    }
  );
}

// render chat item
function renderChatItem(message) {
  // siapkan waktunya
  const seconds = message.created_at.toDate();
  const time = new Date(seconds).toLocaleTimeString('en-GB').split(':');

  return /* html */ `
    <li class="p-2 mb-2 rounded-3 col-10 ${
      message.to === 'admin' ? 'user-chat' : ''
    }">
      <p class="m-0">${message.msg}</p>
      <span class="text-end time d-block">${time[0]} : ${time[1]}</span>
    </li>
  `;
}

// render chat box
function renderChat(to, chatList) {
  let menu = '';
  if (to !== 'admin') {
    menu = /* html */ `
      <div class="col-auto">
        <div class="dropdown-toogle px-2" id="chatDropdown" role="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
          <i class="fa-solid fa-ellipsis-vertical fa-xl"></i>
        </div>
        <ul class="dropdown-menu rounded-3" aria-labelledby="chatDropdown">
          <li><a class="dropdown-item" role="button" id="kill-chat" data-email="${to}">Kill Chat</a></li>
        </ul>
      </div>
    `;
  }
  return /* html */ `
  <div class="col-auto chat-header rounded-top p-2">
    <div class="row align-items-center">
      <div class="col-auto image">
        <img src="http://nicesnippets.com/demo/man01.png" class="rounded" />
      </div>
      <div class="col user-detail">
        <h6 class="pt-1">${to}</h6>
      </div>
      ${menu}
    </div>
  </div>
  <div class="col chat-content p-0 bg-white border border-top-0">
    <ul class="px-3 pt-1 mb-1">${chatList}</ul>
  </div>
  <div class="col-auto chat-footer msg-box p-2 rounded-bottom border-top-0">
    <form id="message" action="">
      <div class="row">
        <div class="col">
          <input
            type="text"
            class="form-control"
            placeholder="message ..."
            name="message"
            id="message"
            autofocus
          />
        </div>
        <div class="col-auto">
          <button class="btn btn-success">Send</button>
        </div>
      </div>
    </form>
  </div>`;
}

// function ini mengubah nilai see disetiap pesan menjadi true
async function changeToSee(email, from) {
  const userRef = chatsRef.doc(email);

  const messages = await userRef
    .collection('messages')
    .where('seen', '==', false)
    .where('from', '==', from)
    .get();

  const batch = db.batch();

  // jika pesan yang mau diganti from user,
  // maka admin yang melihat pesan tersebut
  if (from === 'user') {
    batch.update(userRef, {
      unread_admin: 0,
    });
  } else {
    // sebaliknya
    batch.update(userRef, {
      unread_user: 0,
    });
  }

  messages.forEach((message) => {
    batch.update(message.ref, {
      seen: true,
    });
  });

  batch.commit();
}

// admin
// return string
function getWhere(doc) {
  return db
    .collection('helper')
    .doc(doc)
    .get()
    .then((doc) => doc.data().where);
}

// param string
function setWhere(place, doc) {
  db.collection('helper')
    .doc(doc)
    .update({
      where: place,
    })
    .then(() => true);
}

// hitung jumlah pesan yang belum dibaca oleh user
async function getUnreadUser(email) {
  const unread = await chatsRef
    .doc(email)
    .collection('messages')
    .where('seen', '==', false)
    .where('from', '==', 'admin')
    .get();
  return unread.size;
}

// function to get current message from user
function getCurrMessage(userRef) {
  return userRef
    .collection('messages')
    .orderBy('created_at', 'desc')
    .limit(1)
    .get()
    .then((messages) => messages.docs[0].data().msg);
}
