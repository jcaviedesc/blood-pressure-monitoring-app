import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  SafeAreaView,
} from 'react-native';
// TODO import according to i18n
import dayjsUtil from '../../services/DatatimeUtil';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { Button, DatePicker, Layout } from '../../components';
import { MainContainer } from '../../components/Layout';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectUser, updateUserField } from '../../store/signup/signupSlice';
import { AppStyles, Fonts, Colors, Images } from '../../styles';
import { birthdateSchema } from './schemaValidators/signup';

type Props = NativeStackScreenProps<RootStackParamList, 'Singup/Birthdate'>;

const BirthdateScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { birthdate } = user;
  const [date, setDate] = useState(new Date(327207177000));
  const [show, setShow] = useState(false);
  const [inputErrors, setInputErrors] = useState('');

  const limitDate = useMemo(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const maxDate = new Date(year, 11, 31, 9, 1, 1, 1);
    return maxDate;
  }, []);

  const dispatchAction = (userField: string, value: string) => {
    dispatch(updateUserField({ field: userField, value }));
  };
  const nextStepHandler = () => {
    const { error } = birthdateSchema.validate(birthdate);
    if (error) {
      setInputErrors(translate('validation.required'));
    } else {
      setInputErrors('');
      navigation.navigate('Singup/BodyInfo');
    }
  };

  const onChange = (selectedDate: Date): void => {
    setShow(false);
    setDate(selectedDate);
    dispatchAction('birthdate', dayjsUtil(selectedDate).format('YYYY-MM-DD'));
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <MainContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Layout.HOCKeyboardView>
          <ScrollView style={styles.content}>
            <View style={styles.titleContainer}>
              <View>
                <Text style={styles.titleScreen}>
                  {translate('birthdate_screen.title')}
                </Text>
              </View>
              <Image source={Images.congratulations} style={styles.image} />
            </View>
            {/* <View style={styles.section}>
            <Input
              title={translate('birthdate_screen.address')}
              value={address}
              onChangeText={text => {
                dispatchAction('address', text);
              }}
              hint={translate('birthdate_screen.address_hint')}
            />
          </View> */}
            <View style={styles.section}>
              <Text style={styles.birthdateText}>
                {translate('birthdate_screen.birthdate')}
              </Text>
              <View>
                <TouchableHighlight
                  underlayColor={Colors.background}
                  style={[
                    styles.touchableBirthdate,
                    {
                      borderColor:
                        inputErrors !== '' ? Colors.error : Colors.lightGray,
                    },
                  ]}
                  onPress={showDatepicker}>
                  <Text style={styles.touchableText}>
                    {birthdate
                      ? dayjsUtil(date).format('DD - MMMM -  YYYY')
                      : '_ _ - _ _ - _ _'}
                  </Text>
                </TouchableHighlight>
              </View>
              {inputErrors !== '' && (
                <Text style={styles.hint}>{inputErrors}</Text>
              )}
            </View>
          </ScrollView>
          {show && (
            <DatePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="spinner"
              onChange={onChange}
              maximumDate={limitDate}
            />
          )}
          <View style={styles.section}>
            <Button title={translate('button.next')} onPress={nextStepHandler} />
          </View>
        </Layout.HOCKeyboardView>
      </SafeAreaView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  titleContainer: {
    flex: 11,
    alignItems: 'center',
  },
  birthdateText: {
    marginLeft: 3,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.h5,
    color: Colors.paragraph,
  },
  touchableBirthdate: {
    marginTop: 9,
    backgroundColor: Colors.lightGray,
    borderRadius: 5,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  touchableText: {
    color: Colors.headline,
    fontFamily: Fonts.type.bold,
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: 308,
    resizeMode: 'contain',
  },
  hint: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.hint,
  },
});

export default BirthdateScreen;
