import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../styles';

type InputProps = {
  title?: string;
  onFocus?: Function;
  editable?: boolean;
  value?: string;
  showSoftInputOnFocus?: boolean;
};

const Input: React.FC<InputProps> = ({
  title,
  onFocus,
  editable,
  value,
  showSoftInputOnFocus,
}) => {
  const onFocuesHandler = () => {
    onFocus && onFocus();
  };
  return (
    <View style={styles.container}>
      {title && <Text style={styles.inputTitle}>{title}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onFocus={onFocuesHandler}
          editable={editable}
          showSoftInputOnFocus={showSoftInputOnFocus}
          value={value}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputTitle: {
    marginLeft: 3,
    color: Colors.secondaryText,
    fontWeight: 'bold',
    fontSize: 19,
  },
  inputContainer: {
    borderColor: '#A9B7CA',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 9,
  },
  input: {
    height: 42,
    paddingTop: 10,
    color: Colors.primaryText,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Input;
