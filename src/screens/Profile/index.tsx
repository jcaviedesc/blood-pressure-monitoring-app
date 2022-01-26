import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import type { RootStackParamList } from '../../router/types';
import { AppStyles } from '../../styles';
import { Button } from '../../components';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      });
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.content}>
        <Text>ProfileScreen</Text>
        <Button title="Cerrar sessión" type="outline" onPress={logout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
});

export default ProfileScreen;
