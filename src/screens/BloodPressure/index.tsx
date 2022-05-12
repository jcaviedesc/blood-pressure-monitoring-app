import React, { useEffect, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import type { RootStackParamList } from '../../router/types';
import { Colors, Fonts, AppStyles } from '../../styles';
import { Button, HeaderChart } from '../../components';
import ActionSheet from 'react-native-actions-sheet';
import { BloodPressureCard } from '../../wrappers';
import { BarChart } from '../../components/Charts';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectRecordPerWeek } from '../../store/blood-pressure/selectors';

type Props = NativeStackScreenProps<RootStackParamList, 'Home/BloodPressure'>;

const bpdata = [
  { x: 'Lun', y: 120, y0: 90 },
  { x: 'Mar', y: 130, y0: 89 },
  { x: 'Mie', y: 108, y0: 92 },
  { x: 'Jue', y: 124, y0: 90 },
  { x: 'Vie', y: 128, y0: 91 },
  { x: 'Sab', y: 138, y0: 97 },
  { x: 'Dom', y: 118, y0: 100 },
];

type actionSheetRef = {
  setModalVisible: () => void;
  hide: () => void;
};

const BloodPressureScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();

  const dispatch = useAppDispatch();
  const {
    records = undefined,
    diaAvg,
    sysAvg,
  } = useAppSelector(selectRecordPerWeek);

  const actionSheetRef = useRef<actionSheetRef>();
  const navigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    navigation.setOptions({
      title: translate('home/BloodPressure.title'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            actionSheetRef.current?.setModalVisible();
          }}>
          <IconEntypo
            name={Platform.OS === 'ios' ? 'dots-three-vertical' : 'menu'}
            size={18}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, translate, actionSheetRef]);

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{ paddingBottom: 22 }}>
      <View style={styles.content}>
        <View style={styles.contenHeder}>
          <Text style={styles.statics}>
            {translate('home/BloodPressure.sub_title', {
              time: translate('week'),
            })}
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <BloodPressureCard
            title={translate('home/BloodPressure.sys')}
            value={sysAvg}
            magnitude="mmHg"
            altText="--"
            type="sys"
          />
          <BloodPressureCard
            title={translate('home/BloodPressure.dia')}
            value={diaAvg}
            magnitude="mmHg"
            altText="--"
            type="dia"
          />
        </View>
        <View>
          <HeaderChart />
          <BarChart data={records} />
        </View>
        {/* TODO add al final de la pantalla y agregar animacion */}
        <View style={styles.footer}>
          <Button
            title="Iniciar Medición"
            onPress={() => {
              navigate('BloodPressure/Preparation');
            }}
          />
        </View>
      </View>
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
                {translate('home/BloodPressure.action_sheet.take_bp')}
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.background}
            style={styles.actionSheetTouch}
            onPress={() => {
              actionSheetRef.current?.hide();
              navigate('development');
            }}>
            <View style={styles.actionSheetTouchContent}>
              <Icon name="search" size={18} color={Colors.darkBackground} />
              <Text style={styles.actionSheetText}>
                {translate('home/BloodPressure.action_sheet.tensiometer')}
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.background}
            style={styles.actionSheetTouch}
            onPress={() => {
              actionSheetRef.current?.hide();
              navigate('development');
            }}>
            <View style={styles.actionSheetTouchContent}>
              <IconEntypo
                name="back-in-time"
                size={18}
                color={Colors.darkBackground}
              />
              <Text style={styles.actionSheetText}>
                {translate('home/BloodPressure.action_sheet.reminders')}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </ActionSheet>
    </ScrollView>
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
    marginTop: 30,
  },
});

export default BloodPressureScreen;
