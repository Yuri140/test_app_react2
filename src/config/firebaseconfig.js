// Import the functions you need from the SDKs you need
import firebase from "firebase"
import "firebase/storage"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5hcN6my5n1nitG5Fhe6Oin9aO2uMDmlk",
  authDomain: "projetoa8.firebaseapp.com",
  projectId: "projetoa8",
  storageBucket: "projetoa8.appspot.com",
  messagingSenderId: "536026051099",
  appId: "1:536026051099:web:ced2e37cba5d8b569efebe",
  measurementId: "G-R94VH2NRF4",
  storageBucket: "gs://projetoa8.appspot.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let bd = firebase.firestore()
let storage = firebase.storage()
export default bd
const analytics = getAnalytics(app);


function salvarImagemFirebase() {

  const nomeImagem = "imagem1"

  const upload = storage.ref().child("produtos").child(nomeImagem).put(capturedPhoto)




}


