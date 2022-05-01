import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../router/types';
import { AppStyles } from '../styles';
import { Button } from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'development'>;

const DevelopmentScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={[styles.mainContainer, styles.content]}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button
          title="Regresar"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
});

export default DevelopmentScreen;
