import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../router/types';
import { AppStyles, Images } from '../styles';
import { Button, Text } from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'development'>;

const DevelopmentScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={[styles.mainContainer, styles.content]}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View>
          <Image source={Images.indeveloping} />
        </View>
        <View style={styles.content}>
          <Text style={styles.subTitleScreen}>
            Ups, estamos trabajando para que puedas usar esta funcionalidad en la proxima version .
          </Text>
        </View>
        <Button
          title="Regresar"
          onPress={() => {
            navigation.goBack();
          } } />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
});

export default DevelopmentScreen;
