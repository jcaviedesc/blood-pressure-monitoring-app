import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  useColorScheme,
  TouchableHighlight,
  StatusBar,
  BackHandler,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import { AppStyles, Colors, Fonts, Metrics } from '../../styles';
import { Input, Button } from '../../components';
import { useConfirmPhone } from '../../providers/ConfirmPhone';
import { withLoading, PhoneInputWrapper } from '../../wrappers';
import { useAppSelector } from '../../hooks';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { selectAppLocale } from '../../store/app/appSlice';

interface Props
  extends NativeStackScreenProps<RootStackParamList, RouteName.SINGUP> {
  setLoading: (state: boolean) => void;
}

const LoginScreen: React.FC<Props> = ({ navigation, setLoading }) => {
  const { translate } = useI18nLocate();
  const { countryCode } = useAppSelector(selectAppLocale);
  const isDarkMode = useColorScheme() === 'dark';
  const [phone, setPhone] = useState('');

  const { setConfirm } = useConfirmPhone();

  async function navigate() {
    // add +57 from colombia
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        phone.split(' ')[1],
      );
      setConfirm(confirmation);
      setPhone('');
      navigation.navigate('VerifyPhone', {
        verificationType: 'Login',
      });
    } catch (error) {
      // TODO add sentry or other platform for track error
    } finally {
      setLoading(false);
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
    <ScrollView
      style={[styles.mainContainer, isDarkMode && styles.darkContainer]}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.background}
        showHideTransition="fade"
        hidden={false}
        barStyle="dark-content"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{translate('login_screen.title')}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.section}>
          <PhoneInputWrapper
            initialCountry={countryCode}
            value={phone}
            onPhoneInputChange={phoneNumer => {
              setPhone(phoneNumer);
            }}
            autoFocus
          />
          {/* <Input
            keyboardType="number-pad"
            value={phone}
            onChangeText={text => {
              setPhone(text);
            }}
            autoFocus
          /> */}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
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
          <TouchableHighlight
            underlayColor={Colors.background}
            onPress={() => {
              navigation.navigate('Singup');
            }}>
            <Text style={[styles.notAccountText, styles.loginText]}>
              {translate('login_screen.singup')}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  title: {
    fontSize: Fonts.size.h3,
    lineHeight: Fonts.size.h3 + 4,
    color: Colors.headline,
    textAlign: 'left',
    fontFamily: Fonts.type.bold,
  },
  titleContainer: {
    flex: 20,
    marginTop: 50,
    paddingHorizontal: Metrics.marginHorizontal,
  },
  bodyContainer: {
    flex: 10,
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

export default withLoading(LoginScreen);
