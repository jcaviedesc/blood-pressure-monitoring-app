import React, { useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import crashlytics from '@react-native-firebase/crashlytics';
import { useFocusEffect } from '@react-navigation/native';
import type { RootStackParamList } from '../../router/types';
import { VerifyCode } from '../../components';
import { MainContainer } from '../../components/Layout';
import { AppStyles, Fonts } from '../../styles';
import { useConfirmPhone } from '../../providers/PhoneAuthProvider';
import { useAppDispatch } from '../../hooks';
import { AuthValidationThunk } from '../../thunks/Auth-thunk';
import { useI18nLocate } from '../../providers/LocalizationProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyPhone'>;

const VerifyPhoneScreen: React.FC<Props> = ({ route, navigation }) => {
  const { verificationType, phone } = route.params;
  const dispatch = useAppDispatch();
  const { translate } = useI18nLocate();
  // If null, no SMS has been sent
  const { confirm } = useConfirmPhone();

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
    dispatch(AuthValidationThunk(verificationType, navigation));
  }, [dispatch, navigation, verificationType]);

  async function confirmCode(code: string) {
    console.log("confirmCode", code);
    try {
      await confirm?.confirm(code);
      verifyPhoneSuccess();
    } catch (error) {
      console.log(error);
      crashlytics()
        .setAttribute('phone', phone)
        .then(() => {
          crashlytics().recordError(error);
        });
    }
  }

  console.log('porque hay cambio en VerifyPhoneScreen');
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
});

export default VerifyPhoneScreen;
