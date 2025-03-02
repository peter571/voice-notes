import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { usePathname, useRouter } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import { theme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import AudioPlayerProgressBar from "@/components/audio-progress-bar";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { globalStyles } from "@/styles";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { fetchVoiceNoteById } from "@/supabase-api/api";
import { formatDbDate } from "@/utils/helpers";
import { SheetManager } from "react-native-actions-sheet";

export default function NotePreview() {
  const params = useLocalSearchParams<{
    id: string;
  }>();
  const { data, isLoading } = useQuery({
    queryKey: ["notes", params.id],
    queryFn: () => fetchVoiceNoteById(params.id),
    enabled: !!params.id,
  });

  const { isPlaying, playPause, position, duration } = useAudioPlayer(
    data?.audio_url!
  );

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: theme.spacing.s5,
        gap: theme.spacing.s2,
        paddingBottom: 200,
      }}
    >
      <Header
        title="Voice Note"
        rightItem={
          <Pressable
            onPress={() => {
              SheetManager.show("NOTE_OPTIONS");
            }}
          >
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </Pressable>
        }
      />
      <View
        style={{
          marginVertical: theme.spacing.s4,
        }}
      >
        <AudioPlayerProgressBar position={position} duration={duration} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: theme.spacing.s4,
          }}
        >
          <View
            style={{
              gap: theme.spacing.s2,
            }}
          >
            <Text
              style={{
                fontSize: theme.fontSize.t6,
                fontFamily: theme.fontFamily.body.Montserrat.bold,
                color: "#323743FF",
              }}
            >
              {data?.title}
            </Text>
            <Text
              style={{
                fontSize: theme.fontSize.t3,
                fontFamily: theme.fontFamily.body.Montserrat.regular,
                color: "#9095A1FF",
              }}
            >
              {formatDbDate(data?.created_at!)}
            </Text>
          </View>
          <Pressable style={styles.playButton} onPress={playPause}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={19}
              color={theme.colors.white}
            />
          </Pressable>
        </View>
      </View>
      <Text style={globalStyles.title}>Summary</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: theme.spacing.s4,
        }}
      >
        <Text style={globalStyles.paragraph}>
          {data?.summary || "No summary available"}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playButton: {
    backgroundColor: theme.colors.primary.DEFAULT,
    width: 43,
    height: 43,
    borderRadius: 43 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
