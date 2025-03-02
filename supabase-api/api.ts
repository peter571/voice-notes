import { supabase } from "@/lib/supabase";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

// Define the type for a voice note
export interface VoiceNote {
  id?: string;
  user_id: string;
  title: string;
  audio_url: string;
  duration: number;
  transcript?: string;
  summary?: string;
  created_at?: string;
  updated_at?: string;
}

// Fetch user
export const getUser = async (id: string) => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Fetch user voice notes
export const fetchUserVoiceNotes = async (
  userId: string
): Promise<VoiceNote[]> => {
  try {
    const { data, error } = await supabase
      .from("voicenotes")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    throw error;
  }
};

// Fetch voice note by ID
export const fetchVoiceNoteById = async (
  id: string
): Promise<VoiceNote | null> => {
  try {
    const { data, error } = await supabase
      .from("voicenotes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Post a voice note to DB
export const postVoiceNote = async (
  voiceNote: Omit<VoiceNote, "id" | "created_at" | "updated_at">
) => {
  try {
    const { data, error } = await supabase
      .from("voicenotes")
      .insert([voiceNote]);

    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Delete a voice note
export const deleteVoiceNote = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase.from("voicenotes").delete().eq("id", id);

    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

// Storage endpoint to save voice recordings
export const saveVoiceRecording = async (
  uri: string,
  userId: string
): Promise<string> => {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`Failed to fetch file from URI: ${uri}`);
    }
    const blob = await response.blob();
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });
    const fileName = `${userId}/${Date.now()}`;

    //return fileName;
    const { data, error } = await supabase.storage
      .from("voice-recordings")
      .upload(fileName, decode(base64), {
        contentType: blob.type,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("voice-recordings").getPublicUrl(fileName);
    return publicUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
