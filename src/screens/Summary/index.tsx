import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import type { RootStackParamList } from '../../router/types';
import { Colors, Fonts, AppStyles, Images, Metrics } from '../../styles';
import { Box, Button } from '../../components';
import { MainContainer } from '../../components/Layout';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectUserData } from '../../store/user/userSlice';
import { useForegroundNotification } from '../../hooks/useNotifications';
import { startUserSessionThunk } from '../../thunks/users-thunk';
import { useBackHandlerExitApp } from '../../hooks/back-handler';

const ICONS = {
  BloodPressure: ['heart', '#fe5b5b'],
  Weight: ['child', '#009000'],
  Height: ['child', '#009000'],
};

type Props = NativeStackScreenProps<RootStackParamList, 'Summary'>;

const SummaryScreen: React.FC<Props> = ({ navigation }) => {
  useForegroundNotification();
  const { translate } = useI18nLocate();
  const { name, lastName, avatar, sex, id, measurements } =
    useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(startUserSessionThunk(id));
    }
  }, [dispatch, id]);

  // TODO add analytics
  useBackHandlerExitApp({
    alertTitle: translate('skip_app_alert.title'),
    alertDescription: translate('skip_app_alert.subtitle'),
    alertOkText: translate('skip_app_alert.ok'),
    alertCancelText: translate('skip_app_alert.cancel'),
  });

  const navigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };
  return (
    <MainContainer>
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
              {`${name} ${lastName}`}
            </Text>
          </View>
          <TouchableHighlight
            underlayColor={Colors.background}
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <Image
              source={
                avatar
                  ? {
                    uri: avatar,
                  }
                  : sex === 'M'
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
            <Button
              size="small"
              hierarchy="quiet"
              title={translate('button.add')}
              onPress={() => {
                navigation.navigate('Medicine');
              }}
            />
          </View>
          
        </View>
        <View style={styles.linkMedicine}>
          <Text style={styles.linkSectonText}
            onPress={() => {
              navigate('MedicineList');
            }}>
            {translate('home.show_medicines')}
          </Text>
        </View>
        <View style={styles.titleSection}>
          <Text style={styles.titleSectonText}>
            {translate('home.mystatus')}
          </Text>
        </View>
        <View style={styles.measurementsContainer}>
          {measurements.map(measurement => {
            const [iconName, iconColor] = ICONS[measurement.name];
            return (
              <Box
                key={measurement.name}
                title={translate(`measurements.${measurement.name}`)}
                status={measurement.status}
                value={measurement.value.toString()}
                unit={measurement.unit}
                iconColor={iconColor}
                iconName={iconName}
                lastMeasurement={measurement.lastMeasurement}
                onPress={() => {
                  navigate(measurement.name);
                }}
              />
            );
          })}
          {/* TODO add fallback error component si no se pueden cargar measurements */}

          {/* <Box
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
          /> */}
        </View>
      </ScrollView>
    </MainContainer>
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
  measurementsContainer: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  alertContainer: {
    paddingTop: Metrics.navBarHeight,
  },
  titleSection: {
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleSectonText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h4,
    color: Colors.headline,
  },
  linkMedicine:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  linkSectonText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h6,
    color: Colors.primary,
    textDecorationLine: 'underline'
  },

});

export default SummaryScreen;
