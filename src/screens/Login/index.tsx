import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  BackHandler,
  Alert,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Colors, Fonts, Metrics } from '../../styles';
import { Button } from '../../components';
import { MainContainer } from '../../components/Layout';
import { useConfirmPhone } from '../../providers/PhoneAuthProvider';
import { PhoneInputWrapper } from '../../wrappers';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { selectAppLocale, setScreenLoading } from '../../store/app/appSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
// TODO refactor P1
const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const dispatch = useAppDispatch();
  const { countryCode } = useAppSelector(selectAppLocale);
  const [phone, setPhone] = useState('');

  const { setConfirm } = useConfirmPhone();

  async function navigate() {
    dispatch(setScreenLoading(true));
    try {
      const confirm = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirm);
      setPhone('');
      navigation.navigate('VerifyPhone', {
        verificationType: 'Login',
        phone,
      });
    } catch (error) {
      crashlytics()
        .setAttribute('phone', phone)
        .then(() => {
          crashlytics().recordError(error);
        });
      // TODO show toast
    } finally {
      dispatch(setScreenLoading(false));
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        // Espera! 'Hold on!
        // Seguro quieres salir de la applicación? 'Are you sure you want to go back?
        Alert.alert(
          translate('skip_app_alert.title'),
          translate('skip_app_alert.subtitle'),
          [
            {
              text: translate('skip_app_alert.cancel'),
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: translate('skip_app_alert.ok'),
              onPress: () => BackHandler.exitApp(),
            },
          ],
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [translate]),
  );

  return (
    <MainContainer>
      <ScrollView>
        <StatusBar
          animated={true}
          backgroundColor={Colors.background}
          showHideTransition="fade"
          hidden={false}
          barStyle="dark-content"
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleScreen}>
            {translate('login_screen.title')}
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.section}>
            <PhoneInputWrapper
              title={translate('login_screen.subtitle')}
              initialCountry={countryCode}
              value={phone}
              onPhoneInputChange={phoneNumer => {
                setPhone(phoneNumer);
              }}
              autoFocus
            />
          </View>
        </View>

        <View style={styles.footer}>
          {/* TODO enable button cuando el campo de telefono tiene un numero valido */}
          <Button
            disabled={phone === ''}
            title={translate('button.next')}
            onPress={() => {
              navigate();
            }}
          />
          <View style={styles.notAccount}>
            <View>
              <Text style={styles.notAccountText}>
                {translate('login_screen.not_account')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Singup');
              }}>
              <Text style={[styles.notAccountText, styles.loginText]}>
                {translate('login_screen.singup')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  titleContainer: {
    flex: 20,
    marginTop: 50,
    paddingHorizontal: Metrics.marginHorizontal,
  },
  bodyContainer: {
    flex: 10,
    backgroundColor: Colors.transparent,
  },
  footer: {
    flex: 80,
    paddingVertical: 30,
    paddingHorizontal: Metrics.marginHorizontal,
    justifyContent: 'flex-end',
  },
  notAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  notAccountText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.paragraph,
    color: Colors.paragraph,
    marginRight: 9,
  },
  loginText: {
    fontFamily: Fonts.type.bold,
    color: Colors.button,
  },
});

export default LoginScreen;
