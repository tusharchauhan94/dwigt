import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { List, Divider } from 'react-native-paper';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Busy',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Available',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Cooking',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b1',
    title: 'Sleeping',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f62',
    title: 'Gaming',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'In a Meeting',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b8',
    title: 'Driving',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f91',
    title: 'Working',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d79',
    title: 'Watching TV',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'In a Call',
  },
];
//const [isPress, setIsPress ] = useState(false);

function onPressButton(status){
  alert("Your status is set to " + status)
  console.log(status)
}

const _storeStatus = async ({status}) => {
  try {
    await AsyncStorage.setItem(
      "MyStatus",
      status
    );
  } catch (error) {
    // Error saving data
  }
  _retrieveStatus();
}


const _retrieveStatus = async () => {
  try {
    const value = await AsyncStorage.getItem('MyStatus');
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
}


const Item = ({ item }) =>{
  var [ style, setStyle ] = useState();
  return(
  <TouchableOpacity onPress={() => {
    onPressButton(item.title)
    _storeStatus(item.title)
    setStyle(styles.btnSelected)
  }}
  style={style}>
  <List.Item
    title={item.title}
    description='Priority'
    titleNumberOfLines={1}
    titleStyle={styles.listTitle}
    descriptionStyle={styles.listDescription}
    descriptionNumberOfLines={1}
  />
  </TouchableOpacity>
   );
}

const MyStatus = ({route, navigation}) => {
  console.log(route.params.name)               //debug
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
  },
  btnNormal: {
    backgroundColor: 'blue',
  },
  btnSelected: {
    backgroundColor: '#A3F3C7',
  },
});

export default MyStatus;
