import React from 'react';
import { View, useColorScheme } from 'react-native';
import { RichEditor } from 'react-native-pell-rich-editor';
import { Text } from '../CustomText';
import { Colors } from '../../styles';

type Props = {
  title: string;
};

const SelfcareCardList = ({ title, editor }: Props): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View>
      <Text>{title}</Text>
      <View>
        <RichEditor
          initialContentHTML={editor.patient}
          disabled
          // eslint-disable-next-line react-native/no-inline-styles
          initialHeight={240}
          editorStyle={{
            backgroundColor: isDarkMode
              ? Colors.darkGrayMode
              : Colors.lightGray,
            color: isDarkMode ? Colors.textNormal : Colors.headline,
          }}
        />
      </View>
    </View>
  );
};

export default SelfcareCardList;
