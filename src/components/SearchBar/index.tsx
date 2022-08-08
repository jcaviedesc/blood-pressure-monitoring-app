import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesomIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../styles';
import Input, { InputProps } from '../Input';

type props = InputProps;

export const SearchBar: React.FC<props> = ({ placeholder }) => {
  return (
    <View style={styles.container}>
      <Input
        leftComponent={
          <FontAwesomIcon name="search" size={12} color={Colors.headline} />
        }
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
