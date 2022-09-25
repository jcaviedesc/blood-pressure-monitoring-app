import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import { Colors, Fonts } from '../../styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


type option = {
  label: string;
  value: string;
  icon: string
};

type Props = {
  options: Array<option>;
  onPress: (option: option) => void;
  selected?: any;
  size?: 'full' | 'small';
  type: 'only'| 'multiple';
  withIcon: boolean
};

const InputOption: React.FC<Props> = ({
  options,
  selected,
  onPress,
  type,
  size = 'full',
  withIcon
}) => {
  const [selectOpt, setSelectOpt] = useState(selected);
  const [selectOptMultiple] = useState(selected);
  let touchableInput = {};
  if (size === 'full') {
    touchableInput = { flex: 1 };
  }
  // TODO add dark modo
  return (
    <View style={styles.container}>
    {options.map(({ label, value, icon }, index) => (
      <TouchableOpacity
        key={value}
        style={[
          type === "only" ? styles.touchableHighlight : styles.touchableHighlightMultiple,
          type === "only"
          && value === selectOpt ? styles.touchableHighlightSelected : {},
          index === 0 ? styles.firstTouchable : {},
          index === options.length - 1 ? styles.lastTouchable : {},
          type === "multiple"
          && selectOptMultiple.includes(value) ? styles.touchableHighlightSelectedMultiple : {},
          index === 0 ? styles.firstTouchable : {},
          index === options.length - 1 ? styles.lastTouchable : {},
        ]}
        onPress={() => {
          type === "only" && setSelectOpt(value);
          onPress({ label, value })
        }}>
        <View style={styles.labelInput}>
          <View style={styles.box}>
          <FontAwesome5
            name={icon}
            size={25}
            color={type === "only" ? value === selectOpt ? "#ffffff" : Colors.tertiary: Colors.tertiary}
          />
          </View>
          <View>
          <Text
            style={[
              styles.optionText,
              type === "only" && value === selectOpt ? styles.optionSelectedText : {},
              type === "multiple" && value === selectOptMultiple.includes(value) ? styles.optionSelectedText : {},
            ]}>
            {label}
          </Text>
          </View>
        </View>
      </TouchableOpacity>
    ))}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    //flexDirection: 'column',
    justifyContent: 'flex-start',
    height: Platform.OS === 'ios' ? 200 : 212,
    overflow: 'hidden',
    padding: 8
    
  },
  touchableHighlight: {
    //alignItems: 'center',
    borderColor: Colors.tertiary,
    borderWidth: 1,
    justifyContent: 'space-between',
    height: 30,
    paddingHorizontal: 2,
  },
  touchableHighlightMultiple: {
    //alignItems: 'center',
    borderColor: Colors.primary,
    borderWidth: 1,
    justifyContent: 'space-between',
    height: 30,
    paddingHorizontal: 2,
  },
  touchableHighlightSelected: {
    backgroundColor: Colors.tertiary,
    borderWidth: 0,
  },
  touchableHighlightSelectedMultiple: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
  box: {
    width: '40%',
    alignItems:'flex-end',
    paddingHorizontal:8
  },
  labelInput:{
    flex: 2,
    flexDirection: "row",
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
    flex:1,
    textTransform: 'capitalize',
  },
  optionSelectedText: {
    color: Colors.buttonText,
  },
});

export default InputOption;
