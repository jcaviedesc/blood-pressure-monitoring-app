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
    fontFamily: Fonts.type.regular,
    fontSize: 27,
    color: Colors.secondaryText,
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export { ConfigAnimation };
export default defaultOptions;
