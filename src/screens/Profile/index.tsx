import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import type { RootStackParamList } from '../../router/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectProfileUser, signOut } from '../../store/user/userSlice';
import { AppStyles, Images, Colors, Metrics, Fonts } from '../../styles';
import { Button, Text } from '../../components';
import { MainContainer } from '../../components/Layout';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  // TODO change gender por sex
  const { fullName, profileUrl, gender } = useAppSelector(selectProfileUser);
  const logout = () => {
    auth()
      .signOut()
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
              profileUrl
                ? { uri: profileUrl }
                : gender === 'M'
                ? Images.menGenderAvatar
                : Images.womenGenderAvatar
            }
            defaultSource={Images.userPlaceholder}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.fullName}>{fullName}</Text>
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
  fullName: {
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
