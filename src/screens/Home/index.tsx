import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  BackHandler,
  Alert,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import { Colors, Fonts, AppStyles, Images } from '../../styles';
import { Box } from '../../components';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppSelector } from '../../hooks';
import { selectUserData } from '../../store/user/userSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const {
    profile: { fullName, profileUrl },
    homeStatus: { bloodPressure, nutritional, heartRate, bloodGlucose },
  } = useAppSelector(selectUserData);

  useFocusEffect(
    React.useCallback(() => {
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
    }, []),
  );

  const navigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };
  return (
    <ScrollView style={styles.mainContainer}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.background}
        showHideTransition="fade"
        hidden={false}
        barStyle="dark-content"
      />
      <View style={styles.content}>
        <View style={styles.userHeader}>
          <View style={styles.userTitleContainer}>
            <Text style={styles.userTitle} numberOfLines={1}>
              Hola, <Text style={styles.userNameTitle}>{fullName}</Text>
            </Text>
          </View>
          <TouchableHighlight
            underlayColor={Colors.background}
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <Image
              source={{
                uri:
                  profileUrl ||
                  'https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png',
              }}
              defaultSource={Images.userPlaceholder}
              style={styles.avatar}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.boxContainer}>
          <Box
            title={translate('blood_pressure')}
            status={bloodPressure.status}
            value={bloodPressure.value} //
            colors={['#fe5b5b', '#ef6463']}
            iconName="tint"
            onPress={() => {
              navigate(RouteName.BLOOD_PRESSURE);
            }}
          />
          <Box
            title="Peso Corporal"
            status={nutritional.status}
            value={nutritional.value}
            iconName="balance-scale"
            colors={['#1273a6', '#71c4d2']}
          />
          <Box
            title="Ritmo Cardiaco"
            status={heartRate.status}
            value={heartRate.value} // bpm
            iconName="heartbeat"
            colors={['#10acd4', '#81eb91']}
          />
          <Box
            title="Glucosa en sangre"
            status={bloodGlucose.status}
            value={bloodGlucose.value} // mg / dl
            iconName="eyedropper"
            colors={['#564ef7', '#9994ec']}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  userHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 21,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
    backgroundColor: Colors.white,
  },
  userTitleContainer: {
    flex: 1,
    marginRight: 15,
  },
  userTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h2,
    color: Colors.primary,
  },
  userNameTitle: {
    fontSize: Fonts.size.h3,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default HomeScreen;
