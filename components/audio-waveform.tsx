import React, { useState, useEffect } from "react";
import { View, Pressable, StyleSheet, Text, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatSecondsToMinutes } from "@/utils/helpers";
import { theme } from "@/theme";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

const barCount = Number((Dimensions.get("screen").width / 5).toFixed(0));

interface AudioWaveformProps {
  audioFile: { uri: string };
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ audioFile }) => {
  const [barHeights, setBarHeights] = useState<number[]>([]);
  const { duration, position, isPlaying, seekTo, playPause } = useAudioPlayer(
    audioFile.uri
  );

  useEffect(() => {
    setBarHeights([...Array(barCount)].map(() => Math.random() * 20 + 10));
  }, []);

  const handleBarPress = (index: number) => {
    const newPosition = (index / (barCount - 1)) * duration;
    seekTo(newPosition);
  };

  return (
    <View>
      <View style={styles.durationContainer}>
        <Text style={styles.durationText}>
          {formatSecondsToMinutes(position / 1000)}/
          {formatSecondsToMinutes(duration / 1000)}
        </Text>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.playButton} onPress={playPause}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={19}
            color={theme.colors.white}
          />
        </Pressable>
        <View style={styles.waveform}>
          {barHeights.map((height, i) => {
            const barPosition = (i / (barCount - 1)) * duration;
            const isActive = barPosition <= position;
            const isHalfActive =
              barPosition <= position + duration / barCount / 2;

            return (
              <Pressable
                key={i}
                onPress={() => handleBarPress(i)}
                style={styles.barContainer}
              >
                <View
                  style={[
                    styles.bar,
                    {
                      height,
                      backgroundColor: isActive
                        ? theme.colors.primary.DEFAULT
                        : isHalfActive
                        ? "#8BE3D7"
                        : "#CBD5E0",
                    },
                  ]}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 10,
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingVertical: theme.spacing.s2,
  },
  playButton: {
    backgroundColor: theme.colors.primary.DEFAULT,
    width: 43,
    height: 43,
    borderRadius: 43 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  waveform: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    flex: 1,
  },
  barContainer: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
  bar: {
    width: 3,
    marginHorizontal: 1,
    borderRadius: 3 / 2,
  },
  durationText: {
    color: theme.colors.black,
    fontSize: 12,
    fontFamily: theme.fontFamily.body.Montserrat.regular,
  },
});

export default AudioWaveform;
