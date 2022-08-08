import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import { Colors, Fonts } from '../../styles';

type option = {
  label: string;
  value: string;
};

type Props = {
  options: Array<option>;
  onPress: (option: option) => void;
  selected?: string;
};

const InputToggle: React.FC<Props> = ({ options, selected, onPress }) => {
  const [selectOpt, setSelectOpt] = useState(selected);
  return (
    <View>
      <View style={styles.container}>
        {options.map(({ label, value }, index) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.touchableHighlight,
              value === selectOpt ? styles.touchableHighlightSelected : {},
              index === 0 ? styles.firstTouchable : {},
              index === options.length - 1 ? styles.lastTouchable : {},
            ]}
            onPress={() => {
              setSelectOpt(value);
              onPress({ label, value });
            }}>
            <Text
              style={[
                styles.optionText,
                value === selectOpt ? styles.optionSelectedText : {},
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: Platform.OS === 'ios' ? 30 : 42,
    overflow: 'hidden',
    flex: 1,
  },
  touchableHighlight: {
    alignItems: 'center',
    borderColor: Colors.tertiary,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  touchableHighlightSelected: {
    backgroundColor: Colors.tertiary,
    borderWidth: 0,
  },
  firstTouchable: {
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
  },
  lastTouchable: {
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
  },
  optionText: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Platform.OS === 'ios' ? Fonts.size.h6 : Fonts.size.h5,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: Colors.tertiary,
  },
  optionSelectedText: {
    color: Colors.buttonText,
  },
});

export default InputToggle;
