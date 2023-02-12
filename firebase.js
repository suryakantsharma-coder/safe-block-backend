// Import the functions you need from the SDKs you need
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBA2Vzu3zokMDDjnSwhkL5jAvsRGPHIE0c",
//   authDomain: "tic-tak-toe-bebfa.firebaseapp.com",
//   databaseURL: "https://tic-tak-toe-bebfa-default-rtdb.firebaseio.com",
//   projectId: "tic-tak-toe-bebfa",
//   storageBucket: "tic-tak-toe-bebfa.appspot.com",
//   messagingSenderId: "507131440265",
//   appId: "1:507131440265:web:b8334792a362e5c9efea58",
//   measurementId: "G-TXLHRW1REB"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// initializeApp();

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});


const db = getFirestore();

module.exports = db 