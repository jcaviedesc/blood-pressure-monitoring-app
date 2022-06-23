import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { postRequestBloodPressure } from '../../thunks/blood-pressure/blood-pressure-thunk';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectResumeRecords } from '../../store/blood-pressure';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { Button, TextAreaInput } from '../../components';
import { AppStyles, Colors, Fonts } from '../../styles';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/MeasuringFinish'
>;

const BloodPressureMeasuringFinish: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const dispatch = useAppDispatch();
  const records = useAppSelector(selectResumeRecords);

  const onSaveRecord = () => {
    dispatch(postRequestBloodPressure(navigation));
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.titleText}>
            {translate('blood_pressure_finish.title')}
          </Text>
        </View>
        <View style={styles.section}>
          <View>
            {records.map(({ bloodPressure, heartRate }, index) => (
              <View key={`bp${index}`} style={styles.recordContainer}>
                <Text style={styles.recordTitle}>
                  {`${translate('measuring')} ${index + 1}`}
                </Text>
                <View style={styles.recordRow}>
                  <Text style={styles.recordRowTitle}>
                    {translate('blood_pressure')}
                  </Text>
                  <Text style={styles.recordUnit}>{bloodPressure}</Text>
                </View>
                <View style={styles.recordRow}>
                  <Text style={styles.recordRowTitle}>
                    {translate('heart_rate')}
                  </Text>
                  <Text style={styles.recordUnit}>{heartRate}</Text>
                </View>
              </View>
            ))}
          </View>
          <TextAreaInput
            title="Observaciones (opcional)"
            onChangeText={text => {
              // TODO add debounce
              // dispatch(addObservations(text));
            }}
          />
          <View>
            <Text style={styles.titleDescriptivo}>
              {translate('blood_pressure_finish.description')}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.section}>
        <Button title={translate('button.finish')} onPress={onSaveRecord} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  container: {
    flex: 1,
    paddingTop: 21,
  },
  titleDescriptivo: {
    fontFamily: Fonts.type.regular,
    color: Colors.paragraph,
    fontSize: Fonts.size.h6,
  },
  recordContainer: {
    marginBottom: 21,
  },
  recordTitle: {
    fontFamily: Fonts.type.regular,
    color: Colors.headline,
    fontSize: Fonts.size.h6,
    marginBottom: 12,
  },
  recordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recordRowTitle: {
    fontFamily: Fonts.type.regular,
    color: Colors.paragraph,
    fontSize: Fonts.size.h6,
  },
  recordUnit: {
    fontFamily: Fonts.type.bold,
    color: Colors.paragraph,
    fontSize: Fonts.size.h6,
  },
});

export default BloodPressureMeasuringFinish;
