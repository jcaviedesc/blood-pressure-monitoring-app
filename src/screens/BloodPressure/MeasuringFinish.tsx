import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import { saveBloodPressureRecord } from '../../thunks/blood-pressure';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Colors, Fonts } from '../../styles';
import { addObservations } from '../../store/blood-pressure';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { Button, TextAreaInput } from '../../components';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/MeasuringFinish'
>;

const BloodPressureMeasuringFinish: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const dispatch = useAppDispatch();

  const onSaveRecord = () => {
    dispatch(saveBloodPressureRecord({ navigation }));
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <TextAreaInput
            title="Observaciones (opcional)"
            onEndEditing={({ nativeEvent: { text } }) => {
              console.log(text);
              dispatch(addObservations(text))
            }} />
        </View>
      </ScrollView>
      <View style={styles.section}>
        <Button
          title={translate('button.finish')}
          onPress={onSaveRecord}
        />
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
});

export default BloodPressureMeasuringFinish;
