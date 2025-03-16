// main firebase initialization
import { initializeApp } 
from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js'


//  firebase auth initialization
import { 
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword ,
signOut,
onAuthStateChanged,
sendEmailVerification,
sendPasswordResetEmail,
updatePassword ,
GoogleAuthProvider,
signInWithPopup
} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js'


// firebase firestore

import { 
getFirestore,
doc,
setDoc,
getDoc,
collection,
addDoc,
serverTimestamp,
updateDoc,
deleteDoc ,
onSnapshot,
query, 
getDocs,
where



} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjFbx9QNgo2kXY30W9g8CsbeAJt8E5CJk",
  authDomain: "blogs-app-fde53.firebaseapp.com",
  projectId: "blogs-app-fde53",
  storageBucket: "blogs-app-fde53.firebasestorage.app",
  messagingSenderId: "452804608986",
  appId: "1:452804608986:web:448f7493bd7b1aed74f6e3"
};

// Initialize Firebase
let  app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication
let auth = getAuth(app)
//firebase firestore
let db = getFirestore(app);

export{
auth,
createUserWithEmailAndPassword,  
signInWithEmailAndPassword ,
signOut,
onAuthStateChanged,
sendEmailVerification,
sendPasswordResetEmail,
updatePassword ,
GoogleAuthProvider,
signInWithPopup,
//firestore
db,
doc, 
setDoc,
getDoc,
addDoc,
collection,
serverTimestamp,
updateDoc,
deleteDoc ,
onSnapshot,
query, 
 where,
getDocs
}