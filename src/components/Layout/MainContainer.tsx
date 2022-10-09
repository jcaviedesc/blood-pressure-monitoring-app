import React from 'react';
import {
  View,
  useColorScheme,
  ScrollView,
  ScrollViewProps,
} from 'react-native';
import { AppStyles, Colors } from '../../styles';

type props = {
  children: JSX.Element | JSX.Element[];
  isScrollView?: boolean;
  scrollViewProps?: ScrollViewProps;
};

interface MainScrollViewProps extends ScrollViewProps {
  children?: React.ReactNode;
  // ref?: React.LegacyRef<ScrollView>;
}

export const MainScrollView = React.forwardRef<ScrollView, MainScrollViewProps>(
  (props, ref) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
      <ScrollView
        ref={ref}
        {...props}
        style={{
          ...AppStyles.screen.content,
          ...props.style,
          backgroundColor: isDarkMode
            ? Colors.darkBackground
            : Colors.background,
        }}>
        {props.children}
      </ScrollView>
    );
  },
);

const MainContainer: React.FC<props> = ({
  children,
  isScrollView,
  scrollViewProps,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  if (isScrollView) {
    return (
      <ScrollView
        style={{
          ...AppStyles.screen.mainContainer,
          backgroundColor: isDarkMode
            ? Colors.darkBackground
            : Colors.background,
        }}
        {...scrollViewProps}>
        {children}
      </ScrollView>
    );
  }
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
