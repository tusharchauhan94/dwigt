import React, {useState, useEffect} from 'react';
import {View, Button, Platform, StyleSheet, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
//import CheckBox from '@react-native-community/checkbox';
import {CheckBox, ButtonGroup} from 'react-native-elements';
import DateInput from '../components/DateInput';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { ToggleButton } from 'react-native-paper';


const AddEvent = ({navigation}) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [type, selectType] = useState(0);
  const [startdate, setStartDate] = useState("From Date");
  const [enddate, setEndDate] = useState("End Date");
  const [starttime, setStartTime] = useState("From Time");
  const [endtime, setEndTime] = useState("End Time");
  const [eventname, setEventName] = useState("Event Name");
  const [eventdesc, setEventDesc] = useState("Description");
  const [isendSelected, setisendSelected] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const buttons = ["S","M","T","W","T","F","S"];
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [isRepeat, setisRepeat] = useState(false);
  const onChange = (event, selectedDate) => {
    console.log("Event = " + selectedDate)
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  useEffect(() => {
    console.log("Date = " + date)
    switch (type) {
      case 1: _setStartDate();break;
      case 2: _setStartTime();break;
      case 3: _setEndDate();break;
      case 4: _setEndTime();break;
      default: console.log("Wrong Type!!!");break;
    };
  });

  const showDatepicker = () => {

    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const formatDate = () => {
  return date.getDate() + "/" + date.getMonth() + "/"
         + date.getFullYear();
  };

  const formatTime = () => {
  return date.getHours() + ":" + date.getMinutes();
  };

 
  const _setStartDate = () => {
//    console.log(formatDate());
    setStartDate(formatDate());
  }

  const _setEndDate = () => {
    setEndDate(formatDate());
  }

  const _setStartTime = () => {
  //  console.log(formatTime());
    setStartTime(formatTime())
  }

  const _setEndTime = () => {
    setEndTime(formatTime())
  }

  const updateIndex = (selectedIndexes) => {
    setSelectedIndexes(selectedIndexes);
    console.log("Selected Indexes = ",selectedIndexes)

  }
  return (
    <View>
      <View>
      <FormInput
        labelValue={eventname}
        onChangeText={(eventname) => setEventName(eventname)}
        placeholderText="Event Name"
        iconType="bells"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={eventdesc}
        onChangeText={(desc) => setEventDesc(desc)}
        placeholderText="Description"
        iconType="bells"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <DateInput
        titleValue={startdate}
        iconType="calendar"
        onPress={() => {selectType(1);showDatepicker();}}
      />
      </View>
      <View>
      <DateInput
        titleValue={starttime}
        iconType="clockcircle"
        onPress={() => {selectType(2);showTimepicker();}}
      />
      </View>
      <View>
      <CheckBox
        title = "No End Date"
        checked={isendSelected}
        //checkedIcon='dot-circle-o'
        //uncheckedIcon='circle-o'
        onPress={() => {setisendSelected(!isendSelected)}}
      />
      </View>
      <View style={styles.checkboxContainer}>
      <ButtonGroup
        onPress={updateIndex}
        selectedIndexes={selectedIndexes}
        buttons={buttons}
        selectMultiple={true}
        disabled={!isendSelected}
        containerStyle={{width: 280, height:47}}
      />
      <CheckBox
        title = "Repeat"
        checked={isRepeat}
        //checkedIcon='dot-circle-o'
        //uncheckedIcon='circle-o'
        style={styles.checkbox}
        disabled={!isendSelected}
        //size="20"
        textStyle={styles.label}
        onPress={() => {setisRepeat(!isRepeat)}}
      />
      </View>
      <View>
      <DateInput
        disabled={isendSelected}
        titleValue={(isendSelected)? "N/A":enddate}
        iconType="calendar"
        onPress={() => {selectType(3);showDatepicker();}}
      />
      <View>
      <DateInput
        disabled={isendSelected}
        titleValue={(isendSelected)? "N/A":endtime}
        iconType="clockcircle"
        onPress={() => {selectType(4);showTimepicker();}}
      />
      </View>
      <FormButton
          buttonTitle="Add Event"
          onPress={() => {
                    console.log("Button Pressed!!");
                  }}
      />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
   checkboxContainer: {
    flexDirection: "row",
    //marginBottom: 20,
  },
  checkbox: {
    height: 10,
  
  },
  label: {
    margin: 0,
  },

});

export default AddEvent;
