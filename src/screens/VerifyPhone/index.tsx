import React, { useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import type { RootStackParamList } from '../../router/types';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { VerifyCode } from '../../components';
import { AppStyles, Colors, Fonts, Metrics } from '../../styles';
import { useConfirmPhone } from '../../context/ConfirmPhone';
import { useAppDispatch } from '../../hooks';
import { changeUserSessionState } from '../../store/app/appSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyPhone'>;

const VerifyPhoneScreen: React.FC<Props> = ({ route, navigation }) => {
  const { verificationType } = route.params;
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
  const { confirm } = useConfirmPhone();
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
        <Text style={styles.title}>
          Te enviamos un código para verificar tu numero de celuar
        </Text>
        <VerifyCode
          onCompleteCode={(code: string) => {
            confirmCode(code);
          }}
        />
        <Text style={styles.noCode}>¿No recibiste el código?</Text>
        <TouchableOpacity style={styles.resend}>
          <Text>Reenviar en: 00: 05</Text>
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
  title: {
    ...Fonts.style.h4,
    textAlign: 'center',
    color: Colors.gray300,
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
