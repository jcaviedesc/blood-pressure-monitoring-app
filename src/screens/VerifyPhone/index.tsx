import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import crashlytics from '@react-native-firebase/crashlytics';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { RootStackParamList } from '../../router/types';
import { VerifyCode, CountDownTimer, Button, Text } from '../../components';
import { MainContainer } from '../../components/Layout';
import { AppStyles, Fonts } from '../../styles';
import { updateUserField } from '../../store/signup/signupSlice';
import { updateUserDetail } from '../../store/user/userSlice';
import { useConfirmPhone } from '../../providers/PhoneAuthProvider';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppDispatch } from '../../hooks';
import { setScreenLoading } from '../../store/app/appSlice';
import { parseError } from '../../services/ErrorUtils';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyPhone'>;

const VerifyPhoneScreen: React.FC<Props> = ({ route, navigation }) => {
  const { phone } = route.params ?? { phone: null };
  const { translate } = useI18nLocate();
  const dispatch = useAppDispatch();
  // If null, no SMS has been sent
  const { result, setConfirm } = useConfirmPhone();
  const [isDisableTimerButton, setIsDisableTimerButton] = useState(true);
  const [isCodeResend] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
        if (user) {
          user.getIdTokenResult(true).then(tokenResult => {
            const { claims } = tokenResult;
            if (claims?.isRegistered) {
              // El usuario esta registrado
              dispatch(
                updateUserDetail({
                  name: user.displayName,
                  avatar: user.photoURL,
                }),
              );
            } else {
              // El usuario No esta registrado
              dispatch(updateUserField({ field: 'phone', value: phone }));
              navigation.navigate('SignUp');
            }
          });
        }
      };

      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, [dispatch, phone, navigation]),
  );

  const confirmCode = useCallback(
    async (code: string) => {
      try {
        dispatch(setScreenLoading(true));
        const userCredential = await result?.confirm(code);
        const isRegistered = await userCredential?.user
          .getIdTokenResult()
          .then(resultToken => {
            const { claims } = resultToken;
            return claims?.isRegistered;
          });
        // isNewUser or register incomplete
        if (userCredential?.additionalUserInfo?.isNewUser || !isRegistered) {
          dispatch(updateUserField({ field: 'phone', value: phone }));
          dispatch(setScreenLoading(false));
          navigation.navigate('SignUp');
        } else {
          const authUser = userCredential?.user;
          dispatch(setScreenLoading(false));
          dispatch(
            updateUserDetail({
              name: authUser?.displayName as string,
              avatar: authUser?.photoURL as string,
            }),
          );
        }
      } catch (error) {
        // TODO show error del codigo
        dispatch(setScreenLoading(false));
        const convertedToError = parseError(error);
        Toast.show({
          type: 'error',
          text1: convertedToError.message, // TODO translate
          position: 'bottom',
        });
        crashlytics()
          .setAttribute('phone', phone)
          .then(() => {
            crashlytics().recordError(convertedToError);
          });
      }
    },
    [dispatch, navigation, phone, result],
  );

  const onResendConde = async () => {
    try {
      const confirm = await auth().signInWithPhoneNumber(phone);
      // TODO change setConfirm name
      setConfirm(confirm);
    } catch (error) {
      crashlytics()
        .setAttributes({ phone, screen: 'verifyPhone' })
        .then(() => {
          crashlytics().recordError(parseError(error));
        });
    }
  };

  return (
    <MainContainer>
      <View style={styles.content}>
        <View style={[styles.titleContainer, styles.overrideTitleContainer]}>
          <Text style={styles.titleScreen}>
            {translate('verify_phone.title')}
          </Text>
        </View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitleScreen}>
            {translate('verify_phone.subtitle', { phone })}
          </Text>
        </View>
        <VerifyCode onCompleteCode={confirmCode} />
        <View style={styles.noCodeContainer}>
          <Text style={styles.noCode}>{translate('verify_phone.no_code')}</Text>
        </View>
        {isCodeResend ? (
          <Button hierarchy="quiet">
            <Text style={styles.noCode}>
              {translate('verify_phone.try_other_method')}
            </Text>
          </Button>
        ) : (
          <Button
            disabled={isDisableTimerButton}
            hierarchy="quiet"
            onPress={onResendConde}>
            <CountDownTimer
              textStyles={styles.noCode}
              timerMilliseconds={60000}
              prefix={translate('verify_phone.resendTimer')}
              expiredTimeComponent={
                <Text style={styles.noCode}>
                  {translate('verify_phone.resendCode')}
                </Text>
              }
              onFinish={() => {
                setIsDisableTimerButton(false);
              }}
            />
          </Button>
        )}
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  codeContainer: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
  },
  noCode: {
    ...Fonts.style.normal,
    textAlign: 'center',
  },
  resend: {
    marginTop: 12,
    padding: 9,
    alignItems: 'center',
  },
  subTitleContainer: {
    marginBottom: 12,
  },
  noCodeContainer: {
    marginBottom: 18,
  },
  overrideTitleContainer: {
    marginTop: 31,
  },
});

export default VerifyPhoneScreen;
