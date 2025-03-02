import { useState, useCallback, useEffect } from "react";
import { Audio } from "expo-av";
interface AudioRecorderState {
  recording: Audio.Recording | undefined;
  isRecording: boolean;
  uri: string | null;
  error: string | null;
  timer: number;
}

export const useAudioRecorder = () => {
  const [state, setState] = useState<AudioRecorderState>({
    recording: undefined,
    isRecording: false,
    uri: null,
    error: null,
    timer: 0,
  });

  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const checkAndRequestPermissions = useCallback(async () => {
    try {
      if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        const permission = await requestPermission();
        if (permission.status !== "granted") {
          throw new Error("Permission not granted");
        }
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to get permissions",
      }));
      return false;
    }
    return true;
  }, [permissionResponse, requestPermission]);

  const setupAudioMode = useCallback(async (isRecording: boolean) => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: isRecording,
        playsInSilentModeIOS: isRecording,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to setup audio mode",
      }));
      return false;
    }
    return true;
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const hasPermission = await checkAndRequestPermissions();
      if (!hasPermission) return;

      const audioModeSet = await setupAudioMode(true);
      if (!audioModeSet) return;

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setState((prev) => ({
        ...prev,
        recording,
        isRecording: true,
        error: null,
        timer: 0,
      }));
      console.log("Recording started");
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to start recording",
      }));
      console.error("Failed to start recording", error);
    }
  }, [checkAndRequestPermissions, setupAudioMode]);

  const stopRecording = useCallback(async () => {
    try {
      if (!state.recording) return;

      console.log("Stopping recording..");
      await state.recording.stopAndUnloadAsync();
      await setupAudioMode(false);

      const uri = state.recording.getURI();
      console.log("Recording stopped and stored at", uri);

      setState((prev) => ({
        ...prev,
        recording: undefined,
        isRecording: false,
        uri,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to stop recording",
      }));
      console.error("Failed to stop recording", error);
    }
  }, [state.recording, setupAudioMode]);

  const playRecording = useCallback(async () => {
    if (!state.uri) return;

    const sound = new Audio.Sound();
    try {
      await sound.loadAsync({ uri: state.uri });
      await sound.playAsync();
    } catch (error) {
      console.error("Failed to play recording", error);
    }
  }, []);

  const pauseRecording = useCallback(async () => {
    if (!state.recording) return;

    try {
      await state.recording.pauseAsync();
    } catch (error) {
      console.error("Failed to pause recording", error);
    }
  }, []);

  // Timer effect
  useEffect(() => {
    let timerInterval: NodeJS.Timeout | undefined;
    if (state.isRecording) {
      timerInterval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          timer: prev.timer + 1,
        }));
      }, 1000);
    } else if (!state.isRecording && state.timer !== 0) {
      clearInterval(timerInterval);
    }
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [state.isRecording]);

  return {
    isRecording: state.isRecording,
    uri: state.uri,
    error: state.error,
    timer: state.timer,
    startRecording,
    stopRecording,
    playRecording,
    pauseRecording,
  };
};
