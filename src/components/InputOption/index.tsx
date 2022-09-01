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

 {/*  */}
  export enum SelectModes {
    UNICA = 1,
    MULTIPLE = 2,
  }

  export enum OptionMode {
    INDIVIDUAL = 1,
    GROUPED = 2,
  }

type ActionSheetOptionProps = {
  actionSheetRef: typeof React.useRef;
  onPressOption: (componentId: string, option: string[]) => void;
  componentId: string;
  selected: string[]; // TODO buscar como restringir un array con valores especificos y que no se repitan
  selectMode: SelectModes;
  optionMode: OptionMode;
};

type option = {
  label: string;
  value: string;
  icon: string
};

type Props = {
  options: Array<option>;
  onPress: (option: option) => void;
  selected?: string;
  size?: 'full' | 'small';
};

const InputOption: React.FC<Props> = ({
  options,
  selected,
  onPress,
  size = 'full',
}) => {
  const [selectOpt, setSelectOpt] = useState(selected);
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
          styles.touchableHighlight,
          value === selectOpt ? styles.touchableHighlightSelected : {},
          index === 0 ? styles.firstTouchable : {},
          index === options.length - 1 ? styles.lastTouchable : {},
        ]}
        onPress={() => {
          setSelectOpt(value);
          onPress({ label, value });
        }}>
        <View style={styles.labelInput}>
          <View style={styles.box}>
          <FontAwesome5
            name={icon}
            size={25}
            color={value === selectOpt ? "#ffffff" : Colors.tertiary}
          />
          </View>
          <View>
          <Text
            style={[
              styles.optionText,
              value === selectOpt ? styles.optionSelectedText : {},
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
    
  },
  touchableHighlight: {
    //alignItems: 'center',
    borderColor: Colors.tertiary,
    borderWidth: 1,
    //justifyContent: 'center',
    height: 40,
    paddingHorizontal: 2,
  },
  touchableHighlightSelected: {
    backgroundColor: Colors.tertiary,
    borderWidth: 0,
  },
  box: {
    width: 50
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
