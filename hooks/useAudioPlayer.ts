import { useState, useCallback, useRef, useEffect } from "react";
import { Audio, AVPlaybackStatusSuccess } from "expo-av";

interface AudioPlayerState {
  duration: number;
  position: number;
  isPlaying: boolean;
}

export const useAudioPlayer = (audioUri: string) => {
  const [state, setState] = useState<AudioPlayerState>({
    duration: 0,
    position: 0,
    isPlaying: false,
  });
  const sound = useRef(new Audio.Sound());

  const loadAudio = useCallback(async () => {
    try {
      if (audioUri) {
        await sound.current.loadAsync({ uri: audioUri }, {}, true);
        const status =
          (await sound.current.getStatusAsync()) as AVPlaybackStatusSuccess;
        if (status.isLoaded) {
          setState((prev) => ({
            ...prev,
            duration: status.durationMillis || 0,
          }));
        }
      }
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  }, [audioUri]);

  const updatePosition = useCallback(async () => {
    try {
      const status = await sound.current.getStatusAsync();
      if (status.isLoaded) {
        setState((prev) => ({
          ...prev,
          position: status.positionMillis || 0,
        }));
      }
    } catch (error) {
      console.error("Error updating position:", error);
    }
  }, []);

  const seekTo = useCallback(async (position: number) => {
    await sound.current.setPositionAsync(position);
    setState((prev) => ({ ...prev, position }));
  }, []);

  const playPause = useCallback(async () => {
    try {
      const status =
        (await sound.current.getStatusAsync()) as AVPlaybackStatusSuccess;
      if (status.isLoaded) {
        if (!status.isPlaying) {
          if (status.positionMillis === status.durationMillis) {
            await sound.current.setPositionAsync(0);
          }
          await sound.current.playAsync();
        } else {
          await sound.current.pauseAsync();
        }
      }
    } catch (error) {
      console.error("Error playing/pausing audio:", error);
    }
  }, []);

  useEffect(() => {
    loadAudio();
    return () => {
      sound.current.unloadAsync();
    };
  }, [loadAudio]);

  useEffect(() => {
    const intervalId = setInterval(updatePosition, 100);
    return () => clearInterval(intervalId);
  }, [updatePosition]);

  useEffect(() => {
    const updateIsPlaying = async () => {
      const status =
        (await sound.current.getStatusAsync()) as AVPlaybackStatusSuccess;
      setState((prev) => ({ ...prev, isPlaying: status.isPlaying }));
    };
    sound.current.setOnPlaybackStatusUpdate(updateIsPlaying);
    return () => sound.current.setOnPlaybackStatusUpdate(null);
  }, []);

  return {
    ...state,
    seekTo,
    playPause,
  };
};
