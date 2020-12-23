import React from 'react';
import {SafeAreaView, StyleSheet, Button} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withTiming,
  withSpring,
  Easing,
  cancelAnimation,
  withDelay,
  withRepeat,
  withSequence,
  withDecay,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Slide from './src/Slide';
import Cards from './src/Slide';

const App = () => {
  const opacity = useSharedValue(0.4); // it's like Animated.Value in RN Animated API
  const progress = useSharedValue(0);
  const translateX = useDerivedValue(() => {
    return progress.value * 500;
  });
  const animatedBox = useAnimatedStyle(() => {
    return {
      // transform: [{translateX: progress.value * 100}],
      transform: [{translateX: translateX.value}],
      opacity: opacity.value,
    };
  });

  const panGeTranslateY = useSharedValue(0);
  const panGeTranslateX = useSharedValue(0);
  const isPanning = useSharedValue(false);

  const widthBox = useSharedValue(50);

  React.useEffect(() => {
    // we can change the opacity value like this.
    setTimeout(() => {
      opacity.value = 1;
    }, 1200);
  }, []);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      // to remember the initial position we use onStart
      context.startY = panGeTranslateY.value;
      context.startX = panGeTranslateX.value;
      isPanning.value = true;
    },
    onActive: (event, context) => {
      panGeTranslateY.value = context.startY + event.translationY;
      panGeTranslateX.value = context.startX + event.translationX;
    },
    onEnd: (_) => {
      isPanning.value = false;
    },
  });

  const animatedGestureStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(isPanning.value ? 0.7 : 1),
      transform: [
        {translateY: withSpring(panGeTranslateY.value)},
        {translateX: withSpring(panGeTranslateX.value)},
        {scale: withSpring(isPanning.value ? 1.3 : 1)},
      ],
    };
  });

  const animatedBoxWidth = useAnimatedStyle(() => {
    return {
      width: widthBox.value * 250,
      //  withTiming(widthBox.value, {
      //   duration: 200,
      //   easing: Easing.linear,
      // }),
    };
  });
  return (
    <SafeAreaView style={styles.container}>
      {/* <Animated.View style={[styles.box, animatedBox]} />
      <Button
        title="move"
        onPress={() => {
          // progress.value = Math.random(); // here we update the value to the number immediately, so we see the box Jumping "Without any Animation [smooth]".
          //  progress.value = withTiming(Math.random(), {
          //  duration: 700,
          //easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          //}); // when using withTiming() we smoothly animate from the current position of it to new one "Randomly selected one[random number]".

          // opacity.value = withTiming(Math.random() * 0.5);

          // progress.value = withSpring(Math.random()); //animate but with spring physics.

          // progress.value = withDelay(500, withSpring(Math.random())); // add 300 millisecond delay befor animation.

          // progress.value = withRepeat(
          //   withTiming(Math.random(), {duration: 800}),
          //   -1, // number of repeats, if we add negative number that's will repeated forever[loop]
          //   false,
          // ); // Repeat Animation :D

          progress.value = withSequence(withTiming(0.5), withSpring(0.1)); // run Sequence of animation.
          // progress.value = withDecay({
          //   velocity: Math.random() * 0.7,
          //   clamp: [0, 200],
          // }); // run Sequence of animation.
        }}
      />

      <Button
        title="Stop"
        onPress={() => {
          console.log('Stopping mid animation', progress.value);
          cancelAnimation(progress); //it's cancel animation :D and we can get the current animation value.
        }}
      />

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.box, animatedGestureStyle]} />
      </PanGestureHandler>

      <Animated.View style={[styles.box, animatedBoxWidth]} />

      <Button
        title="Random Width"
        onPress={() => (widthBox.value = withSpring(Math.random()))}
      /> */}

      <Slide />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#0c70c7',
    borderRadius: 20,
    margin: 20,
  },
});
