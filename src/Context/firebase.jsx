import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUr2nayXc3t7DGcxoiIASRAsE19WC0gGo",
  authDomain: "bookhaven-813b4.firebaseapp.com",
  projectId: "bookhaven-813b4",
  storageBucket: "bookhaven-813b4.appspot.com",
  messagingSenderId: "498211517357",
  appId: "1:498211517357:web:86ddd4ebb602a2b3396724",
};

const FirebaseContext = createContext(null);

const app = initializeApp(firebaseConfig);

export const useFirebase = () => useContext(FirebaseContext);

const firebaseAuth = getAuth(app);
const firestore = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  const signUpWithEmailAndPassword = async (email, password) => {
    const result = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    return result.user;
  };
  const signinWithEmailAndPassword = async (email, password) => {
    const result = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    return result.user;
  };
  const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const handleCreateNewListing = async (name, isbn, price, description) => {
    const bookData = {
      name: name,
      isbnNumber: isbn,
      price: price,
      description: description,
    };
    console.log("Saving to Firebase:", bookData);
    const docRef = await addDoc(collection(firestore, "books"), bookData);
    console.log("Document written with ID:", docRef.id);
  };

  const getAllBooks = async () => {
    const querySnapshot = await getDocs(collection(firestore, "books"));
    console.log(
      "Retrieved books:",
      querySnapshot.docs.map((doc) => doc.data())
    );
    return querySnapshot;
  };

  const isLoggedIn = user ? true : false;

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  return (
    <FirebaseContext.Provider
      value={{
        signUpWithEmailAndPassword,
        signinWithEmailAndPassword,
        signInWithGoogle,
        handleCreateNewListing,
        getAllBooks,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
