import React from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import { Colors, Fonts, AppStyles, Images } from '../../styles';
import { Box } from '../../components';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.content}>
        <View style={styles.userHeader}>
          <Text style={styles.userTitle}>Hola, Juan</Text>
          <Image
            source={{
              uri: 'https://palmbayprep.org/wp-content/uploads/2015/09/user-icon-placeholder.png',
            }}
            defaultSource={Images.userPlaceholder}
            style={styles.avatar}
          />
        </View>
        <View style={styles.boxContainer}>
          <Box
            title={['Presiónl', 'Arteria']}
            status="Normal"
            value="140/90 mmHg"
            colors={['#fe5b5b', '#ef6463']}
          />
          <Box
            title={['Peso', 'Corporal']}
            status="Estable"
            value="82 Kg"
            colors={['#1273a6', '#71c4d2']}
          />
          <Box
            title={['Ritmo', 'Cardiaco']}
            status="Estable"
            value="78 bpm"
            colors={['#10acd4', '#81eb91']}
          />
          <Box
            title={['Glucosa', 'En sangre']}
            status="Estable"
            value="140 mg / dl"
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
