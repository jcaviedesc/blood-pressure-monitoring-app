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
import { Fonts, Colors, Images, Metrics } from '../../styles';
import { Card } from '../../components';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Singup/SelectUserType'
>;

const SelectUserTypeScreen: React.FC<Props> = ({ navigation }) => {
  const { userType } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const onSelectGender = (select: string) => {
    dispatch(updateUserField({ field: 'userType', value: select }));
    navigation.navigate('Singup/ProfilePicture');
  };

  return (
    <View style={styles.mainContainerOverride}>
      <Text style={styles.title}>¿Eres profesional de la salud?</Text>
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
                Soy profesional de la salud
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
                No soy profesional de la salud
              </Text>
            </View>
          </Card>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainerOverride: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    ...Fonts.style.h3,
    textAlign: 'center',
    color: Colors.headline,
    marginBottom: 31,
    marginHorizontal: Metrics.marginHorizontal,
  },
  userTypesContainer: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  cardTouchable: {
    width: Metrics.screenHeight / 2 - 140,
    height: Metrics.screenHeight / 2 - 140,
    marginBottom: 24,
  },
  userTypeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120,
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
