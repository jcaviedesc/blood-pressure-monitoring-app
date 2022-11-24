import React, { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, View, Platform } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MonitoringStack } from '../../router/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { AppStyles, Colors, Fonts, Metrics } from '../../styles';
import { MainScrollView } from '../../components/Layout';
import { Avatar, Button, Card, Input, Text } from '../../components';
import {
  getClinicalMonitoringPatients,
  requestAccessToClinicalMonitoringPatient,
} from '../../thunks/clinical-monitoring';
import { selectPatientsForMonitoring } from '../../store/clinical-monitoring';
import { Patient } from '../../store/types';
import dayjs from '../../services/DatetimeUtil';
import { useHeaderSearchBar } from '../../hooks/header';
import { selectUserData } from '../../store/user/userSlice';

type Props = NativeStackScreenProps<MonitoringStack, 'Patients'>;

const MonitoringScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const patients = useAppSelector(selectPatientsForMonitoring);
  const user = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const [addPatientModal, setAddPatientModal] = useState(false);
  const [document, setDocument] = useState('');

  useHeaderSearchBar({
    showRightButton: user.isProfessional && Platform.OS === 'ios',
    headerTitle: translate('monitoring'),
    onSearch: text => {
      console.log(text);
    },
    navigation,
    placeholder: translate('search by cedula'),
    rightAction: {
      onPress: () => {
        setAddPatientModal(true);
      },
    },
  });

  useEffect(() => {
    dispatch(getClinicalMonitoringPatients({ page: 1 }));
  }, [dispatch]);

  const sendRequestToAddPatient = () => {
    setAddPatientModal(false);
    dispatch(requestAccessToClinicalMonitoringPatient(Number(document)))
      .unwrap()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: translate('success request'),
          position: 'bottom',
        });
      })
      .catch((error: string) => {
        Toast.show({
          type: 'error',
          text1: error, // TODO traducir
          position: 'bottom',
        });
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getClinicalMonitoringPatients({ page: 1 }))
      .unwrap()
      .then(() => {
        setRefreshing(false);
      });
  }, [dispatch]);

  const renderPatientCard = (item: Patient) => (
    <View key={item.id}>
      <Card>
        <View>
          <View style={styles.patientCardHeader}>
            <View style={styles.patientCardHeaderAvatar}>
              <Avatar
                avatarUri={item.avatar}
                size={Metrics.screenWidth * 0.1}
              />
            </View>
            <View style={styles.patientCardHeaderInfo}>
              <Text style={styles.patientCardHeaderName}>
                {`${item.name} ${item.lastName}`}
              </Text>
              <Text>{dayjs().from(dayjs(item.birthdate), true)}</Text>
              <View style={styles.patientCardRow}>
                <Text style={[styles.patientCardHeaderTextTitle, { flex: 20 }]}>
                  {`${translate('document')}:`}
                </Text>
                <Text style={styles.patientCardHeaderTextValue}>
                  {item.docId}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.patientCardBody}>
            <View style={styles.patientCardRow}>
              <Text style={styles.patientCardHeaderTextTitle}>
                {translate(item.measurements[0].name)}:
              </Text>
              {item.measurements[0].value !== 0 ? (
                <View
                  style={[
                    styles.patientCardBodyMeasurementContainer,
                    styles.patientCardHeaderTextValue,
                  ]}>
                  <View style={styles.patientCardBodyMeasurementValue}>
                    <Text style={styles.patientCardBodyMeasurementValueText}>
                      {item.measurements[0].value}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.patientCardBodyMeasurementUnit}>
                      {item.measurements[0].unit}
                    </Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.patientCardHeaderTextValue}>
                  {item.measurements[0].status}
                </Text>
              )}
            </View>
            <View style={styles.patientCardRow}>
              <Text style={styles.patientCardHeaderTextTitle}>
                {`${translate('last measurement')}: `}
              </Text>
              <Text style={styles.patientCardHeaderTextValue}>
                {item.measurements[0].lastMeasurement !== ''
                  ? dayjs().to(dayjs(item.measurements[0].lastMeasurement))
                  : 'no data'}
              </Text>
            </View>
          </View>
        </View>
      </Card>
      <View style={styles.patientCardSeparator} />
    </View>
  );

  return (
    <MainScrollView
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{translate('patients')}</Text>
      </View>
      {patients.data.map(renderPatientCard)}
      {/* <FlatList
          contentInsetAdjustmentBehavior="automatic"
          ListHeaderComponent={<View style={styles.patientListHeader} />}
          renderItem={renderPatientCard}
          data={patients.data}
          ItemSeparatorComponent={() => (
            <View style={styles.patientCardSeparator} />
          )}
        /> */}
      <Modal
        isVisible={addPatientModal}
        onBackButtonPress={() => {
          setAddPatientModal(false);
        }}
        onBackdropPress={() => {
          setAddPatientModal(false);
        }}
        style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.addPatientModal}>
          <Input
            title="Ingresa el numero de cedula"
            keyboardType="numeric"
            onChangeText={text => {
              setDocument(text);
            }}
          />
          <Button
            title="Confirmar"
            onPress={sendRequestToAddPatient}
            disabled={document === ''}
          />
        </View>
      </Modal>
    </MainScrollView >
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  header: {
    marginBottom: 12,
  },
  headerTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h5,
  },
  addPatientModal: {
    width: '90%',
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 9,
  },
  patientCardHeader: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  patientCardHeaderAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  patientCardHeaderName: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.paragraph,
  },
  patientCardHeaderInfo: {
    width: '100%',
  },
  patientCardSeparator: {
    height: 15,
  },
  patientCardBody: {
    marginTop: 3,
    marginLeft: 12,
  },
  patientCardRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 6,
    width: '100%',
  },
  patientCardBodyMeasurementValue: {
    marginRight: 3,
  },
  patientCardBodyMeasurementValueText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h5,
    transform: [{ translateY: 5 }],
  },
  patientCardBodyMeasurementUnit: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.hint,
    transform: [{ translateY: 2 }],
  },
  patientCardBodyMeasurementContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  patientCardHeaderTextTitle: {
    color: Colors.paragraph,
    marginRight: 3,
    flex: 30,
  },
  patientCardHeaderTextValue: {
    color: Colors.headline,
    flex: 60,
  },
  patientListHeader: {
    height: 60,
  },
});

export default MonitoringScreen;
