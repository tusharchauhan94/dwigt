import React, {useState, useEffect} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateInput from '../components/DateInput';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

const AddEvent = ({navigation}) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [type, selectType] = useState(0);
  const [startdate, setStartDate] = useState("From Date");
  const [enddate, setEndDate] = useState("End Date");
  const [starttime, setStartTime] = useState("From Time");
  const [endtime, setEndTime] = useState("End Time");
  const [eventname, setEventName] = useState("Event Name");
  const [eventdesc, setEventDesc] = useState("Description");
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

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
      <DateInput
        titleValue={enddate}
        iconType="calendar"
        onPress={() => {selectType(3);showDatepicker();}}
      />
      <View>
      <DateInput
        titleValue={endtime}
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
export default AddEvent;
