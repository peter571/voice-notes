import { Text, View } from 'react-native';
import { useSession } from '@/context/ctx';
import { supabase } from '@/lib/supabase';

export default function Index() {

  const signOut = async () => {
    await supabase.auth.signOut();
  }
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-up screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
