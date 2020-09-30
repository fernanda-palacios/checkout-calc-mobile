import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
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

if (firebase.app.length === 0){
  firebase.initializeApp(firebaseConfig);
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World! yeah sounds great! yes! works</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
