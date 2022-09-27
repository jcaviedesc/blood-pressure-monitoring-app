import React, { useEffect } from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {
  Image,
  StyleSheet,
  View,
  StatusBar,
  BackHandler,
  Alert,
} from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Text } from '../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { Images, Colors, AppStyles, Fonts, Metrics } from '../../styles';
import { OPEN_FIRST_TIME_KEY } from '../../store/storeKeys';
import colors from '../../styles/Colors';
import { useI18nLocate } from '../../providers/LocalizationProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const { setItem } = useAsyncStorage(OPEN_FIRST_TIME_KEY);
  const { translate } = useI18nLocate();

  const navigateToSingupScreen = () => {
    setItem('opened');
    navigation.navigate('Welcome');
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
            backgroundColor: colors.background,
            image: (
              <Image
                style={styles.image}
                source={Images['woman-checking-blood-pressure']}
              />
            ),
            title: (
              <Text style={styles.title}>
                {translate('onboarding.title_one')}
              </Text>
            ),
            subtitle: (
              <Text style={styles.description}>
                {translate('onboarding.subtitle_one')}
              </Text>
            ),
          },
          {
            backgroundColor: colors.background,
            image: (
              <Image style={styles.image} source={Images.onboarding_selfcare} />
            ),
            title: (
              <Text style={styles.title}>
                {translate('onboarding.title_2')}
              </Text>
            ),
            subtitle: (
              <Text style={styles.description}>
                {translate('onboarding.subtitle_2')}
              </Text>
            ),
          },
          {
            backgroundColor: colors.background,
            image: (
              <Image resizeMode="cover" source={Images.onboarding_tracking} />
            ),
            title: (
              <Text style={styles.title}>
                {translate('onboarding.title_3')}
              </Text>
            ),
            subtitle: (
              <Text style={styles.description}>
                {translate('onboarding.subtitle_3')}
              </Text>
            ),
          },
        ]}
        nextLabel={
          <Text style={styles.description}>{translate('onboarding.next')}</Text>
        }
        skipLabel={<Text style={styles.description}>{translate('onboarding.skip')}</Text>}
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
    marginHorizontal: 21,
  },
  image: {
    width: Metrics.screenWidth,
    resizeMode: 'contain',
  },
});

export default OnboardingScreen;
