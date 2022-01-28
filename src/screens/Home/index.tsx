import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  BackHandler,
  Alert,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import { Colors, Fonts, AppStyles, Images } from '../../styles';
import { Box } from '../../components';
import { useI18nLocate } from '../../providers/LocalizationProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const user = auth().currentUser;
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        // Espera! 'Hold on!
        // Seguro quieres salir de la applicación? 'Are you sure you want to go back?
        Alert.alert('¡Espera!', '¿Seguro quieres salir de la applicación?', [
          {
            text: 'Cancelar',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'SI', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []),
  );

  const navigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };
  return (
    <ScrollView style={styles.mainContainer}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.background}
        showHideTransition="fade"
        hidden={false}
        barStyle="dark-content"
      />
      <View style={styles.content}>
        <View style={styles.userHeader}>
          <Text style={styles.userTitle}>Hola, {user?.displayName}</Text>
          <TouchableHighlight
            underlayColor={Colors.background}
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <Image
              source={{
                uri:
                  user?.photoURL ||
                  'https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png',
              }}
              defaultSource={Images.userPlaceholder}
              style={styles.avatar}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.boxContainer}>
          <Box
            title={translate('bloodPressure')}
            status="Normal"
            value="140/90 mmHg"
            colors={['#fe5b5b', '#ef6463']}
            iconName="tint"
            onPress={() => {
              navigate(RouteName.BLOOD_PRESSURE);
            }}
          />
          <Box
            title="Peso Corporal"
            status="Estable"
            value="82 Kg"
            iconName="balance-scale"
            colors={['#1273a6', '#71c4d2']}
          />
          <Box
            title="Ritmo Cardiaco"
            status="Estable"
            value="78 bpm"
            iconName="heartbeat"
            colors={['#10acd4', '#81eb91']}
          />
          <Box
            title="Glucosa en sangre"
            status="Estable"
            value="140 mg / dl"
            iconName="eyedropper"
            colors={['#564ef7', '#9994ec']}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  userHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
    backgroundColor: Colors.white,
  },
  userTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: 38,
    color: Colors.primary,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default HomeScreen;
