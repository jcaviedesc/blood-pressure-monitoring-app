import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Colors, Fonts } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { BloodPressureSlider, Button, Input } from '../../components';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/Meassuring'
>;

const BloodPressureMeassuringScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const [isOpenHeartRateModal, setIsOpenHeartRateModal] = useState(false)

  const onSaveRecord = () => {

    // navigation.navigate('BloodPressure/HeartRate');
  };

  const PulByMinComponent = (
    <View style={styles.rightContainer}>
      <Text style={styles.rigthText}>PUL/min</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpenHeartRateModal}>
        <View style={styles.heartRateModal}>
          <View style={styles.heartRateModalCard}>
            <View style={styles.heartRateModalHeaderClose}>
              <TouchableHighlight
                underlayColor={Colors.background}
                onPress={() => {
                  setIsOpenHeartRateModal(false);
                }}>
                <Icon name="close" size={22} color={Colors.headline} />
              </TouchableHighlight>
            </View>
            <View>
              <Text style={styles.heartRateModalTitle}>
                Ingresa las pulsaciones por minuto registradas en el monitor.
              </Text>
            </View>
            <View style={styles.modalInput}>
              <Input
                keyboardType="numeric"
                value={'50'}
                rigthComponent={PulByMinComponent}
              />
            </View>
            <Button
              title={translate('button.confirm')}
              onPress={() => {
                setIsOpenHeartRateModal(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.content}>
        <BloodPressureSlider />
      </View>
      <View style={styles.section}>
        <Button
          title={translate('button.save')}
          onPress={() => {
            setIsOpenHeartRateModal(true);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  heartRateModal: {
    flex: 1,
    backgroundColor: Colors.loadingBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartRateModalCard: {
    backgroundColor: Colors.background,
    width: '80%',
    padding: 9,
    borderRadius: 5,
  },
  modalButtons: {
    paddingHorizontal: 10,
  },
  heartRateModalTitle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    textAlign: 'center',
  },
  modalInput: {
    height: 70,
    marginTop: 12,
  },
  rightContainer: {
    justifyContent: 'center',
  },
  rigthText: {
    fontFamily: Fonts.type.bold,
    color: Colors.headline,
    fontSize: Fonts.size.h5,
  },
  heartRateModalHeaderClose: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
});

export default BloodPressureMeassuringScreen;
