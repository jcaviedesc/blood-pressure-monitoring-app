import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'react-native';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import { Images } from '../../styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const navigateToSingupScreen = () => {
    navigation.navigate(RouteName.SINGUP);
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
          title: 'Actividad física',
          subtitle: 'Manten un peso ideal y controla tu estado físico.',
        },
      ]}
    />
  );
};

export default OnboardingScreen;
