import React from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import { Colors, Fonts, AppStyles, Images } from '../../styles';

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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  userHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
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
});

export default HomeScreen;
