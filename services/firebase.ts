import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from "constants/config";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { store } from "redux/store";
import { setChats, setMessages } from "redux/slices/chat";
import { IChat, IMessage } from "interfaces";
import { error } from "components/alert/toast";

const firebaseConfig = {
  apiKey: "AIzaSyAMEfLaFaGqv5s_4JVyTxUL76Xt2G7Pklc",
  authDomain: "baraliveflutter.firebaseapp.com",
  projectId: "baraliveflutter",
  storageBucket: "baraliveflutter.appspot.com",
  messagingSenderId: "322242426099",
  appId: "1:322242426099:web:a8ff4f8db920c49d6e7386",
  measurementId: "G-VLE4TLZPYM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export { app as default };

export const storage = getStorage(app);
export const db = getFirestore(app);

onSnapshot(
  query(collection(db, "messages"), orderBy("created_at", "asc")),
  (querySnapshot) => {
    const messages = querySnapshot.docs.map((x) => ({
      id: x.id,
      ...x.data(),
      created_at: String(new Date(x.data().created_at?.seconds * 1000)),
    }));
    store.dispatch(setMessages(messages));
  }
);
onSnapshot(
  query(collection(db, "chats"), orderBy("created_at", "asc")),
  (querySnapshot) => {
    const chats = querySnapshot.docs.map((x) => ({
      id: x.id,
      ...x.data(),
      created_at: String(new Date(x.data().created_at?.seconds * 1000)),
    }));
    store.dispatch(setChats(chats));
  }
);

export async function sendMessage(payload: IMessage) {
  try {
    await addDoc(collection(db, "messages"), {
      ...payload,
      created_at: serverTimestamp(),
    });
  } catch (err) {
    console.log("err => ", err);
    error("chat error");
  }
}

export async function createChat(payload: IChat) {
  try {
    await addDoc(collection(db, "chats"), {
      ...payload,
      created_at: serverTimestamp(),
    });
  } catch (err) {
    console.log("err => ", err);
    error("chat error");
  }
}
