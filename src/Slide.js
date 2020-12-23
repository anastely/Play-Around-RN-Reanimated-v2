/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Dimensions, StyleSheet, Button, Alert} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
  useDerivedValue,
  Easing,
} from 'react-native-reanimated';
import {clamp} from './util';

const {width} = Dimensions.get('window');

const SLIDER_WIDTH = width;
const MOON_WIDTH = 70;

const Slider = () => {
  const circleTranslateX = useSharedValue(0);

  const animatedCircle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: circleTranslateX.value}],
    };
  });

  const animatedTranslateMoon = useAnimatedStyle(() => {
    return {
      transform: [{translateX: circleTranslateX.value}],
    };
  });
  const animatedRotateMoon = useAnimatedStyle(() => {
    const rotateMoon = interpolate(
      circleTranslateX.value,
      [0, SLIDER_WIDTH],
      [0, 4 * 360],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{rotate: rotateMoon + 'deg'}],
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.offsetX = circleTranslateX.value;
    },
    onActive: (event, context) => {
      circleTranslateX.value = clamp(
        event.translationX + context.offsetX,
        2,
        SLIDER_WIDTH - MOON_WIDTH - 2,
      );
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.dummyView} />
      <View style={styles.circleContainer}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.circle, animatedTranslateMoon]}>
            <Animated.View
              style={[{...StyleSheet.absoluteFillObject}, animatedRotateMoon]}>
              <View style={styles.smallCircle} />
              <View
                style={[
                  styles.smallCircle,
                  {width: 20, height: 20, borderRadius: 10, top: 35, left: 40},
                ]}
              />
              <View
                style={[
                  styles.smallCircle,
                  {width: 25, height: 25, borderRadius: 13, top: 10, left: 20},
                ]}
              />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    backgroundColor: '#c1c1c1',
    width: SLIDER_WIDTH,
    marginHorizontal: 10,
    justifyContent: 'center',
    height: MOON_WIDTH + 6,
    borderRadius: MOON_WIDTH / 2,
  },
  circle: {
    height: MOON_WIDTH,
    width: MOON_WIDTH,
    borderRadius: MOON_WIDTH / 2,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'dashed',
  },
  smallCircle: {
    ...StyleSheet.absoluteFillObject,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#c1c7c1',
    top: 37,
    left: 10,
    paddingVertical: 5,
  },
  progress: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#3f51b5',
    borderRadius: MOON_WIDTH / 2,
  },
  dummyView: {
    backgroundColor: '#0c7fcf',
    width,
    height: 200,
    marginVertical: 30,
  },
});
