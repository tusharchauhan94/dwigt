import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import firebase from 'react-native-firebase';
import {AuthContext} from './AuthProvider';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { sha256 } from 'react-native-sha256';
import Notifications from './Notifications';

export default function Routes() {
  const {user, setUser, setUserId} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    sha256(user.email).then((hash) => {setUserId(hash);})
                            .catch((error) => console.log(error));
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <Notifications /> : <AuthStack />}
    </NavigationContainer>
  );
};
