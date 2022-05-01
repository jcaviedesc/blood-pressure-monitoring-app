import { TextStyle, ViewStyle } from 'react-native';
import Metrics from './Metrics';
import Colors from './Colors';
import Fonts from './Fonts';
// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

interface IApplicationStyles {
  screen: {
    mainContainer: ViewStyle;
    darkContainer: ViewStyle;
    content: ViewStyle;
    section: ViewStyle;
    titleContainer: ViewStyle;
    titleScreen: TextStyle;
    subTitleScreen: TextStyle;
  };
}

const ApplicationStyles: IApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.background,
      paddingBottom: 12,
    },
    darkContainer: { backgroundColor: Colors.darkBackground },
    content: {
      flex: 1,
      paddingHorizontal: Metrics.marginHorizontal,
    },
    section: {
      marginTop: Metrics.marginVertical + 8,
      marginHorizontal: Metrics.marginHorizontal,
      backgroundColor: Colors.background,
    },
    titleContainer: {
      marginBottom: 31,
      marginTop: 21,
    },
    titleScreen: {
      fontFamily: Fonts.type.bold,
      color: Colors.headline,
      fontSize: Fonts.size.h1,
      textAlign: 'center',
    },
    subTitleScreen: {
      ...Fonts.style.normal,
      color: Colors.paragraph,
    },
  },
};

export default ApplicationStyles;
