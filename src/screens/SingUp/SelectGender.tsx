import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectUser, updateUserField } from '../../store/singup/singupSlice';
import { Fonts, Colors, AppStyles, Images, Metrics } from "../../styles";
import { Card } from '../../components';
// import dayjs from 'dayjs';
// import auth from '@react-native-firebase/auth';

const SelectGenderScreen = () => {
  // const [showDatePicker, setShowDatePicker] = React.useState(false);
  const { gender } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const onSelectGender = (select: string) => {
    dispatch(updateUserField({ gender: select }));
  };
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
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Selecciona tu Genero</Text>
      <View style={styles.genderContainer}>
        <TouchableHighlight
          underlayColor={Colors.transparent}
          style={styles.cardTouchable}
          onPress={() => {
            onSelectGender('male');
          }}>
          <Card selected={gender === 'male'}>
            <View style={styles.genderContent}>
              <Image source={Images.maleIcon} style={styles.image} />
              <Text style={styles.genderText}>Hombre</Text>
            </View>
          </Card>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={Colors.transparent}
          style={styles.cardTouchable}
          onPress={() => {
            onSelectGender('female');
          }}>
          <Card selected={gender === 'female'}>
            <View style={styles.genderContent}>
              <Image source={Images.femaleIcon} style={styles.image} />
              <Text style={styles.genderText}>Mujer</Text>
            </View>
          </Card>
        </TouchableHighlight>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.textDescription}>
          Para ofrecerte una mejor experiencia nosotros necesitamos conocer tu
          genero
        </Text>
      </View>

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

const styles = StyleSheet.create({
  ...AppStyles.screen,
  title: {
    ...Fonts.style.h3,
    textAlign: 'center',
    color: Colors.headline,
    marginBottom: 31,
    marginTop: 21,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  cardTouchable: {
    width: Metrics.screenWidth / 2 - 40,
    height: Metrics.screenWidth / 2,
  },
  genderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 21,
  },
  genderText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    textAlign: 'center',
    color: Colors.headline,
  },
  descriptionContainer: {
    marginTop: 30,
    marginHorizontal: Metrics.marginHorizontal,
  },
  textDescription: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.h6,
    textAlign: 'center',
    color: Colors.paragraph,
  },
});

export default SelectGenderScreen;
