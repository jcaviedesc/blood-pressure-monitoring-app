import { TextStyle, ViewStyle } from 'react-native';
import Metrics from './Metrics';
import Colors from './Colors';
import Fonts from './Fonts';
// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

interface IApplicationStyles {
  screen: {
    fullScreen: ViewStyle;
    mainContainer: ViewStyle;
    keyboardAvoidingView: ViewStyle;
    view: ViewStyle;
    darkBackground: ViewStyle;
    content: ViewStyle;
    section: ViewStyle;
    pageTitleContainer: ViewStyle;
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
    fullScreen: { flex: 1 },
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.background,
      paddingBottom: 12,
    },
    keyboardAvoidingView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    view: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    pageTitleContainer: {
      paddingTop: 21,
    },
    darkBackground: { backgroundColor: Colors.darkBackground },
    content: {
      flex: 1,
      paddingHorizontal: Metrics.marginHorizontal,
    },
    section: {
      marginTop: Metrics.marginVertical + 8,
      marginHorizontal: Metrics.marginHorizontal,
    },
    titleContainer: {
      marginVertical: 31,
      paddingTop: 21,
    },
    titleScreen: {
      fontFamily: Fonts.type.bold,
      color: Colors.headline,
      fontSize: Fonts.size.h3,
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
      fontFamily: Fonts.type.semiBold,
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
