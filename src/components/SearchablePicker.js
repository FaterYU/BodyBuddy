import React, {useState, useRef} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const SearchablePicker = ({data, onValueChange}) => {
  const pickerRef = useRef();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const onPickerPress = () => {
    pickerRef.current.focus();
  };

  const filteredData = [
    {
      label: '',
      value: null,
    },
  ].concat(
    data.filter(item =>
      searchQuery === '' || searchQuery === null
        ? true
        : item.label.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Search..."
        onChangeText={text => {
          setSearchQuery(text);
          if(text === '' || text === null){}else{
            onPickerPress();
            inputRef.current.focus();
          }
        }}

        // onFocus={onPickerPress}
      />
      <Picker
        ref={pickerRef}
        selectedValue={selectedItem}
        mode="dropdown"
        dropdownIconColor="white"
        numberOfLines={3}
        onValueChange={(itemValue, itemIndex) => {
          onValueChange(itemValue); // Call the callback with the selected value
          setSelectedItem(itemValue); // Set selectedItem to the selected value
        }}
        style={{
          width: '100%',
          backgroundColor: 'rgba(80,150,240,0.8)',
          color: 'white',
        }}
        itemStyle={{
          backgroundColor: 'red',
          color: 'blue',
          fontSize: 16,
        }}>
        {filteredData.map((item, index) => (
          <Picker.Item style={{color:'rgba(80,150,240,0.8)',fontWeight:"700"}} key={index} label={item.label} value={item.value}>
            <View style={{backgroundColor:'green'}}><Text>12345</Text></View>
          </Picker.Item>
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(80,150,240,0.8)',
  },
  input: {
    height: 40,
    width: '100%',
    paddingLeft: 10,
    backgroundColor: 'rgba(80,150,240,0.1)',
  },
});

export default SearchablePicker;
