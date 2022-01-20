import React from "react";
import { Text, View } from "react-native";
// import dayjs from 'dayjs';
// import auth from '@react-native-firebase/auth';

const SelectGenderScreen = () => {
  // const [showDatePicker, setShowDatePicker] = React.useState(false);
  // const genderM = {
  //   ...styles.genderOption,
  //   backgroundColor: gender === 'M' ? '#1fb3e2' : Colors.transparent,
  // };
  // const genderF = {
  //   ...styles.genderOption,
  //   backgroundColor: gender === 'F' ? '#1fb3e2' : Colors.transparent,
  // };

  // const onChange = (selectedDate: Date): void => {
  //   const currentDate = selectedDate || birtdate;
  //   dispatchAction('birtdate', currentDate);
  // };
  // auth()
  //   .signOut()
  //   .then(() => {
  //     console.log('Logout');
  //   });

  return (
    <View>
      <Text>SelectGenderScreen</Text>
      {/* <View style={styles.section}>
        <Text style={styles.sectionText}>¿Cual es tu genero?</Text>
        <View style={styles.genderContainer}>
          <TouchableHighlight
            underlayColor={Colors.transparent}
            style={genderM}
            onPress={() => {
              dispatchAction('gender', 'M');
            }}>
            <Text>Hombre</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.transparent}
            style={genderF}
            onPress={() => {
              dispatchAction('gender', 'F');
            }}>
            <Text>Mujer</Text>
          </TouchableHighlight>
        </View>
      </View> */}

      {/* <View style={styles.section}>
        <Text style={styles.sectionText}>¿Cual es tu peso en Kg?</Text>
        <Input />
      </View> */}

      {/* <View style={styles.section}>
        <Text style={styles.sectionText}>¿Cual es tu fecha de nacimiento?</Text>
        <TouchableHighlight
          style={styles.inputMask}
          underlayColor={Colors.transparent}
          onPress={() => {
            setShowDatePicker(true);
          }}>
          <Text style={styles.inputMaskText}>
            {dayjs(birtdate).format('DD/MM/YYYY')}
          </Text>
        </TouchableHighlight>
      </View>
      {showDatePicker && (
        <DatePicker
          testID="dateTimePicker1"
          datatime={birtdate}
          mode="date"
          onChange={onChange}
          onClose={(n: Date) => {
            onChange(n);
            setShowDatePicker(false);
          }}
        />
      )} */}
    </View>
  );
};

export default SelectGenderScreen;
