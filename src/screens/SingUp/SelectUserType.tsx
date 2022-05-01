import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectUser, updateUserField } from '../../store/singup/singupSlice';
import { Fonts, Colors, Images, Metrics, AppStyles } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { Card } from '../../components';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Singup/SelectUserType'
>;

const SCALE = 0.6;

const SelectUserTypeScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const { userType } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const onSelectGender = (select: string) => {
    dispatch(updateUserField({ field: 'userType', value: select }));
    navigation.navigate(
      select === 'healthUser' ? 'Singup/ProfilePicture' : 'Singup/HealthInfo',
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleScreen}>{translate('select_user.title')}</Text>
      </View>
      <View style={styles.userTypesContainer}>
        <TouchableHighlight
          underlayColor={Colors.transparent}
          style={styles.cardTouchable}
          onPress={() => {
            onSelectGender('healthUser');
          }}>
          <Card selected={userType === 'healthUser'}>
            <View style={styles.userTypeContent}>
              <Image
                source={Images.healtcareProfessionals}
                style={styles.image}
              />
              <Text style={styles.userTypeText}>
                {translate('user_type.health')}
              </Text>
            </View>
          </Card>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={Colors.transparent}
          style={styles.cardTouchable}
          onPress={() => {
            onSelectGender('normalUser');
          }}>
          <Card selected={userType === 'normalUser'}>
            <View style={styles.userTypeContent}>
              <Image source={Images.normalPerson} style={styles.image} />
              <Text style={styles.userTypeText}>
                {translate('user_type.patient')}
              </Text>
            </View>
          </Card>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  mainContainerOverride: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  userTypesContainer: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  cardTouchable: {
    width: Metrics.screenWidth * SCALE,
    height: Metrics.screenWidth * SCALE,
    marginBottom: 24,
  },
  userTypeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 21,
  },
  userTypeText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    textAlign: 'center',
    color: Colors.headline,
  },
  descriptionContainer: {
    marginTop: 30,
    marginHorizontal: Metrics.marginHorizontal,
  },
  textDescription: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.h6,
    textAlign: 'center',
    color: Colors.paragraph,
  },
});

export default SelectUserTypeScreen;
