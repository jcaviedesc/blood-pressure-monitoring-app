import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import type { RootStackParamList } from '../../router/types';
import { useAppDispatch } from '../../hooks';
import { signOut } from '../../store/user/userSlice';
import { AppStyles } from '../../styles';
import { Button } from '../../components';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(signOut());
      })
      .catch(err => {
        crashlytics().recordError(err);
        //TODO handle clear data and go to login or signup
        console.log(err);
      });
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.content}>
        <Text>ProfileScreen</Text>
        <Button title="Cerrar sessión" hierarchy="quiet" onPress={logout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
});

export default ProfileScreen;
