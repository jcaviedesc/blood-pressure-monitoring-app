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
    paragraph: TextStyle;
  };
  withActionsheet: {
    actionSheet: ViewStyle;
    actionSheetTouch: ViewStyle;
    actionSheetText: TextStyle;
    actionSheetTouchContent: ViewStyle;
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
    paragraph: {
      ...Fonts.style.paragraph,
      color: Colors.paragraph,
    },
  },
  withActionsheet: {
    actionSheet: {
      paddingBottom: 27,
      paddingTop: 20,
    },
    actionSheetTouch: {
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
    actionSheetText: {
      marginLeft: 12,
      fontFamily: Fonts.type.regular,
      fontSize: Fonts.size.paragraph,
      color: Colors.headline,
    },
    actionSheetTouchContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
};

export default ApplicationStyles;
