import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  useColorScheme,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import { AppStyles, Colors, Fonts, Metrics } from '../../styles';
import { Input, Button } from '../../components';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectUser, updateUserField } from '../../store/singup/singupSlice';
import { useConfirmPhone } from '../../providers/ConfirmPhone';
import { PhoneInputWrapper } from '../../wrappers';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { selectAppLocale, setScreenLoading } from '../../store/app/appSlice';

type Props = NativeStackScreenProps<RootStackParamList, RouteName.SINGUP>;

const SingUpScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const isDarkMode = useColorScheme() === 'dark';
  // The `state` arg is correctly typed as `RootState` already
  const { fullName, phone, address } = useAppSelector(selectUser);
  const { countryCode } = useAppSelector(selectAppLocale);
  const dispatch = useAppDispatch();

  const { setConfirm } = useConfirmPhone();

  const dispatchAction = (userField: string, value: string) => {
    dispatch(updateUserField({ field: userField, value }));
  };

  async function nextRoute() {
    // add validation
    dispatch(setScreenLoading(true));
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
      navigation.navigate('VerifyPhone', { verificationType: 'SingUp' });
    } catch (error) {
      // TODO Senty
      console.log(error);
    } finally {
      dispatch(setScreenLoading(false));
    }
  }

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
        <Text style={styles.title}>
          Registrate en Tracking BP y empieza un seguimiento de tu presión
          arterial
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.section}>
          <Input
            title={translate('singup_screen.full_name')}
            value={fullName}
            onChangeText={text => {
              dispatchAction('fullName', text);
            }}
            autoFocus
          />
        </View>

        <View style={styles.section}>
          <PhoneInputWrapper
            title={translate('singup_screen.phone_number')}
            initialCountry={countryCode}
            value={phone}
            onPhoneInputChange={phoneNumer => {
              dispatchAction('phone', phoneNumer);
            }}
          />
        </View>
        <View style={styles.section}>
          <Input
            title={translate('singup_screen.address')}
            value={address}
            onChangeText={text => {
              dispatchAction('address', text);
            }}
            hint="Ejemplo. Vereda Calucata, La mesa, cundinamarca"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title={translate('button.next')}
          onPress={() => {
            nextRoute();
          }}
        />
        <View style={styles.allreadyAccount}>
          <View>
            <Text style={styles.allreadyAccountText}>
              {translate('singup_screen.all_ready_account')}
            </Text>
          </View>
          <TouchableHighlight
            underlayColor={Colors.background}
            onPress={() => {
              navigation.navigate('Login', { from: 'Login' });
            }}>
            <Text style={[styles.allreadyAccountText, styles.loginText]}>
              {translate('singup_screen.log_in')}
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
    marginBottom: 42,
    paddingHorizontal: Metrics.marginHorizontal,
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
  allreadyAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  allreadyAccountText: {
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

export default SingUpScreen;
