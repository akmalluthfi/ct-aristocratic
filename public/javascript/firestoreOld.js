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

// get all user
async function getUser(callback) {
  const userRef = await db.collection('chats').onSnapshot((snapshot) => {
    callback(snapshot);
  });
  // return userRef.map((doc) => doc.data());
}

// getMessage
const getMessages = async (email) => {
  // get user message ref
  await db
    .collection('chats')
    .doc(email)
    .collection('messages')
    .orderBy('created_at')
    .onSnapshot((messagesRef) => {
      // loop and store to variables
      let messages = [];
      messagesRef.forEach((docRef) => {
        messages.push(docRef.data());
      });

      render(email, messages);
    });
};

// add Message
const addMessage = async (email, { from, msg }) => {
  // buat ref
  const userRef = db.collection('chats').doc(email);
  // tambahkan data
  await userRef.set({
    email: email,
  });

  const to = from === 'admin' ? 'user' : 'admin';
  await userRef.collection('messages').add({
    from: from,
    to: to,
    created_at: firebase.firestore.Timestamp.now(),
    msg: msg,
  });

  return true;
};

// delete Message
const deleteMessages = async (email) => {
  // buat user Ref
  const userRef = db.collection('chats').doc(email);
  // buat message ref
  const messagesRef = await userRef.collection('messages').get();
  // buat batch
  const batch = db.batch();

  // hapus semua messages
  messagesRef.forEach((doc) => {
    batch.delete(doc.ref);
  });

  // hapus user
  // batch.delete(userRef);

  // commit
  await batch.commit();
  return true;
};

const startChat = async (email, message) => {
  // hapus semua chat dengan email yang dimasukkan
  await deleteMessages(email);

  // tambahkan pesan yang  baru
  await addMessage(email, {
    from: email,
    msg: message,
  });

  // ambil data secara realtime
  await getMessages(email);
};

const render = (email, messages) => {
  // render tiap pesan
  let messagesUI = '';
  messages.forEach((message) => (messagesUI += renderChat(message)));

  // console.log(messages);
  // render pesan ke dalam ul
  $('div.chat-main').html(changeChatContent('Admin', messagesUI));

  // auto scroll bottom
  const element = $('div.chat-content');
  $(element).scrollTop($('ul', element).height());

  // tangani event form untuk send message
  $('form#message').submit(function (e) {
    e.preventDefault();

    const message = $('input#message');

    addMessage(email, {
      from: email,
      msg: message.val(),
    }).then(() => {
      message.val('');
    });
  });
};

const renderChat = (message = '') => {
  // console.log(message.created_at);
  const seconds = message.created_at.toDate();
  const time = new Date(seconds).toLocaleTimeString('en-GB').split(':');

  return /* html */ `
    <li class="p-2 mb-1 rounded-3 col-11 ${
      message.to === 'admin' ? 'user-chat' : ''
    }">
      <p class="m-0">${message.msg}</p>
      <span class="text-end time d-block">${time[0]} : ${time[1]}</span>
    </li>
  `;
};

const changeChatContent = (email, chatList) => {
  return /* html */ `
    <div class="chat-header rounded-top p-2">
      <div class="row align-items-center">
          <div class="col-auto image">
            <img src="http://nicesnippets.com/demo/man01.png" class="rounded" />
          </div>
          <div class="col user-detail">
            <h6 class="pt-1">${email}</h6>
            <i class="fa fa-circle active ms-1" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div class="chat-content p-0 bg-white border border-top-0">
        <ul class="px-3 pt-1 mb-1">${chatList}</ul>
      </div>
      <div class="chat-footer msg-box p-2 rounded-bottom border-top-0">
        <form id="message" action="">
          <div class="row">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="message ..."
                name="message"
                id="message"
              />
            </div>
            <div class="col-auto">
              <button class="btn btn-success">Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;
};

// async function coba(email) {
//   await startChat(email);
// }

// coba('akmal@gmail.com');
// addMessage('hola@gmail.com', {
//   // from: 'hola@gmail.com',
//   from: 'admin',
//   msg: 'Iya Nanya apa?',
// }).then(() => {
//   console.log('berhasil ditambahkan');
// });
// getMessages('hola@gmail.com').then((docs) => console.log(docs));
