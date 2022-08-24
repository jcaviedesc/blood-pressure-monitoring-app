import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import type { RootStackParamList } from '../../router/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectUserData, signOut } from '../../store/user/userSlice';
import { AppStyles, Images, Colors, Metrics, Fonts } from '../../styles';
import { Button, Text } from '../../components';
import { MainContainer } from '../../components/Layout';
import { useRealmAuth } from '../../providers/RealmProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { signOutRealm } = useRealmAuth();
  const { name, lastName, avatar, sex } = useAppSelector(selectUserData);
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
    <MainContainer isScrollView>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              avatar
                ? { uri: avatar }
                : sex === 'M'
                  ? Images.menGenderAvatar
                  : Images.womenGenderAvatar
            }
            defaultSource={Images.userPlaceholder}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.names}>{name}</Text>
        <Text style={styles.names}>{lastName}</Text>
        <Button
          title="Cerrar sessión"
          size="small"
          hierarchy="transparent"
          onPress={logout}
        />
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  names: {
    fontSize: Fonts.size.h3,
    textAlign: 'center',
    marginVertical: 18,
  },
  avatar: {
    width: Metrics.screenWidth / 2,
    height: Metrics.screenWidth / 2,
    borderRadius: Metrics.screenWidth / 4,
    resizeMode: 'cover',
    backgroundColor: Colors.white,
  },
});

export default ProfileScreen;
