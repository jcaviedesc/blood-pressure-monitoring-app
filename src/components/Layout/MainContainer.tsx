import React from 'react';
import { View, useColorScheme } from 'react-native';
import { AppStyles, Colors } from '../../styles';

type props = {
  children: JSX.Element | JSX.Element[];
};

const MainContainer: React.FC<props> = ({ children }) => {
  const isDarkMode = useColorScheme() === 'dark';
  console.log("isDarkMode", isDarkMode)
  return (
    <View
      style={{
        ...AppStyles.screen.mainContainer,
        backgroundColor: isDarkMode ? Colors.darkBackground : Colors.background,
      }}>
      {children}
    </View>
  );
};

export default MainContainer;
