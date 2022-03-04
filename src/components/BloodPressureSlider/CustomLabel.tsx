import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors, Fonts, Metrics } from '../../styles';

const AnimatedView = Animated.createAnimatedComponent(View);

CustomLabel.defaultProps = {
  leftDiff: 0,
};

export const DIFFERENCE = 202;

const sliderLength = Metrics.screenHeight - DIFFERENCE;
const height = 45;
const width = 160;
const pointerWidth = height * 0.47;

function LabelBase(props) {
  const { position, value, pressed, prefix } = props;
  const scaleValue = React.useRef(new Animated.Value(0.1)); // Behaves oddly if set to 0
  const cachedPressed = React.useRef(pressed);

  React.useEffect(() => {
    Animated.timing(scaleValue.current, {
      toValue: pressed ? 1.05 : 1,
      duration: 200,
      delay: pressed ? 2000 : 0,
      useNativeDriver: false,
    }).start();
    cachedPressed.current = pressed;
  }, [pressed]);

  return (
    Number.isFinite(position) &&
    Number.isFinite(value) && (
      <AnimatedView
        style={[
          styles.sliderLabel,
          {
            top: sliderLength - position + height / 2 - 10,
            transform: [{ scale: scaleValue.current }],
          },
        ]}>
        <View style={styles.pointer} />
        <Text style={styles.sliderLabelText}>
          <Text style={styles.sliderLabelPrefix}>{prefix}</Text>
          {` ${value}`}
        </Text>
      </AnimatedView>
    )
  );
}

export default function CustomLabel(props) {
  const {
    leftDiff,
    oneMarkerValue,
    twoMarkerValue,
    oneMarkerLeftPosition,
    twoMarkerLeftPosition,
    oneMarkerPressed,
    twoMarkerPressed,
  } = props;
  console.log(props);
  return (
    <View style={styles.parentView}>
      <LabelBase
        position={oneMarkerLeftPosition}
        value={oneMarkerValue}
        leftDiff={leftDiff}
        pressed={oneMarkerPressed}
        prefix="DIA"
      />
      <LabelBase
        position={twoMarkerLeftPosition}
        value={twoMarkerValue}
        leftDiff={leftDiff}
        pressed={twoMarkerPressed}
        prefix="SYS"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  parentView: {
    position: 'relative',
    backgroundColor: 'green',
  },
  sliderLabel: {
    position: 'absolute',
    justifyContent: 'center',
    width: width,
    height: height,
    right: width * 2.1,
  },
  sliderLabelText: {
    textAlign: 'center',
    lineHeight: height,
    backgroundColor: Colors.background,
    flex: 1,
    fontSize: Fonts.size.h1,
    color: Colors.button,
    fontFamily: Fonts.type.regular,
    paddingRight: 12,
  },
  sliderLabelPrefix: {
    fontFamily: Fonts.type.bold,
  },
  pointer: {
    position: 'absolute',
    top: (height - pointerWidth) / 2,
    right: -pointerWidth / 4,
    transform: [{ rotate: '45deg' }],
    width: pointerWidth,
    height: pointerWidth,
    backgroundColor: Colors.button,
  },
});
