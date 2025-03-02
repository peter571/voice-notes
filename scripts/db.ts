import { supabase } from "@/lib/supabase";

// Function to create the table
async function createTable() {
  const { data, error } = await supabase.rpc("sql", {
    sql: `
      CREATE TABLE voicenotes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES auth.users(id),
        title TEXT,
        audio_url TEXT,
        duration INTEGER,
        transcript TEXT,
        summary TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `,
  });

  if (error) {
    console.error("Error creating table:", error);
  } else {
    console.log("Table created successfully:", data);
  }
}

// Run the function
createTable();
