// fecha de nacimiento, altura, tipo de sangre, peso
// IMC = peso/altura^2
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
} from 'react-native';
import 'dayjs/locale/es-mx';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import { Input, Button } from '../../components';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectUser, updateUserField } from '../../store/singup/singupSlice';
import { AppStyles, Colors, Fonts, Metrics } from '../../styles';

type Props = NativeStackScreenProps<RootStackParamList, RouteName.BASIC_INFO>;

const BasicInfoScreen: React.FC<Props> = ({ navigation }) => {
  const user = useAppSelector(selectUser);
  const { weight, stature, birthdate } = user;
  const dispatch = useAppDispatch();

  const [showDataPicker, setShowDataPicker] = useState(false);
  const [localBirthdate, setLocalBirthdate] = useState(new Date());

  const dispatchAction = (userField: string, value: string) => {
    dispatch(updateUserField({ [userField]: value }));
  };

  const onChangeDate = (event: Event, selectedDate: Date | undefined): void => {
    const currentDate = selectedDate || localBirthdate;
    setShowDataPicker(Platform.OS === 'ios');
    setLocalBirthdate(currentDate);
    dispatchAction('birthdate', dayjs(currentDate).format('DD/MM/YYYY'));
  };

  const onOpenDatePicker = () => {
    setShowDataPicker(true);
  };

  const KgComponent = (
    <View style={styles.rightContainer}>
      <Text style={styles.rigthText}>Kg</Text>
    </View>
  );

  const MeterComponent = (
    <View style={styles.rightContainer}>
      <Text style={styles.rigthText}>metros</Text>
    </View>
  );

  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <Text style={styles.title}>¡Falta poco para terminar!</Text>
      </View>
      <View style={styles.body}>
        <View style={[styles.section, styles.sectionOverride]}>
          <View style={styles.inputContainer}>
            <Input
              title="Peso"
              hint="Tu peso en Kilogramos"
              keyboardType="numeric"
              value={weight}
              onChangeText={text => {
                dispatchAction('weight', text);
              }}
              rigthComponent={KgComponent}
              autoFocus
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              title="Estatura"
              hint="Ejemplo 1.80 metros"
              keyboardType="numeric"
              value={stature}
              onChangeText={text => {
                dispatchAction('stature', `${text}`);
              }}
              rigthComponent={MeterComponent}
            />
          </View>
        </View>
        <View style={styles.birthdateContainerText}>
          <Text style={styles.birthdateText}>
            ¿Cual es tu fecha de Nacimiento?
          </Text>
        </View>
        <View>
          <TouchableHighlight
            style={styles.touchableBirthdate}
            onPress={onOpenDatePicker}>
            <Text style={styles.touchableText}>
              {birthdate
                ? dayjs(localBirthdate).locale('es-mx').format('DD MMMM YYYY')
                : '_ _ - _ _ - _ _'}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          title="siguiente"
          onPress={() => {
            navigation.navigate(RouteName.PROFILE_PICTURE);
          }}
        />
      </View>
      {showDataPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={localBirthdate}
          mode="date"
          display="default"
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  body: { flex: 1 },
  title: {
    ...Fonts.style.h3,
    textAlign: 'center',
    color: Colors.headline,
    marginBottom: 31,
    marginTop: 21,
  },
  sectionOverride: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: (Metrics.screenWidth - Metrics.marginHorizontal - 40) / 2,
  },
  rightContainer: {
    justifyContent: 'center',
  },
  rigthText: {
    fontFamily: Fonts.type.bold,
    color: Colors.headline,
    fontSize: Fonts.size.h5,
  },
  footer: {
    flex: 20,
    paddingTop: 120,
    paddingBottom: 30,
    paddingHorizontal: Metrics.marginHorizontal,
    justifyContent: 'flex-end',
  },
  birthdateContainerText: {
    marginTop: 21,
  },
  birthdateText: {
    textAlign: 'center',
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.h5,
  },
  touchableBirthdate: {
    marginTop: 21,
    backgroundColor: Colors.lightGray,
    borderRadius: 5,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 80,
  },
  touchableText: {
    color: Colors.headline,
    fontFamily: Fonts.type.bold,
    fontSize: 18,
  },
});

export default BasicInfoScreen;
