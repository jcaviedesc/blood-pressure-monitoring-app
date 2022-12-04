import { useCallback } from 'react';
import { Alert, Linking } from 'react-native';

export const useLinkedUrl = (url: string) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return handlePress;
};

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
//       <OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
// });

// export default App;
