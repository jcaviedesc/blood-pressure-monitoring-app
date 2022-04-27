import React, { useState } from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  ImagePropsBase,
  StyleSheet,
} from 'react-native';
import { Colors } from '../../styles';

type props = {
  maleImage: ImagePropsBase['source'];
  femaleImage: ImagePropsBase['source'];
  onSelect: (gender: 'male' | 'female') => void;
  selected?: 'male' | 'female';
};

const SelectGenderSexToggle: React.FC<props> = ({
  maleImage,
  femaleImage,
  onSelect,
  selected = 'female',
}) => {
  const [select, setSelect] = useState(selected);

  const onPressHandler = (gender: 'male' | 'female') => {
    onSelect(gender);
    setSelect(gender);
  };
  return (
    <View style={styles.container}>
      <View style={styles.selectGenderSex}>
        <TouchableHighlight
          underlayColor={Colors.tertiary}
          onPress={() => {
            onPressHandler('male');
          }}
          style={{
            ...styles.touchableSexContainer,
            backgroundColor:
              select === 'male' ? Colors.tertiary : Colors.transparent,
          }}>
          <Image source={maleImage} style={[styles.imageGenderSex]} />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={Colors.highlight}
          onPress={() => {
            onPressHandler('female');
          }}
          style={{
            ...styles.touchableSexContainer,
            backgroundColor:
              select === 'female' ? Colors.highlight : Colors.transparent,
          }}>
          <Image source={femaleImage} style={styles.imageGenderSex} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  selectGenderSex: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: Colors.stroke,
    borderWidth: 1,
    borderRadius: 6,
    overflow: 'hidden',
  },
  touchableSexContainer: {
    height: '100%',
    width: 64,
  },
  imageGenderSex: {
    resizeMode: 'contain',
    width: 64,
    height: 64,
  },
});

export default SelectGenderSexToggle;
