import React, { useContext } from 'react';
import { Button, Image, View, Text,StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropdownButton from '../components/DropdownButton';
import { AuthContext } from '../navigation/AuthProvider';
import MyStatus from '../screens/MyStatus';
import AddFriend from '../screens/AddFriend';
import AddEvent from '../screens/AddEvent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('../assets/logo.png')}
    />
  );
}

function onPopupEvent(eventName, index, navigation, logout) {

  if (eventName !== 'itemSelected') return
  if (index === 0) onMyStatus(navigation)
  else
     if (index === 2) onAddFriend(navigation)
     else
       if (index === 3) onAddEvent(navigation)
       else
        logout()

  }

function onAddFriend(navigation){
  console.log("Adding Friend");
  navigation.navigate("AddFriend");

}

function onAddEvent(navigation) {
  navigation.navigate("AddEvent");
}

function onMyStatus(navigation) {

  navigation.navigate("MyStatus", {
              name: "MyStatus",
            })
}


const AppStack = () => {
  const {logout} = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen}
       options={({navigation}) => ({
                headerTitle: () => <Text style={styles.input}> ans </Text>,
                headerTintColor: "royalblue",
                headerStyle: {
                              backgroundColor: 'royalblue'
                            },
                headerleft: "null",
                headerRight: () => (
                                    <View>
                                      <DropdownButton actions={['MyStatus', 'Profile', 'Add Friend',
                                      'Add Event', 'Logout']}
                                      onPress={(eventName, index)=> {
                                        return onPopupEvent(eventName, index, navigation, logout);
                                      }}
                                      />
                                    </View>
                                  ),
              })
            }
      />
      <Stack.Screen name='MyStatus' component={MyStatus}
       options={({navigation}) => ({
                headerTitle: () => <Text style={styles.input}> MyStatus </Text>,
                headerTintColor: "royalblue",
                headerStyle: {
                              backgroundColor: 'royalblue'
                              },
                headerLeft: () => (
                  <View style={{marginLeft: 10}}>
                    <FontAwesome.Button
                      name="long-arrow-left"
                      size={20}
                      backgroundColor="#f9fafd"
                      color="#000"
                      onPress={() => navigation.navigate('Home')}
                    />
                  </View>
                ),
              })
            }
      />
      <Stack.Screen name='AddFriend' component={AddFriend}
       options={({navigation}) => ({
                headerTitle: () => <Text style={styles.input}> Add Friend </Text>,
                headerTintColor: "royalblue",
                headerStyle: {
                              backgroundColor: 'royalblue'
                              },
                headerLeft: () => (
                  <View style={{marginLeft: 10}}>
                    <FontAwesome.Button
                      name="long-arrow-left"
                      size={20}
                      backgroundColor="#f9fafd"
                      color="#000"
                      onPress={() => navigation.navigate('Home')}
                    />
                  </View>
                ),
              })
            }
      />
      <Stack.Screen name='AddEvent' component={AddEvent}
       options={({navigation}) => ({
                headerTitle: () => <Text style={styles.input}> Add Event </Text>,
                headerTintColor: "royalblue",
                headerStyle: {
                              backgroundColor: 'royalblue'
                              },
                headerLeft: () => (
                  <View style={{marginLeft: 10}}>
                    <FontAwesome.Button
                      name="long-arrow-left"
                      size={20}
                      backgroundColor="#f9fafd"
                      color="#000"
                      onPress={() => navigation.navigate('Home')}
                    />
                  </View>
                ),
              })
            }
      />
    </Stack.Navigator>
  );
}

export default AppStack;
const styles = StyleSheet.create({
  textStyle: {
    padding: 5,
    height: '100%',
    fontSize: 20,
    fontFamily: 'Lato-Regular',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,

  },
  buttonStyle: {
    padding: 5,
    height: '100%',
    fontFamily: 'Lato-Regular',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#fff',
    borderRightWidth: 1,
    width: 40,
  },
  input: {
    padding: 0,
    flex: 1,
    fontSize: 30,
    fontFamily: 'Lato-Regular',
    color: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },});
