import React, {useState, useEffect} from 'react';
import {View, Button, Platform, StyleSheet, Text, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
//import CheckBox from '@react-native-community/checkbox';
import {CheckBox, ButtonGroup} from 'react-native-elements';
import DateInput from '../components/DateInput';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import AsyncStorage from '@react-native-community/async-storage';


const AddEvent = ({navigation}) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [mindate, setMinDate] = useState(new Date(Date.now()));
  const [type, selectType] = useState(0);
  const [startdate, setStartDate] = useState("Start Date");
  const [enddate, setEndDate] = useState("End Date");
  const [starttime, setStartTime] = useState("Start Time");
  const [starttimeinsec, setStartTimeInSec] = useState(0);
  const [endtime, setEndTime] = useState("End Time");
  const [eventname, setEventName] = useState("");
  const [eventdesc, setEventDesc] = useState("");
  const [isendSelected, setisendSelected] = useState(true);
  //const [isstarttimeSelected, setisstarttimeSelected] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [cancel, setCancel] = useState(false);
  const buttons = ["S","M","T","W","T","F","S"];
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [isRepeat, setisRepeat] = useState(false);

  const onChange = (event, selectedDate) => {
    console.log("Event = " + event.type)
    setShow(Platform.OS === 'ios');
    if (event.type === "set"){
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setCancel(false);
    }
    else{ 
      setDate(date);
      setCancel(true);
    }  
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
  },[date]);

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const formatDate = () => {
    return date.getFullYear()+ "-" + (date.getMonth()+1) + "-" + date.getDate();
  };

  const formatTime = () => {
    return date.getHours() + ":" + date.getMinutes() + ":" + "00";
  };

 
  const _setStartDate = () => {
    if(cancel && startdate === "Start Date")
      setStartDate("Start Date");
    else
      setStartDate(formatDate());
  }

  const _setEndDate = () => {
    if(cancel && enddate === "End Date")
      setStartDate("End Date");
    else
      setEndDate(formatDate());
  }

  const _setStartTime = () => {
    if(cancel && starttime === "Start Time")
      setStartTime("Start Time");
    else{
      setStartTime(formatTime());
      setStartTimeInSec(convertToSec());
    }
  }

  const _setEndTime = () => {
    if(cancel && endtime === "End Date")
      setEndTime("End Time");
    else{
      var endtimeinsec = convertToSec()
      console.log(starttimeinsec, endtimeinsec)
      if (endtimeinsec <= starttimeinsec){
        Alert.alert("End Time should be greater than start time");
        setEndTime("End Time");
      }
      else {
      setEndTime(formatTime())
      }
    }
  }

  const _setRepeatDays = () => {
    console.log("Selected Indexes = ", selectedIndexes);
  }

  const convertToSec = () => {
    return date.getHours()*60 + date.getMinutes(); 
  }
  _storeEvent = async (Event) => {
  
     var event_list = new Array();
  
    try{
      await AsyncStorage.getItem("Events").then((value)=>{
      if (value !== null) {
       // We have data!!
          console.log("Status:" +value);
          event_list.push(value);
        }
        event_list.push(JSON.stringify(Event));
        _storeEventData(event_list);
      });
    }catch (error){
      console.log("Error = ",error);
    }
  }
  

  _storeEventData = async (Event) => {
    try{
      await AsyncStorage.setItem(
        "Events",
        JSON.stringify(Event),
      ).then(()=>{_retrieveStatus("Events")})
    } catch (error) {
      console.log(error)                           // Error saving data
    }
  }

  _retrieveStatus = async (key) => {
    try {
      console.log("Retrieving Status");
      await AsyncStorage.getItem(key).then((value)=>{
            if (value !== null) {
             // We have data!!
                console.log("Status:" +value);
                //setEvents(value);
              }
           
          });
    } catch (error) {
      // Error retrieving data
    }
  }

  const checkEvent = () => {
    var value = 0;
    if (eventname.toString().trim().length <= 0){
      Alert.alert("Please enter a valid event name!!");
      val = 1;
    }
    else if(startdate === "Start Date"){
      Alert.alert("Please enter valid start and end dates!!");
      val = 2;
    }
    else if(starttime === "Start Time" || endtime === "End Time"){
      Alert.alert("Please enter valid start and end time!!");
      val = 3;
    }
   return val;
  }

  const createEvent = () => {
    if (checkEvent() != 0){
      //Alert.alert("Please check all the fields again!!");
    }
    else{
        var Event = 
        {
          start: startdate + " " + starttime,
          end: enddate + " " + endtime,
          timezone: date.getTimezoneOffset(),
          title: eventname,
          summary: eventdesc,
        };
      _storeEvent(Event);
    }
  }
  const updateIndex = (selectedIndexes) => {
    setSelectedIndexes(selectedIndexes);
    console.log("Selected Indexes = ",selectedIndexes)

  }
  return (
    <View style={styles.main}>
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
        onPress={() => {selectType(1);setMinDate(new Date(Date.now()));showDatepicker();}}
      />
      </View>
      <View style={styles.checkboxContainer}> 
      <DateInput
        titleValue={starttime}
        iconType="clockcircle"
        style={styles.timesize}
        onPress={() => {selectType(2);showTimepicker();}}
      />     
      <DateInput
        titleValue={endtime}
        iconType="clockcircle"
        style={styles.timesize}
        disabled={starttime === "Start Time"}
        onPress={() => {selectType(4);showTimepicker();}}
      />
      </View>
      <View style={styles.checkboxContainer}>
      <ButtonGroup
        onPress={updateIndex}
        selectedIndexes={selectedIndexes}
        buttons={buttons}
        selectMultiple={true}
        //disabled={!isendSelected}
        containerStyle={{width: "60%", height:"80%"}}
      />
      <CheckBox
        title = "Repeat"
        checked={isRepeat}
        style={styles.checkbox}
        disabled={!isendSelected}
        textStyle={styles.label}
        onPress={() => {setisRepeat(!isRepeat)}}
      />
      </View>
      <View>
      <CheckBox
        title = "No End Date"
        checked={isendSelected}
        onPress={() => {setisendSelected(!isendSelected)}}
      />
      </View>
      <View>
      <DateInput
        disabled={isendSelected}
        titleValue={(isendSelected)? "End Date":enddate}
        iconType="calendar"
        onPress={() => {selectType(3);setMinDate(date);showDatepicker();}}
      />
      <View>
      {(enddate != "End Date") && (
      <Text>
        * Event will repeat all week from Start Date to End Date if weekday is not selected.
      </Text>
      )
      }
      </View>
      
      <FormButton
          buttonTitle="Add Event"
          onPress={() => { _setRepeatDays();createEvent();
                  }}
      />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          minimumDate={mindate}
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
  },
  checkbox: {
    height: 10,
  },
  timesize: {
    width: "50%",
  },
  label:{
    fontSize: 16,
    fontStyle: "normal",
    fontFamily: "roboto",
    fontWeight: "normal"
  },
  main: {
    margin: 5,
  },

});

export default AddEvent;
