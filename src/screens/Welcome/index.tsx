import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  BackHandler,
  Alert,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Colors, Fonts, Images, Metrics } from '../../styles';
import { Button } from '../../components';
import { MainContainer } from '../../components/Layout';
import { useConfirmPhone } from '../../providers/PhoneAuthProvider';
import { PhoneInputWrapper } from '../../wrappers';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { selectAppLocale, setScreenLoading } from '../../store/app/appSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
// TODO refactor P1
const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const dispatch = useAppDispatch();
  const { countryCode } = useAppSelector(selectAppLocale);
  const [{ phone, isValidPhoneNumber }, setPhone] = useState({
    phone: '',
    isValidPhoneNumber: false,
  });

  const { setConfirm } = useConfirmPhone();

  async function navigate() {
    dispatch(setScreenLoading(true));
    try {
      // const provider = auth.PhoneAuthProvider
      const confirm = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirm);
      setPhone({
        phone: '',
        isValidPhoneNumber: false,
      });
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
    <MainContainer isScrollView>
      <StatusBar
        animated={true}
        backgroundColor={Colors.background}
        showHideTransition="fade"
        hidden={false}
        barStyle="dark-content"
      />
      <View style={styles.titleContainer}>
        <Text style={[styles.titleScreen, styles.titleOverride]}>
          {translate('welcome.title')}
        </Text>
      </View>
      <View>
        <Image source={Images.welcome1} style={styles.welcomeImage} />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.section}>
          <PhoneInputWrapper
            initialCountry={countryCode}
            onValidPhoneInput={(isValidPhone, number) => {
              setPhone({
                phone: number,
                isValidPhoneNumber: isValidPhone,
              });
            }}
            autoFocus
          />
        </View>
      </View>

      <View style={styles.footer}>
        {/* TODO enable button cuando el campo de telefono tiene un numero valido */}
        <Button
          disabled={!isValidPhoneNumber}
          title={translate('welcome.start_button')}
          onPress={() => {
            navigate();
          }}
        />
        <View style={styles.emailButtonContainer}>
          <Button
            size="normal"
            hierarchy="transparent"
            title={translate('welcome.continue_with_email')}
            onPress={() => {
              navigation.navigate('development');
            }}
          />
        </View>
      </View>
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
  titleOverride: {
    textAlign: 'center',
  },
  welcomeImage: {
    width: Metrics.screenWidth,
    resizeMode: 'contain',
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
  emailButtonContainer: {
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

export default WelcomeScreen;
