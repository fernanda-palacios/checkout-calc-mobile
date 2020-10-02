import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6iGj2vKINoTHilVelxZSksX3lzhL51qM",
  authDomain: "checkoutpricecalculator-28abb.firebaseapp.com",
  databaseURL: "https://checkoutpricecalculator-28abb.firebaseio.com",
  projectId: "checkoutpricecalculator-28abb",
  storageBucket: "checkoutpricecalculator-28abb.appspot.com",
  messagingSenderId: "912926885493",
  appId: "1:912926885493:web:c50548a2b071920e149a3c"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
