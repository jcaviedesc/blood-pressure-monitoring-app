import React, { useCallback, useEffect, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  useColorScheme,
} from 'react-native';
// TODO implemented
// import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { useFocusEffect } from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import type { RootStackParamList } from '../../router/types';
import { Colors, Fonts, AppStyles, Metrics } from '../../styles';
import { Button, HeaderChart, BloodPressureResumeCard } from '../../components';
import { MainContainer } from '../../components/Layout';
// import dayjs, { getWeekRange } from '../../services/DatatimeUtil';
import { BloodPressureCard } from '../../wrappers';
import { BarChart } from '../../components/Charts';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppDispatch } from '../../hooks';
import { createNotificaions } from '../../thunks/blood-pressure/blood-pressure-thunk';
import { useBloodPressureDashboard } from '../../hooks/blood-pressure/useBloodPressureDashboard';

type Props = NativeStackScreenProps<RootStackParamList, 'BloodPressure'>;

type actionSheetRef = {
  setModalVisible: () => void;
  hide: () => void;
};

const BloodPressureScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { translate } = useI18nLocate();
  const {
    weekMeasurements,
    todayMeasurements,
    avgDIAPerWeek,
    avgSYSPerWeek,
    getBloodPressureData,
  } = useBloodPressureDashboard();

  const dispatch = useAppDispatch();
  const actionSheetRef = useRef<actionSheetRef>();

  useFocusEffect(
    useCallback(() => {
      getBloodPressureData('', '');
      dispatch(createNotificaions());
      /* eslint-disable react-hooks/exhaustive-deps */
    }, [dispatch]),
  );

  useEffect(() => {
    navigation.setOptions({
      title: translate('Home/BloodPressure.title'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            actionSheetRef.current?.setModalVisible();
          }}>
          <IconEntypo
            name={Platform.OS === 'ios' ? 'dots-three-vertical' : 'menu'}
            size={Platform.OS === 'ios' ? 18 : 28}
            color={isDarkMode ? Colors.background : Colors.stroke}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, translate, actionSheetRef, isDarkMode]);

  const navigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <MainContainer>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.content}>
          <View style={styles.contenHeder}>
            <Text style={styles.statics}>
              {translate('Home/BloodPressure.sub_title', {
                time: translate('week'),
              })}
            </Text>
          </View>
          <View style={styles.cardContainer}>
            <BloodPressureCard
              title={translate('Home/BloodPressure.sys')}
              value={avgSYSPerWeek}
              magnitude="mmHg"
              altText="--"
              type="sys"
            />
            <BloodPressureCard
              title={translate('Home/BloodPressure.dia')}
              value={avgDIAPerWeek}
              magnitude="mmHg"
              altText="--"
              type="dia"
            />
          </View>
          <View>
            <HeaderChart onChangeDate={getBloodPressureData} />
            <BarChart data={weekMeasurements} />
          </View>
          <View style={{ marginTop: 18 }}>
            <BloodPressureResumeCard
              title={translate('Home/BloodPressure.today_records_title')}
              measurements={todayMeasurements}
            />
          </View>
        </View>
      </ScrollView>
      <ActionSheet ref={actionSheetRef} bounceOnOpen>
        <View style={styles.actionSheet}>
          <TouchableHighlight
            underlayColor={Colors.background}
            style={styles.actionSheetTouch}
            onPress={() => {
              actionSheetRef.current?.hide();
              navigate('BloodPressure/Preparation');
            }}>
            <View style={styles.actionSheetTouchContent}>
              <Icon name="plus-circle" size={18} color={Colors.tertiary} />
              <Text style={styles.actionSheetText}>
                {translate('Home/BloodPressure.action_sheet.take_bp')}
              </Text>
            </View>
          </TouchableHighlight>
          {/* <TouchableHighlight
            underlayColor={Colors.background}
            style={styles.actionSheetTouch}
            onPress={() => {
              actionSheetRef.current?.hide();
              navigate('BloodPressure/ValidateMonitor');
            }}>
            <View style={styles.actionSheetTouchContent}>
              <Icon name="search" size={18} color={Colors.darkBackground} />
              <Text style={styles.actionSheetText}>
                {translate('Home/BloodPressure.action_sheet.tensiometer')}
              </Text>
            </View>
          </TouchableHighlight> */}
          <TouchableHighlight
            underlayColor={Colors.background}
            style={styles.actionSheetTouch}
            onPress={() => {
              actionSheetRef.current?.hide();
              navigate('BloodPressure/Reminders');
            }}>
            <View style={styles.actionSheetTouchContent}>
              <IconEntypo
                name="back-in-time"
                size={18}
                color={Colors.darkBackground}
              />
              <Text style={styles.actionSheetText}>
                {translate('Home/BloodPressure.action_sheet.reminders')}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </ActionSheet>
      {/* TODO add al final de la pantalla y agregar animacion */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: isDarkMode
              ? Colors.darkBackground
              : Colors.background,
          },
        ]}>
        <Button
          title="Iniciar Medición"
          onPress={() => {
            navigate('BloodPressure/Preparation');
          }}
        />
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  ...AppStyles.withActionsheet,
  contenHeder: {
    marginBottom: 10,
  },
  statics: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.paragraph,
    color: Colors.paragraph,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h3,
    color: Colors.headline,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: Metrics.screenWidth,
    paddingTop: 12,
    paddingBottom: 18,
    paddingHorizontal: 20,
  },
  scrollView: {
    paddingBottom: 36,
  },
});

export default BloodPressureScreen;
