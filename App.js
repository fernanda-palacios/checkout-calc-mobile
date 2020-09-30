import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import firebase from './firebase';

export default function App() {
  const [allItems, setAllItems] = useState([]);
  const [discountPercentage, setDiscountPercentage]  = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await firebase.firestore().collection("checkoutCalculator").get().then(
          function(querySnapShot){
            const data = {};
            querySnapShot.forEach(function(doc) {
              data[doc.id] = doc.data();
            });
            const dataId = 1;
            console.log(data[dataId].items);
            const a = data[dataId].items;
            console.log(a);
            setAllItems(a);
            setDiscountPercentage(data[dataId].discount_percentage);
            setTaxPercentage(data[dataId].tax_percentage);
            console.log(allItems);
          }
      );
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>the tax percentage is {taxPercentage}</Text>
      <Text>the discount percentage is {discountPercentage}</Text>
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
