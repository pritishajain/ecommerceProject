import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, collection} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCua-2wBA6ChWYG_1rpUlqRX41HMNvII5U",
  authDomain: "ecommerce-e8895.firebaseapp.com",
  projectId: "ecommerce-e8895",
  storageBucket: "ecommerce-e8895.appspot.com",
  messagingSenderId: "921870911167",
  appId: "1:921870911167:web:498f625b26ac4afcb5e80a",
  measurementId: "G-7J5E6EH3JE",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = initializeFirestore(app, {
	experimentalAutoDetectLongPolling: true
  })
const productCollection = collection(db,'Product');
const userCollection = collection(db,'UserInformation');

export { app, auth, db , productCollection, userCollection};
