import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { VerifyCode } from "../../components";
import { AppStyles, Colors, Fonts, Metrics } from "../../styles";
import { useAppSelector } from '../../hooks';
import { selectUser } from '../../store/singup/singupSlice';

type Props = NativeStackScreenProps<RootStackParamList, RouteName.VERIFY_PHONE>;

const VerifyPhoneScreen: React.FC<Props> = ({ route, navigation }) => {
  // const { phone } = useAppSelector(selectUser);
  // If null, no SMS has been sent
  const {
    params: { confirm },
  } = route;
  // const [confirm, setConfirm] = useState(null);

  // useEffect(() => {
  //   async function signInWithPhoneNumber(phoneNumber: string) {
  //     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //     setConfirm(confirmation);
  //   }
  //   // add +57 from colombia
  //   signInWithPhoneNumber(`+57${phone}`);
  // }, [phone]);

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      if (user) {
        // if photoURL is null isNewUser
        const { photoURL } = user;
        navigation.navigate(RouteName.SELECT_GENDER);
        if (!photoURL) {
          // TODO set RefresToken on redux state
        } else {
          // showToast('The phone number is already registered');
          // navigation.navigate(Routes.WELCOME);
          // TODO naviage to login options?
        }
      }
    },
    [navigation],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  async function confirmCode(code: string) {
    try {
      await confirm.confirm(code);
      navigation.navigate(RouteName.SELECT_GENDER);
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
            // confirmCode(code);
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
