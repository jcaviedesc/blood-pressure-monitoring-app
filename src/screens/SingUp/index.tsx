import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import dayjs from 'dayjs';
import { AppStyles, Colors, Fonts, Metrics } from '../../styles';
import { Input, DatePicker, Button } from '../../components';
import useSingUp from '../../hooks/useSingUp';

type Props = NativeStackScreenProps<RootStackParamList, RouteName.SINGUP>;

const SingUpScreen: React.FC<Props> = ({ navigation }) => {
  // const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [state, dispatchAction] = useSingUp();
  const { fullName, phone, address } = state;

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
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Registrate en app_name y empieza a mejorar tu autocuidado
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.section}>
          <Input
            title="Nombre completo"
            value={fullName}
            onChangeText={text => {
              dispatchAction('fullName', text);
            }}
          />
        </View>

        <View style={styles.section}>
          <Input
            title="Numero de celuar"
            keyboardType="number-pad"
            value={phone}
            onChangeText={text => {
              dispatchAction('phone', text);
            }}
          />
        </View>
        <View style={styles.section}>
          <Input
            title="Dirección de donde vives"
            placeholder="Ej. Vereda Calucata, La mesa, cundinamarca"
            value={address}
            onChangeText={text => {
              dispatchAction('address', text);
            }}
          />
        </View>
      </View>

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
      <View style={styles.footer}>
        <Button
          title="Siguiente"
          onPress={() => {
            navigation.navigate(RouteName.VERIFY_PHONE);
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  title: {
    fontSize: Fonts.size.h1,
    lineHeight: Fonts.size.h1 + 4,
    color: Colors.primaryText,
    textAlign: 'left',
    fontFamily: Fonts.type.bold,
  },
  titleContainer: {
    flex: 20,
    marginBottom: 42,
    paddingHorizontal: Metrics.marginHorizontal,
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
    backgroundColor: Colors.white,
    borderColor: '#A9B7CA',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    flex: 1,
    height: 42,
    justifyContent: 'center',
    marginTop: 12,
    paddingLeft: 6,
  },
  inputMaskText: {
    color: Colors.primaryText,
    fontWeight: 'bold',
    fontSize: 18,
  },
  bodyContainer: {
    flex: 40,
  },
  footer: {
    flex: 20,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: Metrics.marginHorizontal,
    justifyContent: 'flex-end',
  },
});

export default SingUpScreen;
