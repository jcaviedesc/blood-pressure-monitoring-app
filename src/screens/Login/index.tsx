import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  useColorScheme,
  TouchableHighlight,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import { AppStyles, Colors, Fonts, Metrics } from '../../styles';
import { Input, Button } from '../../components';
import { useConfirmPhone } from '../../context/ConfirmPhone';
import { withLoading } from '../../wrappers';

interface Props
  extends NativeStackScreenProps<RootStackParamList, RouteName.SINGUP> {
  setLoading: (state: boolean) => void;
}

const LoginScreen: React.FC<Props> = ({ navigation, setLoading }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [phone, setPhone] = useState('');

  const { setConfirm } = useConfirmPhone();

  async function navigate() {
    // add +57 from colombia
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+57${phone}`);
      setConfirm(confirmation);
      navigation.navigate(RouteName.VERIFY_PHONE, {
        verificationType: 'Login',
      });
    } catch (error) {
      // TODO add sentry or other platform for track error
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={[styles.mainContainer, isDarkMode && styles.darkContainer]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Inicia sesión ingresando tu numero de celuar
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.section}>
          <Input
            keyboardType="number-pad"
            value={phone}
            onChangeText={text => {
              setPhone(text);
            }}
            autoFocus
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
        <View style={styles.notAccount}>
          <View>
            <Text style={styles.notAccountText}>¿No tienes una cuenta?</Text>
          </View>
          <TouchableHighlight
            underlayColor={Colors.background}
            onPress={() => {
              navigation.navigate('Singup');
            }}>
            <Text style={[styles.notAccountText, styles.loginText]}>
              Registrarme
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
    marginTop: 50,
    paddingHorizontal: Metrics.marginHorizontal,
  },
  bodyContainer: {
    flex: 10,
  },
  footer: {
    flex: 80,
    paddingVertical: 30,
    paddingHorizontal: Metrics.marginHorizontal,
    justifyContent: 'flex-end',
  },
  notAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  notAccountText: {
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

export default withLoading(LoginScreen);
