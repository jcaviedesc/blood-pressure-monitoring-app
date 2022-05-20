import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Onboarding from 'react-native-onboarding-swiper';
import { useFocusEffect } from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  BackHandler,
  Alert,
} from 'react-native';
import { Images, Colors, AppStyles, Fonts } from '../../styles';
import { openAppFirstTime } from '../../store/app/appSlice';
import { useAppDispatch } from '../../hooks';

const OnboardingScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigateToSingupScreen = () => {
    dispatch(openAppFirstTime());
    // navigation.navigate('Singup');
  };
  useEffect(() => {
    const backAction = () => {
      // Espera! 'Hold on!
      // Seguro quieres salir de la applicación? 'Are you sure you want to go back?
      Alert.alert('¡Espera!', '¿Seguro quieres salir de la applicación?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'SI', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  return (
    <View style={AppStyles.screen.mainContainer}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.background}
        showHideTransition="fade"
        hidden={false}
        barStyle="dark-content"
      />
      <Onboarding
        onDone={navigateToSingupScreen}
        onSkip={navigateToSingupScreen}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image
                resizeMode="cover"
                source={Images.onboarding_blood_presure}
              />
            ),
            title: (
              <Text style={styles.title}>Medición de la presión arterial</Text>
            ),
            subtitle: (
              <Text style={styles.description}>
                Lleva el seguimiento de tu presión arterial y reduce el riesgo
                de tener complicaciones.
              </Text>
            ),
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image resizeMode="cover" source={Images.onboarding_nutrition} />
            ),
            title: <Text style={styles.title}>Nutrición</Text>,
            subtitle: (
              <Text style={styles.description}>
                Un control integral de la hipertensión requiere de alimentación
                saludable.
              </Text>
            ),
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image resizeMode="cover" source={Images.onboarding_medicines} />
            ),
            title: (
              <Text style={styles.title}>
                Recordatorio toma de medicamentos
              </Text>
            ),
            subtitle: (
              <Text style={styles.description}>
                Recibe alertas para que no olvides tomar tus medicamentos y
                sigas el tratamiento adecuadamente.
              </Text>
            ),
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image resizeMode="cover" source={Images.onboarding_fitness} />
            ),
            title: <Text style={styles.title}>Actividad física</Text>,
            subtitle: (
              <Text style={styles.description}>
                Manten un peso ideal y controla tu estado físico.
              </Text>
            ),
          },
        ]}
        nextLabel={<Text style={styles.description}>Siguiente</Text>}
        skipLabel={<Text style={styles.description}>Omitir</Text>}
        bottomBarColor={Colors.background}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...Fonts.style.h3,
    color: Colors.headline,
    textAlign: 'center',
  },
  description: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.paragraph,
    textAlign: 'center',
    marginTop: 15,
  },
});

export default OnboardingScreen;
