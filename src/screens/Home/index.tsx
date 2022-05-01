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
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import { Colors, Fonts, AppStyles, Images, Metrics } from '../../styles';
import { Box, Tag } from '../../components';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppSelector } from '../../hooks';
import { selectUserData } from '../../store/user/userSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const {
    profile: { fullName, profileUrl, gender },
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
    <View style={styles.mainContainer}>
      {/* TODO implementar alertas */}
      <View style={styles.alertContainer} />
      <ScrollView style={styles.content}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.background}
          showHideTransition="fade"
          hidden={false}
          barStyle="dark-content"
        />
        <View style={styles.userHeader}>
          <View style={styles.userTitleContainer}>
            <Text style={styles.userTitle}>
              {translate('home.user_greetings')}
            </Text>
            <Text
              style={[styles.userTitle, styles.userNameTitle]}
              lineBreakMode="tail"
              numberOfLines={1}>
              {fullName}
            </Text>
          </View>
          <TouchableHighlight
            underlayColor={Colors.background}
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <Image
              source={
                profileUrl
                  ? {
                      uri: profileUrl,
                    }
                  : gender === 'M'
                  ? Images.menGenderAvatar
                  : Images.womenGenderAvatar
              }
              defaultSource={Images.userPlaceholder}
              style={styles.avatar}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.titleSection}>
          <Text style={styles.titleSectonText}>
            {translate('home.medicines')}
          </Text>
          <View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigate('development');
              }}>
              <Tag value={translate('button.add')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.titleSection}>
          <Text style={styles.titleSectonText}>
            {translate('home.mystatus')}
          </Text>
        </View>
        <View style={styles.boxContainer}>
          <Box
            title={translate('blood_pressure')}
            status={bloodPressure.status}
            value={bloodPressure.value} //
            colors={['#fe5b5b', '#ef6463']}
            iconName="tint"
            onPress={() => {
              navigate('Home/BloodPressure');
            }}
          />
          <Box
            title="Peso Corporal"
            status={nutritional.status}
            value={nutritional.value}
            iconName="balance-scale"
            colors={['#1273a6', '#71c4d2']}
            onPress={() => {
              navigate('development');
            }}
          />
          <Box
            title="Ritmo Cardiaco"
            status={heartRate.status}
            value={heartRate.value} // bpm
            iconName="heartbeat"
            colors={['#10acd4', '#81eb91']}
            onPress={() => {
              navigate('development');
            }}
          />
          <Box
            title="Glucosa en sangre"
            status={bloodGlucose.status}
            value={bloodGlucose.value} // mg / dl
            iconName="eyedropper"
            colors={['#564ef7', '#9994ec']}
            onPress={() => {
              navigate('development');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  userHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 21,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
    backgroundColor: Colors.white,
  },
  userTitleContainer: {
    flex: 1,
    marginRight: 15,
  },
  userTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h5,
    color: Colors.headline,
  },
  userNameTitle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h4,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  alertContainer: {
    paddingTop: Metrics.navBarHeight,
  },
  titleSection: {
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleSectonText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h4,
    color: Colors.headline,
  },
});

export default HomeScreen;
