import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { List, Divider } from 'react-native-paper';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Aditya',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Rajvardhan',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Rahul',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b1',
    title: 'Vikram',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f62',
    title: 'Veena',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Ram',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b8',
    title: 'Shraddha',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f91',
    title: 'Annie',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d79',
    title: 'Lovely',
  },
];

function onPressButton(){
  console.log("Pressed")
}

const Item = ({ item, style }) => (
  <TouchableOpacity onPress={onPressButton} style={[styles.item, style]}>
  <List.Item
    title={item.title}
    description='Status'
    titleNumberOfLines={1}
    titleStyle={styles.listTitle}
    descriptionStyle={styles.listDescription}
    descriptionNumberOfLines={1}
  />
  </TouchableOpacity>
);

const HomeScreen = ({navigation}) => {
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 5,
    marginVertical: 2,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  listTitle: {
    fontSize: 22,
    color: '#333333'
  },
  listDescription: {
    fontSize: 16,
    color: '#333333'
  }

});

export default HomeScreen;
