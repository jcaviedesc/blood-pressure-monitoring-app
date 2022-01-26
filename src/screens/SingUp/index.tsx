import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  useColorScheme,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import { AppStyles, Colors, Fonts, Metrics } from '../../styles';
import { Input, Button } from '../../components';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectUser, updateUserField } from '../../store/singup/singupSlice';
import { useConfirmPhone } from '../../context/ConfirmPhone';
import { withLoading } from '../../wrappers';

type Props = NativeStackScreenProps<RootStackParamList, RouteName.SINGUP>;

const SingUpScreen: React.FC<Props> = ({ navigation, setLoading }) => {
  const isDarkMode = useColorScheme() === 'dark';
  // The `state` arg is correctly typed as `RootState` already
  const user = useAppSelector(selectUser);
  const { fullName, phone, address } = user;
  const dispatch = useAppDispatch();

  const { setConfirm } = useConfirmPhone();

  const dispatchAction = (userField: string, value: string) => {
    dispatch(updateUserField({ [userField]: value }));
  };

  async function navigate() {
    // add +57 from colombia
    setLoading(true);
    const confirmation = await auth().signInWithPhoneNumber(`+57${phone}`);
    setConfirm(confirmation);
    setLoading(false);
    navigation.navigate(RouteName.VERIFY_PHONE);
  }

  return (
    <ScrollView
      style={[styles.mainContainer, isDarkMode && styles.darkContainer]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Registrate en Tracking BP y empieza un seguimiento de tu presión
          arterial
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.section}>
          <Input
            title="Nombre completo"
            value={fullName}
            onChangeText={text => {
              dispatchAction('fullName', text);
            }}
          />
        </View>

        <View style={styles.section}>
          <Input
            title="Numero de celular"
            keyboardType="number-pad"
            value={phone}
            onChangeText={text => {
              dispatchAction('phone', text);
            }}
          />
        </View>
        <View style={styles.section}>
          <Input
            title="Dirección de donde vives"
            placeholder="Ej. Vereda Calucata, La mesa, cundinamarca"
            value={address}
            onChangeText={text => {
              dispatchAction('address', text);
            }}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="siguiente"
          onPress={() => {
            navigate();
          }}
        />
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
  sectionText: {
    fontSize: 18,
    lineHeight: 19,
    fontWeight: '900',
    color: Colors.primaryText,
    textAlign: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    borderColor: '#A9B7CA',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    overflow: 'hidden',
    marginTop: 9,
  },
  genderOption: {
    flex: 1,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMask: {
    backgroundColor: Colors.white,
    borderColor: '#A9B7CA',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    flex: 1,
    height: 42,
    justifyContent: 'center',
    marginTop: 12,
    paddingLeft: 6,
  },
  inputMaskText: {
    color: Colors.primaryText,
    fontWeight: 'bold',
    fontSize: 18,
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
});

export default withLoading(SingUpScreen);
