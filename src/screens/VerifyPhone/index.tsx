import React, { useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { RootStackParamList } from '../../router/types';
import { VerifyCode } from '../../components';
import { AppStyles, Colors, Fonts, Metrics } from '../../styles';
import { useConfirmPhone } from '../../providers/ConfirmPhone';
import { useAppDispatch } from '../../hooks';
import { changeUserSessionState } from '../../store/app/appSlice';
import { useI18nLocate } from '../../providers/LocalizationProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyPhone'>;

const VerifyPhoneScreen: React.FC<Props> = ({ route, navigation }) => {
  const { verificationType } = route.params;
  const { translate } = useI18nLocate();
  useFocusEffect(
    useCallback(() => {
      if (verificationType === 'SingUp') {
        // search how typed navigation options
        navigation.setOptions({ showStepHeader: true });
      } else {
        navigation.setOptions({ showStepHeader: false });
      }
    }, [verificationType, navigation]),
  );

  const dispatch = useAppDispatch();
  const verifyPhoneSuccess = useCallback(() => {
    dispatch(changeUserSessionState(true));
    navigation.navigate(
      verificationType === 'SingUp' ? 'Singup/SelectGender' : 'Home',
    );
  }, [navigation, verificationType, dispatch]);

  // If null, no SMS has been sent
  const {
    values: { confirm, phone },
  } = useConfirmPhone();
  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      if (user) {
        verifyPhoneSuccess();
        // showToast('The phone number is already registered');
        // TODO naviage to login options?
      }
    },
    [verifyPhoneSuccess],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  async function confirmCode(code: string) {
    try {
      await confirm?.confirm(code);
      verifyPhoneSuccess();
    } catch (error) {
      console.log('Invalid code.', error);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.content, styles.contentExtra]}>
        <View>
          <Text style={styles.titleScreen}>
            {translate('verify_phone.title')}
          </Text>
        </View>
        <View>
          <Text style={styles.subtitle}>
            {translate('verify_phone.subtitle', { phone })}
          </Text>
        </View>
        <VerifyCode
          onCompleteCode={(code: string) => {
            confirmCode(code);
          }}
        />
        <Text style={styles.noCode}>{translate('verify_phone.no_code')}</Text>
        <TouchableOpacity style={styles.resend}>
          {/* TODO add timer */}
          <Text>{translate('verify_phone.resend', { time: '1:00' })}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  contentExtra: {
    paddingTop: Metrics.screenHeight / 10,
  },
  subtitle: {
    ...Fonts.style.normal,
    color: Colors.paragraph,
    marginBottom: 21,
  },
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
});

export default VerifyPhoneScreen;
