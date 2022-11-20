import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectUser, updateUserField } from '../../store/signup/signupSlice';
import { Fonts, Colors, Images, Metrics, AppStyles } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { Card } from '../../components';
import { MainContainer } from '../../components/Layout';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'SignUp/SelectUserType'
>;

const SCALE = 0.6;

const SelectUserTypeScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const { userType } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const onSelectGender = (select: typeof userType) => {
    dispatch(updateUserField({ field: 'userType', value: select }));
    navigation.navigate(
      select === 'health professional'
        ? 'SignUp/ProfilePicture'
        : 'SignUp/HealthQuestions',
    );
  };

  return (
    <MainContainer>
      <Text style={[styles.titleScreen, styles.titleCenter]}>
        {translate('select_user.title')}
      </Text>
      <Text style={styles.textDescription}>
        {translate('select_user.description')}
      </Text>
      <View style={styles.userTypesContainer}>
        <TouchableOpacity
          style={styles.cardTouchable}
          onPress={() => {
            onSelectGender('health professional');
          }}>
          <Card
            style={styles.cardOverride}
            selected={userType === 'health professional'}>
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
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardTouchable}
          onPress={() => {
            onSelectGender('patient');
          }}>
          <Card style={styles.cardOverride} selected={userType === 'patient'}>
            <View style={styles.userTypeContent}>
              <Image source={Images.normalPerson} style={styles.image} />
              <Text style={styles.userTypeText}>
                {translate('user_type.patient')}
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  titleCenter: {
    textAlign: 'center',
  },
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
  cardOverride: {
    flex: 1,
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
  textDescription: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h6,
    textAlign: 'left',
    color: Colors.paragraph,
    marginHorizontal: Metrics.marginHorizontal,
    marginBottom: 12,
  },
});

export default SelectUserTypeScreen;
