import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../styles';

type props = {
  value: string;
  color?: string;
};

const Tag: React.FC<props> = ({ value, color = Colors.button }) => {
  return (
    <View style={{ ...styles.tagContainer, backgroundColor: color }}>
      <View>
        <Text style={styles.tagText}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    color: Colors.cardTagText,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.paragraph,
  },
});

export default Tag;
