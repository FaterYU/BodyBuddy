import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const SearchablePicker = ({data, onValueChange}) => {
  const pickerRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const onPickerPress = () => {
    pickerRef.current.focus();
  };

  const filteredData = [
    {
      label: 'Empty Option (Press to select...)',
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
        style={styles.input}
        placeholder="Search..."
        onChangeText={text => {
          setSearchQuery(text);
          // onPickerPress();
        }}
      />
      <Picker
        ref={pickerRef}
        selectedValue={selectedItem}
        mode="dropdown"
        numberOfLines={3}
        onValueChange={(itemValue, itemIndex) => {
          onValueChange(itemValue); // Call the callback with the selected value
          setSelectedItem(itemValue); // Set selectedItem to the selected value
        }}
        style={{
          width: '95%',
        }}
        itemStyle={{
          backgroundColor: 'grey',
          color: 'blue',
          fontFamily: 'Ebrima',
          fontSize: 17,
        }}>
        {filteredData.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
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
  },
  input: {
    height: 40,
    width: '80%',
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
});

export default SearchablePicker;
