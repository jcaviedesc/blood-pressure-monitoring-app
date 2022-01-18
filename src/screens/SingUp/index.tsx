import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight,
} from 'react-native';
import { AppStyles, Colors } from '../../styles';
import { Input } from '../../components';

const SingUpScreen: React.FC = () => {
  const [gender, setGender] = React.useState('M');

  const genderM = {
    ...styles.genderOption,
    backgroundColor: gender === 'M' ? '#1fb3e2' : Colors.transparent,
  };
  const genderF = {
    ...styles.genderOption,
    backgroundColor: gender === 'F' ? '#1fb3e2' : Colors.transparent,
  };
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Crear Cuenta</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionText}>¿Cual es tu nombre completo?</Text>
        <Input />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionText}>¿Cual es tu genero?</Text>
        <View style={styles.genderContainer}>
          <TouchableHighlight
            underlayColor={Colors.transparent}
            style={genderM}
            onPress={() => {
              setGender('M');
            }}>
            <Text>Hombre</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.transparent}
            style={genderF}
            onPress={() => {
              setGender('F');
            }}>
            <Text>Mujer</Text>
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionText}>¿Cual es tu peso en Kg?</Text>
        <Input />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionText}>¿Cual es tu fecha de nacimiento?</Text>
        <Input />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  title: {
    fontSize: 23,
    fontWeight: '900',
    color: Colors.primaryText,
    textAlign: 'center',
  },
  titleContainer: {
    marginBottom: 42,
  },
  sectionText: {
    fontSize: 18,
    lineHeight: 19,
    fontWeight: '900',
    color: Colors.primaryText,
    textAlign: 'center',
  },
  section: {
    marginTop: 21,
    marginHorizontal: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    borderColor: '#A9B7CA',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    overflow: 'hidden',
    marginTop: 9,
  },
  genderOption: {
    flex: 1,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SingUpScreen;
