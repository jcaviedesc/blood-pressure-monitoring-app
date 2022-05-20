import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import type { RootStackParamList } from '../../router/types';
import { AppStyles } from '../../styles';
import { Button } from '../../components';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = () => {
  const logout = () => {
    auth()
      .signOut()
      .catch(err => {
        //TODO add sentry
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
