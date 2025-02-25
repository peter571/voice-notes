import axios from "axios";
import * as FileSystem from "expo-file-system";
import OpenAI from "openai";

const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_VN_APP?.toString();

const openAI = axios.create({
  baseURL: "https://api.openai.com/v1",
});

// Transcribe audio to text
const speechToText = async ({ uri }: { uri: string }) => {
  try {
    //Get file info
    const fileInfo = await FileSystem.getInfoAsync(uri);

    if (!fileInfo.exists) {
      console.error("File does not exist");
      return;
    }

    // Convert file URI to Blob (required for FormData)
    const file = {
      uri: uri,
      name: "audio.m4a", // Ensure it has a valid filename
      type: "audio/m4a", // Correct MIME type for M4A
    };

    // Create FormData
    const formData = new FormData();
    const blob = await fetch(uri).then((res) => res.blob());

    formData.append("file", file as any);
    formData.append("model", "whisper-1");

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${API_KEY}`,
    };
    const openai = new OpenAI({ apiKey: API_KEY });

    const transcription = await openai.audio.transcriptions.create({
      file: blob as any,
      model: "whisper-1",
    });

    return transcription.text;
  } catch (error) {
    console.error("Error transcribing audio:", JSON.stringify(error, null, 2));
    throw error;
  }
};

// Summarize speech
const summarizeText = async ({ text }: { text: string }) => {
  try {
    const response = await openAI.post(
      "/chat/completions",
      {
        prompt: text,
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error summarizing text:", JSON.stringify(error, null, 2));
    throw error;
  }
};

export { speechToText, summarizeText };
