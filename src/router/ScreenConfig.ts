import { CardStyleInterpolators } from '@react-navigation/stack';
import { Colors, Fonts } from '../styles';

const ConfigAnimation = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const defaultOptions = {
  animationEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: ConfigAnimation,
    close: ConfigAnimation,
  },
  headerTitleStyle: {
    fontFamily: Fonts.type.bold,
    color: Colors.headline,
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const ModalTransition = {
  headerShown: false,
  animationEnable: true,
  cardStyle: { backgroundColor: 'rgba(0,0,0,0.25)' },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.7, 1],
          outputRange: [0, 0.9, 1],
        }),
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
          extrapolate: 'clamp',
        }),
      },
    };
  },
};

export { ConfigAnimation, ModalTransition };
export default defaultOptions;
