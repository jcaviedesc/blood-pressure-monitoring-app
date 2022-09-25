import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import type { RootStackParamList } from '../../router/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectUserData, signOut } from '../../store/user/userSlice';
import { AppStyles, Colors, Metrics, Fonts } from '../../styles';
import { Button, Card, Text } from '../../components';
import { MainContainer } from '../../components/Layout';
import { useRealmAuth } from '../../providers/RealmProvider';
import Avatar from '../../components/Avatar';
import metrics from '../../styles/Metrics';
import { useI18nLocate } from '../../providers/LocalizationProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const SCREEN_WIDTH_30 = metrics.screenWidth * 0.3;

const ProfileScreen: React.FC<Props> = () => {
  const { translate } = useI18nLocate();
  const dispatch = useAppDispatch();
  const { signOutRealm } = useRealmAuth();
  const { name, lastName, avatar, sex, birthdate } = useAppSelector(selectUserData);
  const logout = () => {
    signOutRealm();
    auth()
      .signOut()
      .then(() => {
        signOutRealm();
      })
      .catch(err => {
        crashlytics().recordError(err);
        //TODO handle clear data and go to login or signup
        console.log(err);
      })
      .finally(() => {
        dispatch(signOut());
      });
  };

  return (
    <MainContainer>
      <View style={styles.content}>
        <View style={styles.head}>
          <Avatar avatarUri={avatar} sex={sex} size={SCREEN_WIDTH_30} />
        </View>
        <View style={styles.body}>
          <Card>
            <View style={styles.nameContainer}>
              <Text style={styles.nameKey}>{translate('profile.name')}</Text>
              <Text style={styles.names}>{name}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameKey}>
                {translate('profile.lastname')}
              </Text>
              <Text style={styles.names}>{lastName}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameKey}>{translate('profile.sex')}</Text>
              <Text style={styles.names}>{translate(`profile.${sex}`)}</Text>
            </View>
            <View style={[styles.nameContainer, styles.noborder]}>
              <Text style={styles.nameKey}>
                {translate('profile.date of birth')}
              </Text>
              <Text style={styles.names}>{birthdate}</Text>
            </View>
          </Card>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={logout} style={styles.option}>
            <EntypoIcon name="log-out" size={22} color={Colors.tertiary} />
            <Text style={{ ...styles.optionText, ...styles.closeOption }}>
              {translate('profile.logout')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  head: {
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 30 : 40,
  },
  nameContainer: {
    marginTop: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.lightGray,
    paddingBottom: 9,
    borderBottomWidth: 1,
  },
  body: {
    flex: 1,
    marginTop: 21,
  },
  nameKey: {
    fontSize: Fonts.size.h5,
  },
  names: {
    fontSize: Fonts.size.h5,
    color: Colors.headline,
  },
  avatar: {
    width: Metrics.screenWidth / 2,
    height: Metrics.screenWidth / 2,
    borderRadius: Metrics.screenWidth / 4,
    resizeMode: 'cover',
    backgroundColor: Colors.white,
  },
  optionText: {
    marginLeft: 12,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeOption: {
    color: Colors.tertiary,
  },
  noborder: {
    borderBottomWidth: 0,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
});

export default ProfileScreen;
