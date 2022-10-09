import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
} from 'react-native';
import type { RootStackParamList } from '../../router/types';
import { Colors, Fonts, AppStyles, Metrics } from '../../styles';
import { Box, Button, Text } from '../../components';
import { MainScrollView } from '../../components/Layout';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectUserData } from '../../store/user/userSlice';
import { useForegroundNotification } from '../../hooks/useNotifications';
import { startUserSessionThunk } from '../../thunks/users-thunk';
import { useBackHandlerExitApp } from '../../hooks/back-handler';
import Avatar from '../../components/Avatar';

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
    <MainScrollView>
      {/* TODO implementar alertas */}
      <View style={styles.alertContainer} />
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
          <Avatar avatarUri={avatar} sex={sex} />
        </TouchableHighlight>
      </View>
      <View style={styles.titleSection}>
        <Text style={styles.titleSectionText}>
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
        <TouchableOpacity
          onPress={() => {
            navigate('MedicineList');
          }}>
          <Text style={styles.linkSectionText}>
            {translate('home.show_medicines')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleSection}>
        <Text style={styles.titleSectionText}>
          {translate('home.mystatus')}
        </Text>
      </View>
      <View style={styles.measurementsContainer}>
        {measurements.map(measurement => {
          const [iconName, iconColor] =
            ICONS[measurement.name as keyof typeof ICONS];
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
                // TODO validate screen name
                navigate(measurement.name);
              }}
            />
          );
        })}
        {/* TODO add fallback error component si no se pueden cargar measurements */}
      </View>
    </MainScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  userHeader: {
    marginTop: Platform.OS === 'ios' ? 15 : 33,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 21,
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
  titleSectionText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h4,
    color: Colors.headline,
  },
  linkMedicine: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  linkSectionText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h6,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});

export default SummaryScreen;
