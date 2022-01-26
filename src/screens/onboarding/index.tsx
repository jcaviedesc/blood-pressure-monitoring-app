import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Onboarding from 'react-native-onboarding-swiper';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import { Images, Colors, AppStyles, Fonts } from '../../styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const navigateToSingupScreen = () => {
    navigation.navigate(RouteName.SINGUP);
  };
  return (
    <View style={AppStyles.screen.mainContainer}>
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
