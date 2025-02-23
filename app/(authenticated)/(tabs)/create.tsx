import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/theme";
import { globalStyles } from "@/styles";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import AudioWaveform from "@/components/audio-waveform";
import { useAudioProperties } from "@/hooks/useAudioProperties";
import { speechToText } from "@/open-ai";

export default function Create() {
  const { stopRecording, startRecording, isRecording, uri } =
    useAudioRecorder();
  const { audioProperties } = useAudioProperties({ uri: uri! });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.spacing.s5,
        gap: theme.spacing.s6,
      }}
    >
      <Text
        style={[
          globalStyles.title,
          {
            textAlign: "center",
          },
        ]}
      >
        Create a voice note
      </Text>
      <Text
        style={[
          globalStyles.paragraph,
          {
            textAlign: "center",
          },
        ]}
      >
        Press the button to start recording your voice note.
      </Text>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: theme.borderRadius.full,
          backgroundColor: theme.colors.primary.DEFAULT,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
        activeOpacity={0.8}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <MaterialCommunityIcons
          name="microphone"
          size={32}
          color={theme.colors.white}
        />
      </TouchableOpacity>
      <Text
        style={{
          textAlign: "center",
        }}
      >
        {isRecording ? "Recording.." : ""}
      </Text>
      {uri && (
        <View
          style={{
            gap: theme.spacing.s6,
          }}
        >
          <AudioWaveform audioFile={{ uri }} />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: theme.colors.primary.DEFAULT,
              borderRadius: theme.borderRadius.xl,
              padding: theme.spacing.s1,
              alignItems: "center",
              gap: theme.spacing.s2,
              alignSelf: "flex-start",
            }}
            activeOpacity={0.8}
            onPress={async () => {
              const result = await speechToText({ uri });
              console.log("Pressed", result);
            }}
          >
            <Text
              style={[
                globalStyles.paragraph,
                {
                  color: theme.colors.primary.DEFAULT,
                },
              ]}
            >
              Generate summary
            </Text>
            <MaterialIcons
              name="summarize"
              size={24}
              color={theme.colors.primary.DEFAULT}
            />
          </TouchableOpacity>
          <View
            style={{
              gap: theme.spacing.s6,
            }}
          >
            <Text style={globalStyles.title}>Summary</Text>
            <Text style={globalStyles.paragraph}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos
              cupiditate autem dolores sequi nobis molestiae dolor ratione id
              libero? Veritatis consectetur dolores animi modi quo! Ad,
              voluptatem minima illo dolorum harum obcaecati porro delectus
              velit.
            </Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spacing.s2,
              }}
            >
              <Feather
                name="save"
                size={24}
                color={theme.colors.primary.DEFAULT}
              />
              <Text
                style={[
                  globalStyles.paragraph,
                  {
                    color: theme.colors.primary.DEFAULT,
                  },
                ]}
              >
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
