import { initializeApp } from "firebase/app";
import {
   getFirestore,
   collection,
   addDoc,
   onSnapshot,
   doc,
} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import {
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   updateProfile,
} from "firebase/auth";

const firebaseConfig = {
   apiKey: process.env.REACT_APP_API_KEY,
   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   projectId: process.env.PROJECT_ID,
   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_ID,
   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const db = getFirestore(app);
// const analytics = getAnalytics(app);

// register
export const register = async (email, password) => {
   try {
      const { user } = await createUserWithEmailAndPassword(
         auth,
         email,
         password
      );
      console.log(auth.currentUser.uid);
      return user;
   } catch (err) {
      console.log(err.message);
   }
};

// login
export const login = async (email, password) => {
   try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
   } catch (err) {
      console.log(err.message);
   }
};

// update
export const update = (data) => {
   try {
      const { user } = updateProfile(auth.currentUser, data);
      return user;
   } catch (err) {
      console.log(err);
   }
};

// getDocs
export const getData = () => {
   onSnapshot(doc(db, "messages", "I4kPbju4x773OivP0k2W"), (doc) => {
      console.log("Current data: ", doc);
   })
};

// setDocs
export const addMessage = async (data) => {
   const docRef = await addDoc(collection(db, "almali"), data);
   console.log(docRef.id);
};
