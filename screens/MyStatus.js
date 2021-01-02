import React, { useState,Component } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { List, Divider } from 'react-native-paper';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Busy',
    index: 0,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Available',
    index: 1,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Cooking',
    index: 2,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b1',
    title: 'Sleeping',
    index: 3,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f62',
    title: 'Gaming',
    index: 4,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'In a Meeting',
    index: 5,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b8',
    title: 'Driving',
    index: 6,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f91',
    title: 'Working',
    index: 7,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d79',
    title: 'Watching TV',
    index: 8,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'In a Call',
    index: 9,
  },
];

class MyStatus extends Component{

    constructor(){
      super();

      this.state = {
      style: [0,0,0,0,0,0,0,0,0,0],
      isLoading: true,
      }
      this._retrieveIndex();
      console.log("WHAT!!!")
    }

   _updateStyle(index){
     temp = [0,0,0,0,0,0,0,0,0,0];
     temp[index] = 1;
     console.log("Changed style array: "+temp)
     this.setState({style: temp})
   }

    _getStyle(value) {
      console.log("Received Style Value: "+value+" from "+this.state.style);
      if (value == 1)
        return styles.btnSelected;
      else
        return styles.btNormal;
    }

    _storeStatus = async (status) => {
      try {
        console.log("Storing Status: "+status)
        await AsyncStorage.setItem(
          "MyStatus",
          status
        );
      } catch (error) {
        console.log(error)
        // Error saving data
      }
      this._retrieveStatus();
    }

    _storeIndex = async (index) => {
      try {
        console.log("Storing index: "+index)
        await AsyncStorage.setItem(
          "MyIndex",
          index.toString()
        );
      } catch (error) {
        console.log(error)                           // Error saving data
      }
    //  this._retrieveIndex();
    }


    _retrieveStatus = async () => {
      try {
        console.log("Retreiving Status");
        const value = await AsyncStorage.getItem('MyStatus');
        if (value !== null) {
          // We have data!!
          console.log("Status:" +value);
        }
      } catch (error) {
        // Error retrieving data
      }
    }

    _retrieveIndex = async () => {
      console.log("Retreiving Index");
      try {
        const value = await AsyncStorage.getItem('MyIndex');
        if (value !== null) {
          // We have data!!
          this._updateStyle(value);
          console.log("Index=" +value);
        }
        this.setState({isLoading: false});
      } catch (error) {
        console.log("Error: "+error)// Error retrieving data
      }
    }

  onPressButton(status, index){

      Alert.alert("Status Update", "Your status is set to " + status);
      this._updateStyle(index);
      this._storeStatus(status);
      this._storeIndex(index);
    }

  renderItem(item){

     return(
     <TouchableOpacity onPress={() => {
       this.onPressButton(item.title, item.index)
     }}
     style={this._getStyle(this.state.style[item.index])}
     >
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

  render() {

    console.log(this.props.route.params.name)               //debug
    if (this.state.isLoading)
      return (
        <SafeAreaView style={styles.container}>
        </SafeAreaView>
      );
    else
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => (this.renderItem(item))}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <Divider />}
            extraData={this.state.style}
            />
        </SafeAreaView>
      );
  }

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
    backgroundColor: 'white',
  },
  btnSelected: {
    backgroundColor: '#A3F3C7',
  },
});

export default MyStatus;
