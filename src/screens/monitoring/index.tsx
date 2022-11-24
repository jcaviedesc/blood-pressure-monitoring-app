import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MonitoringStack } from '../../router/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { AppStyles, Colors, Fonts, Metrics, Images } from '../../styles';
import { MainContainer, MainScrollView } from '../../components/Layout';
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
import { userRole } from '../../store/user/types';

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
                <Text style={styles.patientCardHeaderTextTitle}>
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

  const renderView = (
    <MainScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ paddingHorizontal: 0 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {patients.loading === 'pending' ? (
        <View style={styles.loadingContent}>
          <Image
            source={Images.juicyWomanIsLooking}
            style={styles.loadingImage}
          />
          <View style={styles.loadingPatientsContainer}>
            <Text style={styles.loadingText}>
              {translate('loading patient')}...
            </Text>
          </View>
        </View>
      ) : patients.data.length > 0 ? (
        <View style={{ paddingHorizontal: Metrics.marginHorizontal }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{translate('patients')}</Text>
          </View>
          {patients.data.map(renderPatientCard)}
        </View>
      ) : (
        <View style={styles.noResultContainer}>
          <View style={styles.noResultContainerText}>
            <Text style={[styles.loadingText, styles.noPatientsText]}>
              {translate('No patients for clinical monitoring')}
            </Text>
          </View>
          <Image source={Images.businessMen} style={styles.businessMenImage} />
        </View>
      )}
      <Modal
        isVisible={addPatientModal}
        onBackButtonPress={() => {
          setAddPatientModal(false);
        }}
        onBackdropPress={() => {
          setAddPatientModal(false);
        }}
        style={styles.modalContent}>
        <Card>
          <Input
            title="Ingresa el numero de cedula"
            keyboardType="numeric"
            onChangeText={text => {
              setDocument(text);
            }}
          />
          <Button
            title={translate('button.confirm')}
            onPress={sendRequestToAddPatient}
            disabled={document === ''}
          />
        </Card>
      </Modal>
    </MainScrollView>
  );

  return Platform.OS === 'ios' ? (
    renderView
  ) : (
    <MainContainer style={styles.viewAndroid}>
      {renderView}
      {/* TODO add animation */}
      <View>
        {user.role === userRole.HEALTH_PROFESSIONAL && (
          <TouchableOpacity
            style={styles.floatButton}
            onPress={() => {
              setAddPatientModal(true);
            }}>
            <IconEntypo name="plus" size={28} color={Colors.white} />
          </TouchableOpacity>
        )}
      </View>
    </MainContainer>
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
    // flex: 30,
  },
  patientCardHeaderTextValue: {
    color: Colors.headline,
  },
  patientListHeader: {
    height: 60,
  },
  floatButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: Colors.tertiary,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  viewAndroid: {
    paddingTop: 90,
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessMenImage: {
    resizeMode: 'contain',
    height: Metrics.screenHeight * 0.5,
  },
  loadingImage: {
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.8,
  },
  noResultContainer: {
    flex: 1,
    height: Metrics.screenHeight * 0.7,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  loadingPatientsContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  loadingContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.h6,
    color: Colors.paragraph,
    textAlign: 'center',
  },
  noResultContainerText: {
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  noPatientsText: {
    color: Colors.headline,
    fontSize: Fonts.size.h5,
  },
});

export default MonitoringScreen;
