// Access Device’s Contact List in React Native App
// https://aboutreact.com/access-contact-list-react-native/

// Import React
import React, {useState, useEffect} from 'react';
import FormButton from '../components/FormButton';

// Import all required component
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
} from 'react-native';

import Contacts from 'react-native-contacts';
import ListItem from '../components/ListItem';

function AddContact() {
    let [contacts, setContacts] = useState([]);
    const [contact_id, setID] = useState({});

    useEffect(() => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: 'Contacts',
                message: 'This app would like to view your contacts.',
            }).then((perm) => {
                console.log("load perm", perm);
                if (perm === 'granted'){
                loadContacts();
                }
                else{
                    alert('Permission to access contacts was denied');
                    console.warn('Permission to access contacts was denied');  
                }
            }
            );
        } else {
            loadContacts();
        }
    }, []);

    function loadContacts() {
        
        Contacts.getAll().then((contacts) => {      
            setContacts(contacts);
        });
    }

    function addContactId(new_id){
        setID(new_id);
    }

    function search(text) {
        
        const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
        
        if (text === '' || text === null) {          
            loadContacts();
        } else if (phoneNumberRegex.test(text)) {
            console.log("Phone Number = ", text);
            Contacts.getContactsByPhoneNumber(text).then((contacts) => {
                contacts.sort(
                  (a, b) => 
                    a.givenName.toLowerCase() > b.givenName.toLowerCase(),
                );
                setContacts(contacts);
     //           console.log('contacts', contacts);
              });
            }
            else if (text != '+'){
                Contacts.getContactsMatchingString(text).then((contacts) => {
                  contacts.sort(
                    (a, b) =>
                      a.givenName.toLowerCase() > b.givenName.toLowerCase(),
                  );
                  setContacts(contacts);
   //               console.log('contacts', contacts);
                });
            }
    }

    function openContact(contact) {
        console.log(JSON.stringify(contact));
        Contacts.openExistingContact(contact).then(() => { });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TextInput
                    onChangeText={search}
                    placeholder="Search"
                    style={styles.searchBar} />
                <FlatList
                    data={contacts}
                    renderItem={(contact) => {
                        {
                        //    console.log('contact -> ' + JSON.stringify(contact));
                        }
                        return (
                            <ListItem
                                key={contact.item.recordID}
                                item={contact.item}
                                onLongPress={openContact}
                                addContactId={addContactId}
                                contact_id={contact_id}
                                 />
                        );
                    } }
                    keyExtractor={(item) => item.recordID} />
                <View style={{flex: 1,justifyContent: 'flex-end'}}>
                    <FormButton
                        buttonTitle="Add Contact"
                        onPress={() => {
                        console.log("ID = ", contact_id);
                  }}/>
                </View>
            </View>
        </SafeAreaView>
    );
}
export default AddContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#4591ed',
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 20,
  },
  searchBar: {
    backgroundColor: '#f0eded',
    paddingHorizontal: 30,
    paddingVertical: Platform.OS === 'android' ? undefined : 15,
  },
});