
import React, { Component,useEffect } from "react";
import messaging from '@react-native-firebase/messaging';
import AppStack from './AppStack';

const Notifications = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
       console.log("new message" , remoteMessage);
        // show the message to the user or use it to update to your local store
       return unsubscribe;
      }, []);
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });
    });
    
    return (<AppStack />);
         
};
export default Notifications;