import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { RootStackParamList } from '../../router/types';
import { VerifyCode } from '../../components';
import { AppStyles, Fonts } from '../../styles';
import { useConfirmPhone } from '../../providers/ConfirmPhone';
import { useI18nLocate } from '../../providers/LocalizationProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyPhone'>;

const VerifyPhoneScreen: React.FC<Props> = ({ route, navigation }) => {
  const { verificationType } = route.params;
  const { translate } = useI18nLocate();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

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

  const verifyPhoneSuccess = useCallback(() => {
    navigation.navigate(
      verificationType === 'SingUp' ? 'Singup/Birthdate' : 'Home',
    );
  }, [navigation, verificationType]);

  // If null, no SMS has been sent
  const {
    values: { confirm, phone },
  } = useConfirmPhone();
  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (user) {
      verifyPhoneSuccess();
      // showToast('The phone number is already registered');
      // TODO naviage to login options?
    }
    if (initializing) {
      setInitializing(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []),
  );

  async function confirmCode(code: string) {
    try {
      const result = await confirm?.confirm(code);
      console.log("confirmCode")
      console.log(result);
      verifyPhoneSuccess();
    } catch (error) {
      console.log('Invalid code.', error);
    }
  }

  if (initializing) {
    return null;
  }

  return (
    <View style={styles.mainContainer}>
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
});

export default VerifyPhoneScreen;
