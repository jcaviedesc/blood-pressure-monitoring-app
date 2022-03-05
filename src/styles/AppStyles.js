import Metrics from './Metrics';
import Colors from './Colors';
// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.background,
      paddingTop: Metrics.navBarHeight,
      paddingBottom: 12,
    },
    mainContainerWitoutHeader: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    darkContainer: { backgroundColor: Colors.darkBackground },
    content: {
      flex: 1,
      paddingHorizontal: Metrics.marginHorizontal,
    },
    section: {
      marginTop: Metrics.marginVertical + 8,
      marginHorizontal: Metrics.marginHorizontal,
    },
    titleContainer: {
      marginBottom: 31,
      marginTop: 21,
    },
  },
};

export default ApplicationStyles;
