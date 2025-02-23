import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";

export default function AudioPlayerProgressBar({
  position,
  duration,
}: {
  position: number;
  duration: number;
}) {
  const isSliding = useSharedValue(false);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }
  return (
    <View>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        containerStyle={styles.slider}
        thumbWidth={0}
        renderBubble={() => null}
        theme={{
          minimumTrackTintColor: "#6A39F4FF",
          maximumTrackTintColor: "#D2C3FBFF",
        }}
        onSlidingStart={() => (isSliding.value = true)}
        onValueChange={async (value) => {
          if (isSliding.value) {
            progress.value = value;
          }
        }}
        onSlidingComplete={async (value) => {
          // if the user is not sliding, we should not update the position
          if (!isSliding.value) return;
          isSliding.value = false;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  slider: {
    height: 2,
    borderRadius: 16,
  },
});
