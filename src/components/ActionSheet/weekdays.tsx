import React, { useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../Button';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { AppStyles, Colors, Fonts } from '../../styles';
import { Text } from '../CustomText';

export enum SelectModes {
  UNICA = 1,
  MULTIPLE = 2,
}

export enum OptionMode {
  INDIVIDUAL = 1,
  GROUPED = 2,
}

type ActionSheetWeekDaysProps = {
  actionSheetRef: typeof React.useRef;
  onPressOption: (componentId: string, option: string[]) => void;
  componentId: string;
  selected: string[]; // TODO buscar como restringir un array con valores especificos y que no se repitan
  selectMode: SelectModes;
  optionMode: OptionMode;
};

const sorter = {
  // "sunday": 0, // << if sunday is first day of week
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};

const ActionSheetWeekDays: React.FC<ActionSheetWeekDaysProps> = ({
  actionSheetRef,
  onPressOption,
  componentId,
  selected,
  selectMode = SelectModes.UNICA,
  optionMode = OptionMode.INDIVIDUAL,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { translate } = useI18nLocate();
  const weekdays = useMemo(() => translate('days'), [translate]);

  const onSelect = key => {
    if (selectMode === SelectModes.MULTIPLE) {
      let newSelection = selected.concat([key]);
      if (selected.includes(key)) {
        newSelection = selected.filter(seledted => seledted !== key);
      }
      newSelection.sort(function sortByDay(a, b) {
        return sorter[a] - sorter[b];
      });
      onPressOption(componentId, newSelection);
    } else {
      onPressOption(componentId, [key]);
    }
  };

  const getWeekdayOptions = () => {
    let options = Object.entries(weekdays);
    if (optionMode === OptionMode.GROUPED) {
      const [
        [lun, lunV],
        [mar, marV],
        [mie, mieV],
        [jue, jueV],
        [vie, vieV],
        [sab, sabV],
        [dom, domV],
      ] = options;
      return [
        [`${lun},${mie},${vie}`, `${lunV}, ${mieV}, ${vieV}`],
        [`${mar},${jue},${sab}`, `${marV}, ${jueV}, ${sabV}`],
        [`${mie},${vie},${dom}`, `${mieV}, ${vieV}, ${domV}`],
      ];
    }
    return options;
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      bounceOnOpen
      onClose={() => {
        console.log('close');
      }}>
      <View style={[styles.actionSheet, isDarkMode && styles.darkBackground]}>
        <View>
          <Text style={styles.actionSheetTitle}>{translate('repeat')}</Text>
        </View>
        {getWeekdayOptions().map(([weekdayKey, weekdayValue]) => {
          const isSelected = selected.includes(weekdayKey);
          let touchStyles = styles.actionSheetTouch;
          let touchTextStyles = styles.actionSheetText;
          if (isSelected) {
            touchStyles = { ...touchStyles, ...styles.actionSheetTouchActive };
            touchTextStyles = {
              ...touchTextStyles,
              ...styles.touchTextStylesActive,
            };
          }
          return (
            <TouchableOpacity
              key={weekdayKey}
              style={touchStyles}
              onPress={() => {
                onSelect(weekdayKey);
              }}>
              <View style={styles.actionSheetTouchContent}>
                <Text style={touchTextStyles}>{weekdayValue}</Text>
                {isSelected && (
                  <View>
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
  darkBackground: {
    backgroundColor: Colors.darkBackground,
  },
});

export default ActionSheetWeekDays;
