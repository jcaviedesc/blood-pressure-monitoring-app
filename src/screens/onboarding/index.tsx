import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'react-native';
import { Images } from '../../styles';

const OnboardingScreen: React.FC = ({ navigation }) => {
  const navigateToSingupScreen = () => {
    navigation.navigate('Signin');
  };
  return (
    <Onboarding
      onDone={navigateToSingupScreen}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              resizeMode="cover"
              source={Images.onboarding_blood_presure}
            />
          ),
          title: 'Medición de la presión arteria',
          subtitle:
            'Lleva el seguimiento de tu presión arterial y reduce el riesgo de tener complicaciones',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image resizeMode="cover" source={Images.onboarding_nutrition} />
          ),
          title: 'Nutrición',
          subtitle:
            'Un control integral de la hipertensión requiere de alimentación saludable',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image resizeMode="cover" source={Images.onboarding_medicines} />
          ),
          title: 'ingesta de medicamentos',
          subtitle:
            'Recibe alertas y recordatorios para que no olvides tomar tus medicamentos y sigas el tratamiento adecuadamente',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image resizeMode="cover" source={Images.onboarding_fitness} />
          ),
          title: 'Actividad fisica',
          subtitle: 'Manten un peso ideal y controla tu estado físico.',
        },
      ]}
    />
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   greeting: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     margin: 16
//   }
// });

export default OnboardingScreen;
