import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../styles';
import { Text } from '../CustomText';

type props = {
  value: string;
  color?: string;
};

const Tag: React.FC<props> = ({
  value,
  color = Colors.tertiaryTranslucent,
}) => {
  return (
    <View style={{ ...styles.tagContainer, backgroundColor: color }}>
      <Text style={styles.tagText}>{value}</Text>
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
    color: Colors.tertiary,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.hint,
  },
});

export default Tag;
