import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  useColorScheme,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Colors, Fonts } from '../../styles';
import { Input, Button } from '../../components';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectUser, updateUserField } from '../../store/signup/signupSlice';
import { useConfirmPhone } from '../../providers/ConfirmPhone';
import { PhoneInputWrapper } from '../../wrappers';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { selectAppLocale } from '../../store/app/appSlice';
import { signUpSchema, transformError } from './schemaValidators/signup';
import { signUpUser } from '../../thunks/sign-up-thunk';

type Props = NativeStackScreenProps<RootStackParamList, 'Singup'>;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const isDarkMode = useColorScheme() === 'dark';
  const { fullName, phone, docId } = useAppSelector(selectUser);
  const { countryCode } = useAppSelector(selectAppLocale);
  const dispatch = useAppDispatch();
  const { setConfirm } = useConfirmPhone();
  // local state
  const [inputErrors, setInputErrors] = useState({});

  const dispatchAction = (userField: string, value: string) => {
    dispatch(updateUserField({ field: userField, value }));
  };

  async function nextRoute() {
    const { error } = signUpSchema.validate(
      { fullName, phone, docId },
      { abortEarly: false },
    );

    if (error) {
      const errorTransform = transformError(error);
      setInputErrors(errorTransform);
    } else {
      dispatch(signUpUser(setConfirm))
        .unwrap()
        .then(async () => {
          navigation.navigate('VerifyPhone', { verificationType: 'SingUp' });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: err.msg,
            position: 'bottom',
          });
          console.log(err);
        });
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        style={[styles.mainContainer, isDarkMode && styles.darkContainer]}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.background}
          showHideTransition="fade"
          hidden={false}
          barStyle="dark-content"
        />
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleScreen}>
              {translate('singup_screen.title')}
            </Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subTitleScreen}>
              {translate('singup_screen.subtitle', { app_name: 'Betty' })}
            </Text>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.inputSection}>
              <Input
                title={translate('singup_screen.full_name')}
                value={fullName}
                onChangeText={text => {
                  dispatchAction('fullName', text);
                }}
                autoFocus
                hasError={inputErrors?.fullName}
                hint={inputErrors?.fullName}
              />
            </View>

            <View style={styles.inputSection}>
              <Input
                title={translate('singup_screen.document_id')}
                value={docId}
                keyboardType="numeric"
                onChangeText={text => {
                  dispatchAction('docId', text);
                }}
                hasError={inputErrors?.docId}
                hint={
                  inputErrors?.docId ??
                  translate('singup_screen.document_id_hint')
                }
              />
            </View>

            <View style={styles.inputSection}>
              <PhoneInputWrapper
                title={translate('singup_screen.phone_number')}
                initialCountry={countryCode}
                value={phone}
                onPhoneInputChange={phoneNumer => {
                  dispatchAction('phone', phoneNumer);
                }}
                error={inputErrors?.phone}
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login', { from: 'Login' });
                }}>
                <Text style={[styles.allreadyAccountText, styles.loginText]}>
                  {translate('singup_screen.log_in')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  titleContainer: {
    flex: 20,
  },
  subtitleContainer: {
    marginTop: 9,
    marginBottom: 15,
  },
  inputSection: {
    marginTop: 12,
  },
  bodyContainer: {
    flex: 40,
  },
  footer: {
    flex: 20,
    paddingTop: 60,
    paddingBottom: 30,
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
  container: {
    flex: 1,
  },
});

export default SignUpScreen;
