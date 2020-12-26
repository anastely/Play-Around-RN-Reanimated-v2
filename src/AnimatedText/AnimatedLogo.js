import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useDerivedValue,
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, {Circle, Ellipse} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

const vWidth = 842;
const vHeight = 596;
const width = Dimensions.get('window').width + 128;
const height = (width * vHeight) / vWidth;

const AnimatedLogo = ({progress}) => {
  const [length, setLength] = React.useState(0);
  const ref = React.useRef();

  const part1 = useDerivedValue(() =>
    Easing.inOut(Easing.ease)(
      interpolate(progress.value, [0, 0.75], [0, 1], Extrapolate.CLAMP),
    ),
  );
  const part2 = useDerivedValue(() =>
    Easing.inOut(Easing.ease)(
      interpolate(progress.value, [0.75, 1], [0, 1], Extrapolate.CLAMP),
    ),
  );

  const strokeAnimation = () => {
    'worklet';
    return {
      strokeDashoffset: length - length * part1.value,
    };
  };

  const rotateAnimation = (target) => () => {
    'worklet';
    return {
      transform: [{rotate: target * part2.value}],
    };
  };

  const animatedProps1 = useAnimatedProps(strokeAnimation);
  const animatedProps2 = useAnimatedProps(strokeAnimation);
  const animatedProps3 = useAnimatedProps(strokeAnimation);

  const style1 = useAnimatedStyle(rotateAnimation(Math.PI / 6)); // 30deg
  const style2 = useAnimatedStyle(rotateAnimation(-Math.PI / 6)); // -30deg
  const style3 = useAnimatedStyle(rotateAnimation(Math.PI / 2)); // 90deg

  return (
    <View>
      <Animated.View style={style1}>
        <Svg width={width} height={height} viewBox={`0 0 ${vWidth} ${vHeight}`}>
          <AnimatedCircle r={30} cx="428.5" cy="295.5" fill="#61defb" />
          <AnimatedEllipse
            animatedProps={animatedProps1}
            ref={ref}
            onLayout={() => setLength(ref.current.getTotalLength())}
            cx="428.5"
            cy="295.5"
            rx="91.5"
            ry="232.5"
            stroke="#61defb"
            strokeWidth="20"
            strokeDasharray={length}
          />
        </Svg>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, style2]}>
        <Svg width={width} height={height} viewBox={`0 0 ${vWidth} ${vHeight}`}>
          <AnimatedEllipse
            animatedProps={animatedProps2}
            cx="428.5"
            cy="295.5"
            rx="91.5"
            ry="232.5"
            stroke="#61defb"
            strokeWidth="20"
            strokeDasharray={length}
          />
        </Svg>
      </Animated.View>

      <Animated.View style={[StyleSheet.absoluteFill, style3]}>
        <Svg width={width} height={height} viewBox={`0 0 ${vWidth} ${vHeight}`}>
          <AnimatedEllipse
            animatedProps={animatedProps3}
            cx="428.5"
            cy="295.5"
            rx="91.5"
            ry="232.5"
            stroke="#61defb"
            strokeWidth="20"
            strokeDasharray={length}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default AnimatedLogo;

const styles = StyleSheet.create({});
