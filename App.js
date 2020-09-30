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
            setAllItems(data[dataId].items);
            setDiscountPercentage(data[dataId].discount_percentage);
            setTaxPercentage(data[dataId].tax_percentage);
          }
      );
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>item Name : {Object.values(allItems).map(data => data['itemName'])}</Text>
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
