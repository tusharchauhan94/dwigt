// Access Device’s Contact List in React Native App
// https://aboutreact.com/access-contact-list-react-native/

import React, {memo, useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {CheckBox, ButtonGroup} from 'react-native-elements';

import PropTypes from 'prop-types';
import Avatar from './Avatar';

const getAvatarInitials = (textString) => {
  if (!textString) return '';
  const text = textString.trim();
  const textSplit = text.split(' ');
  if (textSplit.length <= 1) return text.charAt(0);
  const initials =
    textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
  return initials;
};



const ListItem = (props) => {
  const [isSelected, setisSelected] = useState(false);
  
  function onPress() {
    setisSelected(!isSelected);  
}
  const shouldComponentUpdate = () => {
    return false;
  };
  useEffect(() => {
    if(isSelected){
        var key = item.phoneNumbers[0].number;
       // console.log("Key = ", typeof(contact_id));
        //console.log(props);
        let new_id = {...contact_id, [key]:"Selected"}
        //setID(new_id);
        if (contact_id[key] === undefined){
            console.log("----------HERE----------", Object.keys(contact_id))
            addContactId(new_id);
        }
        //console.log("NEW ID = ", new_id);
        console.log("ID Set to = ", (contact_id));
    }    
    else{
        var key = item.phoneNumbers[0].number;
        if (contact_id[key] != undefined){ 
            delete contact_id[key];
        }
    }
  });
  
  const {item, onLongPress, addContactId, contact_id} = props;
 
  return (
    <View>
      <TouchableOpacity onLongPress={() => onLongPress(item)} onPress = {() => {onPress();}}>
        <View style={styles.itemContainer}>
          <View style={styles.leftElementContainer}>
            <Avatar
              img={
                item.hasThumbnail ?
                  {uri: item.thumbnailPath} : undefined
              }
              placeholder={getAvatarInitials(
                `${item.givenName} ${item.familyName}`,
              )}
              width={40}
              height={40}
            />
          </View>
          <View style={styles.rightSectionContainer}>
            <View style={styles.mainTitleContainer}>
              <Text
                style={
                  styles.titleStyle
                }>{`${item.givenName} ${item.familyName}`}</Text>
            </View>
          </View>
          <View style={styles.rightCheckboxContainer}>
                <CheckBox
                    checked={isSelected}
                    onPress={() => {setisSelected(!isSelected)}}
                />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    minHeight: 44,
    height: 63,
  },
  leftElementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    paddingLeft: 13,
  },
  rightSectionContainer: {
    marginLeft: 18,
    flexDirection: 'row',
    flex: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#515151',
  },
  mainTitleContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  titleStyle: {
    fontSize: 16,
  },
  rightCheckboxContainer: {
    marginRight: 10,
    marginTop: 10,
    flexDirection: 'row',
    //flex: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#515151',
  }
});

export default memo(ListItem);

ListItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};