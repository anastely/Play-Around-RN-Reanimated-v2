import React from 'react';
import {StyleSheet, Text, View, Dimensions, Alert, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');
export const MIN_HEIGHT = 180;
export const MAX_HEIGHT = height / 2;
const Item = ({y, index, item: {picture, subtitle, title}}) => {
  const inputRange = [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT];
  // For First Way "ScrollView"
  const container = useAnimatedStyle(() => ({
    height: interpolate(
      y.value,
      inputRange,
      [MIN_HEIGHT, MAX_HEIGHT],
      Extrapolate.CLAMP,
    ),
  }));
  const titleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(y.value, inputRange, [0, 1], Extrapolate.CLAMP),
  }));

  // For Second Way "PanGestureHandler"
  // const container = useAnimatedStyle(() => ({
  //   height: interpolate(
  //     -y.value,
  //     inputRange,
  //     [MIN_HEIGHT, MAX_HEIGHT],
  //     Extrapolate.CLAMP,
  //   ),
  //   top: y.value,
  // }));

  // const titleStyle = useAnimatedStyle(() => ({
  //   opacity: interpolate(-y.value, inputRange, [0, 1], Extrapolate.CLAMP),
  // }));
  return (
    <TouchableWithoutFeedback onPress={() => Alert.alert('Pressed!')}>
      <Animated.View style={[styles.container, container]}>
        <Image source={picture} style={styles.picture} />
        <View style={styles.titleContainer}>
          <Text style={styles.subtitle}>{subtitle.toUpperCase()}</Text>
          <View style={styles.mainTitle}>
            <Animated.View style={titleStyle}>
              <Text style={styles.title}>{title.toUpperCase()}</Text>
            </Animated.View>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    width,
    height: MIN_HEIGHT,
    justifyContent: 'flex-end',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  title: {
    color: '#f3f2f1',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '500',
  },
  titleContainer: {
    maxHeight: MAX_HEIGHT * 0.8,
    justifyContent: 'center',
    flex: 1,
  },
  mainTitle: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    padding: 32,
    transform: [{translateY: 60}],
  },
  subtitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
