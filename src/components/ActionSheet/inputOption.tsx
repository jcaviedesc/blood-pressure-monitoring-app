import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from '../Button';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { AppStyles, Colors, Fonts } from '../../styles';

export enum SelectModes {
  UNICA = 1,
  MULTIPLE = 2,
}

export enum OptionMode {
  INDIVIDUAL = 1,
  GROUPED = 2,
}

type ActionSheetInputOptionProps = {
  actionSheetRef: typeof React.useRef;
  options: Array<option>;
  onPress: (option: option) => void;
  selected?: any;
  size?: 'full' | 'small';
  type: 'only'| 'multiple';
  titleAction: string,
  withIcon:boolean
};

type option = {
  label: string;
  value: string;
  icon: string
};

const ActionSheetInputOption: React.FC<ActionSheetInputOptionProps> = ({
  options,
  selected,
  onPress,
  type,
  actionSheetRef,
  titleAction,
  withIcon
}) => {
  const { translate } = useI18nLocate();
  const [selectOpt, setSelectOpt] = useState(selected);
  const [selectOptMultiple] = useState(selected);

  return (
    <ActionSheet
      ref={actionSheetRef}
      bounceOnOpen
      onClose={() => {
        console.log('close');
      }}>
      <View style={styles.actionSheet}>
        <View>
          <Text style={styles.actionSheetTitle}>{translate(titleAction)}</Text>
        </View>
        {options.map(({ label, value, icon })=> {
          let touchStyles = styles.actionSheetTouch;
          let touchTextStyles = styles.actionSheetText;
          if (type === "only" && value === selectOpt) {
            touchStyles = { ...touchStyles, ...styles.actionSheetTouchActive };
            touchTextStyles = {
              ...touchTextStyles,
              ...styles.touchTextStylesActive,
            };
          }
          if (type === "multiple" && selectOptMultiple.includes(value)) {
            touchStyles = { ...touchStyles, ...styles.actionSheetTouchActive };
            touchTextStyles = {
              ...touchTextStyles,
              ...styles.touchTextStylesActive,
            };
          }
          return (
            <TouchableOpacity
              key={value}
              style={touchStyles}
              onPress={() => {
                type === "only" && setSelectOpt(value);
                onPress({ label, value })
              }}>
              <View style={styles.actionSheetTouchContent}>
                <View style={styles.touchLabelStyles}>
                  {withIcon && 
                    <Icon 
                      name={icon}
                      color={Colors.tertiary}
                      size={25} 
                    /> 
                  }
                  <Text style={touchTextStyles}>{label}</Text>
                </View>
                {type === "only" && value === selectOpt && (
                  <View style={styles.touchCheckStyles}>
                    <Icon name="check" color={Colors.tertiary} size={18} />
                  </View>
                )}
                {type === "multiple" && selectOptMultiple.includes(value) && ( 
                <View style={styles.touchCheckStyles}>
                  <Icon name="check" color={Colors.tertiary} size={18} />
                </View> 
                )}
              
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={styles.actionSheetButtons}>
          <View style={styles.actionSheetButton}>
            <Button
              hierarchy="quiet"
              title={translate('button.cancel')}
              onPress={() => {
                actionSheetRef.current.hide();
              }}
            />
          </View>
          <View style={styles.actionSheetButton}>
            <Button
              title={translate('button.confirm')}
              onPress={() => {
                actionSheetRef.current.hide();
              }}
              // customBackground={Colors.tertiary}
            />
          </View>
        </View>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.withActionsheet,
  actionSheetTouchContent: {
    ...AppStyles.withActionsheet.actionSheetTouchContent,
    justifyContent: 'space-between',
    marginRight: 21,
  },
  actionSheetTouch: {
    ...AppStyles.withActionsheet.actionSheetTouch,
    paddingVertical: 12,
  },
  actionSheetText: {
    ...AppStyles.withActionsheet.actionSheetText,
    fontFamily: Fonts.type.bold,
  },
  actionSheetButtons: {
    marginTop: 18,
    flexDirection: 'row',
  },
  actionSheetButton: {
    flex: 2,
    marginHorizontal: 12,
  },
  actionSheetTouchActive: {
    backgroundColor: Colors.tertiaryTranslucent,
  },
  touchLabelStyles: {
    flexDirection:'row'
  },
  touchCheckStyles: {
    justifyContent: 'flex-end'
  },
  touchTextStylesActive: {
    color: Colors.tertiary,
  },
  actionSheetTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h6,
    color: Colors.headline,
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default ActionSheetInputOption;
