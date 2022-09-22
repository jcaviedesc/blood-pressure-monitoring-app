import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import RNRestart from 'react-native-restart';
import { Colors, Fonts, Images, Metrics } from '../styles';
import { translate } from './LocalizationProvider';
import { Button } from '../components';
import { parseError } from '../services/ErrorUtils';

const styles = StyleSheet.create({
  appErrorContainer: {
    flex: 1,
  },
  image: {
    resizeMode: 'contain',
    width: Metrics.screenWidth - Metrics.marginHorizontal,
    height: '100%',
  },
  header: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: Metrics.marginHorizontal,
  },
  body: {
    flex: 4,
    maxWidth: Metrics.screenWidth,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: 38,
    color: Colors.headline,
  },
  bodyText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h6,
    color: Colors.paragraph,
    marginBottom: 21,
  },
  buttonContainer: {
    flex: 4,
    paddingHorizontal: Metrics.marginHorizontal,
  },
});

export class AppErrorBoundary extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    crashlytics().log(error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // You can also log the error to an error reporting service
    crashlytics().log(`Crash: ${JSON.stringify(errorInfo)}`);
    crashlytics().recordError(parseError(error));
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <View style={styles.appErrorContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{translate('appCrash.title')}</Text>
          </View>
          <View style={styles.body}>
            <Image source={Images.appCrash} style={styles.image} />
          </View>
          <View style={styles.buttonContainer}>
            <View>
              <Text style={styles.bodyText}>
                {translate('appCrash.bodyText')}
              </Text>
            </View>
            <Button
              hierarchy="quiet"
              title={translate('appCrash.buttonText')}
              onPress={() => {
                RNRestart.Restart();
              }}
            />
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}
