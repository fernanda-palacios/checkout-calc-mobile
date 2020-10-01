import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from './firebase';

export default function App() {
  const [itemName, setItemName] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [quantity, setQuantity] = useState('');

  // values that user is editing but hasn't yet applied
  const [newTaxPercentage, setNewTaxPercentage] = useState('');
  const [newDiscountPercentage, setNewDiscountPercentage] = useState('');

  // actual applied/saved values (these would come from the back-end)
  const [savedTaxPercentage, setSavedTaxPercentage] = useState(0);
  const [savedDiscountPercentage, setSavedDiscountPercentage] = useState(0);

  const [allItems, setAllItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await firebase.firestore().collection("checkoutCalculator").get().then(
        function (querySnapShot) {
          const data = {};
          querySnapShot.forEach(function (doc) {
            data[doc.id] = doc.data();
          });
          const dataId = 1;
          setAllItems(data[dataId].items);
          setSavedDiscountPercentage(data[dataId].discount_percentage);
          setSavedTaxPercentage(data[dataId].tax_percentage);
        }
      );
    };
    fetchData();
    calculateTotal();
  }, []);

  // If data already exists, it updates the values on data. Otherwise, it creates the new data
  const updateFirestoreData = (items, discountPercentage, taxPercentage) => {
    firebase.firestore().collection("checkoutCalculator").doc('1').set({
      items: items,
      discount_percentage: Number(discountPercentage),
      tax_percentage: Number(taxPercentage),
    }).then(function () {
      console.log("data updated successfully");
    })
  };

  const calculateTotal = () => {
    let subtotal = 0;
    allItems.forEach((item) => {
      const itemTotal = item.pricePerUnit * item.quantity;
      subtotal += itemTotal;
    });

    const tax = subtotal * (savedTaxPercentage / 100);
    const discount = subtotal * (savedDiscountPercentage / 100);
    const total = subtotal + tax - discount;

    setSubtotal(subtotal);
    setTotal(total);
  };

  // arrays with all the values for each property of allItems
  const itemNames = Object.values(allItems).map(data => data['itemName'])
  const itemPricesPerUnit = Object.values(allItems).map(data => data['pricePerUnit'])
  const itemQuantities = Object.values(allItems).map(data => data['quantity'])

  return (
    <View style={styles.container}>
      {allItems.map((item, i) => {
        return (<View>
          <Text>Item Name : {itemNames[i]}</Text>
          <Text>Price Per Unit : {itemPricesPerUnit[i]}</Text>
          <Text>Quantity : {itemQuantities[i]}</Text>
          <br />
        </View>)
      })}

      <Text>the tax percentage is {savedDiscountPercentage}</Text>
      <Text>the discount percentage is {savedTaxPercentage}</Text>

      <br />
      {/*　showing how to update the value on DB*/}
      <Button
        title="change db tax percentage value to 5"
        onPress={() => {
          const newTaxValue = 5;
          setSavedTaxPercentage(newTaxValue);
          updateFirestoreData(allItems, savedDiscountPercentage, newTaxValue);
        }}
        color="#841584"
      />

      <Button
        title="change db tax percentage value to 10"
        onPress={() => {
          const newTaxValue = 10;
          setSavedTaxPercentage(newTaxValue);
          updateFirestoreData(allItems, savedDiscountPercentage, newTaxValue);
        }}
        color="#841584"
      />
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
