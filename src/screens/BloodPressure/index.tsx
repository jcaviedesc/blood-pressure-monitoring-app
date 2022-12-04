import React, { useCallback, useEffect, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
// TODO implemented
// import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { useFocusEffect } from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import type { RootStackParamList } from '../../router/types';
import { Colors, Fonts, AppStyles, Metrics } from '../../styles';
import {
  Button,
  HeaderChart,
  BloodPressureResumeCard,
  Text,
} from '../../components';
import { MainContainer, MainScrollView } from '../../components/Layout';
import { BloodPressureCard } from '../../wrappers';
import { BarChart } from '../../components/Charts';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppDispatch } from '../../hooks';
import { createNotifications } from '../../thunks/blood-pressure/blood-pressure-thunk';
import { useBloodPressureDashboard } from '../../hooks/blood-pressure/useBloodPressureDashboard';
import { useTitleScroll } from '../../hooks/useTitleScroll';

type Props = NativeStackScreenProps<RootStackParamList, 'BloodPressure'>;

type actionSheetRef = {
  setModalVisible: () => void;
  hide: () => void;
};

const BloodPressureScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { translate } = useI18nLocate();
  const { setHeaderTitleShow, fadeAnim } = useTitleScroll(
    navigation,
    translate('BloodPressure'),
  );
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
      dispatch(createNotifications());
      /* eslint-disable react-hooks/exhaustive-deps */
    }, [dispatch]),
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: translate('BloodPressure'),
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerRight}
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
  }, [translate, actionSheetRef, isDarkMode]);

  const navigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  const PageView = (
    <MainScrollView
      style={styles.scrollView}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 80 }}>
      {/* <Animated.View
          style={[
            styles.pageTitleContainer,
            { opacity: fadeAnim },
            // { transform: [{ scaleY: fadeAnim }] },
          ]}>
          <Text style={styles.titleScreen}>
            {translate('Home/BloodPressure.title')}
          </Text>
        </Animated.View> */}
      <View style={styles.contenHeder}>
        <Text style={styles.statics}>
          {translate('summary by', {
            time: translate('week'),
          })}
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <BloodPressureCard
          title={translate('systolic')}
          value={avgSYSPerWeek}
          magnitude="mmHg"
          altText="--"
          type="sys"
        />
        <BloodPressureCard
          title={translate('diastolic')}
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
          title={translate("today's measurements")}
          measurements={todayMeasurements}
        />
      </View>
      <ActionSheet ref={actionSheetRef} bounceOnOpen>
        <View style={[styles.actionSheet, isDarkMode && styles.darkBackground]}>
          <TouchableOpacity
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
          </TouchableOpacity>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.actionSheetTouch}
            onPress={() => {
              actionSheetRef.current?.hide();
              navigate('BloodPressure/Reminders');
            }}>
            <View style={styles.actionSheetTouchContent}>
              <IconEntypo
                name="back-in-time"
                size={18}
                color={Colors.tertiary}
              />
              <Text style={styles.actionSheetText}>
                {translate('Home/BloodPressure.action_sheet.reminders')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </MainScrollView>
  );

  return Platform.OS === 'ios' ? (
    PageView
  ) : (
    <MainContainer>
      {PageView}
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
  headerRight: { width: 60, alignItems: 'flex-end' },
});

export default BloodPressureScreen;
