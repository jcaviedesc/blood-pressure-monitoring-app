import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Colors, Fonts } from '../../styles';
import { Input, Card } from '../../components';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import Dayjs from '../../services/DatatimeUtil';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/Meassuring'
>;

const BloodPressureMeassuring: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const dateTime = Dayjs();
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.content}>
        <Card>
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.inputTitle}>
                {translate('BloodPressure/Meassuring.date')}
              </Text>
            </View>
            <View style={styles.containerInput}>
              <Input
                editable={false}
                hierarchy="transparent"
                textAlign="right"
                value={dateTime.format('DD MMMM YYYY')}
              />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.inputTitle}>
                {translate('BloodPressure/Meassuring.time')}
              </Text>
            </View>
            <View style={styles.containerInput}>
              <Input
                editable={false}
                hierarchy="transparent"
                textAlign="right"
                value={dateTime.format('HH:MM A')}
              />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.inputTitle}>
                {translate('BloodPressure/Meassuring.dia')}
              </Text>
            </View>
            <View style={styles.containerInput}>
              <Input
                hierarchy="transparent"
                keyboardType="numeric"
                textAlign="right"
                autoFocus
                rigthComponent={
                  <Text style={[styles.inputTitle, styles.rightInput]}>mmHg</Text>
                }
              />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.inputTitle}>
                {translate('BloodPressure/Meassuring.sys')}
              </Text>
            </View>
            <View style={styles.containerInput}>
              <Input
                hierarchy="transparent"
                keyboardType="numeric"
                textAlign="right"
                rigthComponent={
                  <Text style={[styles.inputTitle, styles.rightInput]}>mmHg</Text>
                }
              />
            </View>
          </View>
          <View style={[styles.rowContainer, styles.lastRowContainer]}>
            <View>
              <Text style={styles.inputTitle}>
                {translate('BloodPressure/Meassuring.heart_rate')}
              </Text>
            </View>
            <View style={styles.containerInput}>
              <Input
                hierarchy="transparent"
                keyboardType="numeric"
                textAlign="right"
                rigthComponent={
                  <Text style={[styles.inputTitle, styles.rightInput]}>bpm</Text>
                }
              />
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.secondaryTranslucent,
    borderBottomWidth: 1,
  },
  inputTitle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h6,
    color: Colors.paragraph,
  },
  containerInput: {
    width: '45%',
  },
  rightInput: {
    fontSize: Fonts.size.hint,
    textAlignVertical: 'bottom',
    marginBottom: 6,
  },
  value: {
    color: Colors.headline,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h6,
    textAlign: 'right',
  },
  lastRowContainer: {
    borderBottomWidth: 0,
  },
});

export default BloodPressureMeassuring;
