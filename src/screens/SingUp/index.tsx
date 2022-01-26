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
import { useConfirmPhone } from '../../context/ConfirmPhone';
import { withLoading } from '../../wrappers';

type Props = NativeStackScreenProps<RootStackParamList, RouteName.SINGUP> & {
  setLoading: (state: boolean) => void;
};

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

  async function nextRoute() {
    // add +57 from colombia
    setLoading(true);
    const confirmation = await auth().signInWithPhoneNumber(`+57${phone}`);
    setConfirm(confirmation);
    setLoading(false);
    navigation.navigate('VerifyPhone', { verificationType: 'SingUp' });
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
            title="Nombre completo"
            value={fullName}
            onChangeText={text => {
              dispatchAction('fullName', text);
            }}
            autoFocus
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
            nextRoute();
          }}
        />
        <View style={styles.allreadyAccount}>
          <View>
            <Text style={styles.allreadyAccountText}>
              ¿Ya tienes una cuenta?
            </Text>
          </View>
          <TouchableHighlight
            underlayColor={Colors.background}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={[styles.allreadyAccountText, styles.loginText]}>
              Iniciar sessión
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

export default withLoading(SingUpScreen);
