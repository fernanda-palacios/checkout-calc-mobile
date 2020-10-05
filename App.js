import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
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

  useEffect(() => {
    calculateTotal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedTaxPercentage, savedDiscountPercentage, allItems]);

  // If data already exists, it updates the values on data. Otherwise, it creates the new data
  const updateFirestoreData = (items, discountPercentage, taxPercentage) => {
    firebase.firestore().collection("checkoutCalculator").doc('1').set({
      items: items,
      discount_percentage: discountPercentage,
      tax_percentage: taxPercentage,
    }).then(function () {
      console.log("data updated successfully");
    }).catch((error) => {
      alert(error)
  });
  };

  const calculateTotal = () => {
    let subtotal = 0
    allItems.forEach((item) => {
      let itemTotal
      if (isNaN(item.pricePerUnit) || isNaN(item.quantity)) {
        itemTotal = 0
      }
      else {
        itemTotal = item.pricePerUnit * item.quantity
      }
      // const itemTotal = item.pricePerUnit * item.quantity
      subtotal += itemTotal
    })

    const tax = subtotal * (savedTaxPercentage / 100)
    const discount = subtotal * (savedDiscountPercentage / 100)
    const total = subtotal + tax - discount

    setSubtotal(subtotal)
    setTotal(total)
  }

  // arrays with all the values for each property of allItems
  const itemNames = Object.values(allItems).map(data => data['itemName'])
  const itemPricesPerUnit = Object.values(allItems).map(data => data['pricePerUnit'])
  const itemQuantities = Object.values(allItems).map(data => data['quantity'])

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold' }}>Add Item</Text>
      <Text>Item Name:</Text>
      <TextInput
        style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
        onChange={(e) => setItemName(e.nativeEvent.text)} value={itemName}
      />

      <Text>Price Per Unit:</Text>
      <TextInput
        style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
        onChange={(e) => setPricePerUnit(e.nativeEvent.text)} value={pricePerUnit} />

      <Text>Quantity:</Text>
      <TextInput
        style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
        onChange={(e) => setQuantity(e.nativeEvent.text)} value={quantity} />

      <Button
        title="Add"
        onPress={() => {
          const itemToAdd = {
            itemName: itemName,
            pricePerUnit: pricePerUnit,
            quantity: quantity,
          }

          const newItems = allItems.slice()
          newItems.push(itemToAdd)
          setAllItems(newItems) // updating this value in state will call calculateTotal bc of useEffect

          // save to db - only change items, rest should remain the same
          updateFirestoreData(newItems, savedDiscountPercentage, savedTaxPercentage);

          setItemName('')
          setPricePerUnit('')
          setQuantity('')
        }}
      />

      <View style={{ height: 10 }}></View>
      <Text style={{ fontWeight: 'bold' }}>Apply Tax Percentage: </Text>
      <TextInput
        style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
        onChange={(e) => setNewTaxPercentage(e.nativeEvent.text)} value={newTaxPercentage} />

      <Button
        title="Apply"
        onPress={() => {
          // const newTaxValue = 10;
          // setSavedTaxPercentage(newTaxValue);
          // updateFirestoreData(allItems, savedDiscountPercentage, newTaxValue);
          setSavedTaxPercentage(newTaxPercentage) // updating this value in state will call calculateTotal bc of useEffect
          // save to db - only change tax, rest should remain the same
          updateFirestoreData(allItems, savedDiscountPercentage, newTaxPercentage);
          // reset input value
          setNewTaxPercentage('')
        }}
      />

      <View style={{ height: 10 }}></View>
      <Text style={{ fontWeight: 'bold' }}>Apply Discount Percentage: </Text>
      <TextInput
        style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
        // onChange={(e) => setNewDiscountPercentage(e.target.value)} value={newDiscountPercentage}
        onChange={(e) => setNewDiscountPercentage(e.nativeEvent.text)} value={newDiscountPercentage}
      />
      <Button
        title="Apply"
        onPress={() => {
          // const newTaxValue = 10;
          // setSavedTaxPercentage(newTaxValue);
          // updateFirestoreData(allItems, savedDiscountPercentage, newTaxValue);
          setSavedDiscountPercentage(newDiscountPercentage)// updating this value in state will call calculateTotal bc of useEffect
          // save to db - only change discount, rest should remain the same
          updateFirestoreData(allItems, newDiscountPercentage, savedTaxPercentage);
          // reset input value
          setNewDiscountPercentage('')
        }}
      />

      <View style={{ height:10 }}></View>
      <Text style={{ fontWeight: 'bold' }}>All Items</Text>
      {allItems.map((item, i) => {
        return (<View key={i}>
          <Text>Item Name : {itemNames[i]}</Text>
          <Text>Price Per Unit : {itemPricesPerUnit[i]}</Text>
          <Text>Quantity : {itemQuantities[i]}</Text>
          <Button
            title="remove"
            onPress={() => {
              const itemToRemove = JSON.parse(JSON.stringify(item)) // deep copy
              const newItems = allItems.filter((currentItem) => {
                // if all values are the same - don't want this item
                // this would delete all items with all similar values
                // ideally would use id's but using this check for simplification
                if (currentItem.itemName === itemToRemove.itemName
                  && currentItem.quantity === itemToRemove.quantity
                  && currentItem.pricePerUnit === itemToRemove.pricePerUnit) {
                  return false
                }
                return true
              })
              setAllItems(newItems) // updating this value in state will call calculateTotal bc of useEffect
              // save to db - only change items, rest should remain the same
              updateFirestoreData(newItems, savedDiscountPercentage, savedTaxPercentage);
            }}
          >
            Remove
                    </Button>
        </View>)
      })}

      <View style={{ height: 10 }}></View>

      <Text>Subtotal: {subtotal} </Text>
      <Text>Currently applied tax percentage: {savedTaxPercentage} </Text>
      <Text>Currently applied discount percentage: {savedDiscountPercentage} </Text>
      <Text style={{ fontWeight: 'bold' }}>Total: {total} </Text>
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
