import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Fonts } from '../../styles';

type props = {};

const HeaderChart: React.FC<props> = () => {
  return (
    <View style={styles.container}>
      <TouchableHighlight>
        <Icon name="arrow-left" size={22} color={Colors.headline} />
      </TouchableHighlight>
      <View>
        <Text style={styles.text}>7 - 12 febrero 2022</Text>
      </View>
      <TouchableHighlight>
        <Icon name="arrow-right" size={22} color={Colors.headline} />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 31,
    marginBottom: 11,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.paragraph,
    color: Colors.paragraph,
  },
});

export default HeaderChart;
