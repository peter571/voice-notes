import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";

export const useAudioProperties = ({ uri }: { uri: string }) => {
  const [audioProperties, setAudioProperties] = useState({});

  const getAudioProperties = async () => {
    try {
      if (!uri) return;
      const audioInfo = await FileSystem.getInfoAsync(uri, {
        size: true,
        md5: true,
      });

      // Load audio to get duration
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: uri });
      const status = await sound.getStatusAsync();
      setAudioProperties({
        duration: status.isLoaded ? status.durationMillis : 0,
        format: audioInfo.uri.split(".").pop(),
        ...audioInfo,
      });
    } catch (error) {
      console.error("Error getting audio properties:", error);
    }
  };

  useEffect(() => {
    getAudioProperties();
  }, [uri]);

  return { audioProperties, getAudioProperties };
};
