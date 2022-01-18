import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight,
} from 'react-native';
import dayjs from 'dayjs';
import { AppStyles, Colors } from '../../styles';
import { Input, DatePicker } from '../../components';
import useSingUp from '../../hooks/useSingUp';

const SingUpScreen: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [state, dispatchAction] = useSingUp();
  const { gender, birtdate } = state;

  const genderM = {
    ...styles.genderOption,
    backgroundColor: gender === 'M' ? '#1fb3e2' : Colors.transparent,
  };
  const genderF = {
    ...styles.genderOption,
    backgroundColor: gender === 'F' ? '#1fb3e2' : Colors.transparent,
  };

  const onChange = (selectedDate: Date): void => {
    const currentDate = selectedDate || birtdate;
    dispatchAction('birtdate', currentDate);
  };
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Crear Cuenta</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionText}>¿Cual es tu nombre completo?</Text>
        <Input />
      </View>

      <View style={styles.section}>
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
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionText}>¿Cual es tu peso en Kg?</Text>
        <Input />
      </View>

      <View style={styles.section}>
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
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  title: {
    fontSize: 23,
    fontWeight: '900',
    color: Colors.primaryText,
    textAlign: 'center',
  },
  titleContainer: {
    marginBottom: 42,
  },
  sectionText: {
    fontSize: 18,
    lineHeight: 19,
    fontWeight: '900',
    color: Colors.primaryText,
    textAlign: 'center',
  },
  section: {
    marginTop: 21,
    marginHorizontal: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    borderColor: '#A9B7CA',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    overflow: 'hidden',
    marginTop: 9,
  },
  genderOption: {
    flex: 1,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMask: {
    borderColor: '#A9B7CA',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    flex: 1,
    height: 42,
    justifyContent: 'center',
    paddingLeft: 6,
    backgroundColor: Colors.white,
  },
  inputMaskText: {
    color: Colors.primaryText,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SingUpScreen;
