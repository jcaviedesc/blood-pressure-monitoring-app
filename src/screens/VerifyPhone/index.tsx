import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import crashlytics from '@react-native-firebase/crashlytics';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { RootStackParamList } from '../../router/types';
import { VerifyCode, CountDownTimer, Button, Text } from '../../components';
import { MainContainer } from '../../components/Layout';
import { AppStyles, Fonts } from '../../styles';
import { updateUserField } from '../../store/signup/signupSlice';
import { updateUserProfie } from '../../store/user/userSlice';
import { useConfirmPhone } from '../../providers/PhoneAuthProvider';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppDispatch } from '../../hooks';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyPhone'>;

const VerifyPhoneScreen: React.FC<Props> = ({ route, navigation }) => {
  const { phone } = route.params ?? { phone: null };
  const { translate } = useI18nLocate();
  const dispatch = useAppDispatch();
  // If null, no SMS has been sent
  const { result, setConfirm } = useConfirmPhone();
  const [isDisableTimerButton, setIsDisableTimerButton] = useState(true);
  const [isCodeResend, setIsCodeResend] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
        if (user) {
          user.getIdTokenResult(true).then(tokenResult => {
            const { claims } = tokenResult;
            if (!claims?.isRegistered) {
              navigation.navigate('Singup');
            }
          });
        }
      };

      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, [navigation]),
  );

  const confirmCode = useCallback(
    async (code: string) => {
      try {
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
          navigation.navigate('Singup');
          // navigate to signin flow
        } else {
          const authUser = userCredential?.user;
          // TODO ver como typar un objeto que sus key esten dentro del userState
          // pero que no oblique a implementar todo el objeto, solo que no se agregen
          // keys diferentes a la del estado.
          dispatch(
            updateUserProfie({
              name: authUser?.displayName as string,
              avatar: authUser?.photoURL as string,
            }));
          /*
           * get profile info
           * - displayName = name + lastname
           * - avatar = photo or defaul
           * and redirecto to homeTabs
           */
        }
      } catch (error) {
        crashlytics()
          .setAttribute('phone', phone)
          .then(() => {
            crashlytics().recordError(error);
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
          crashlytics().recordError(error);
        });
    }
  };

  return (
    <MainContainer>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
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
});

export default VerifyPhoneScreen;
