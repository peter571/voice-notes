import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/theme";
import { InputField } from "@/components/input-field";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchUserVoiceNotes, VoiceNote } from "@/supabase-api/api";
import { useSession } from "@/context/ctx";
import { formatDbDate } from "@/utils/helpers";
import { SheetManager } from "react-native-actions-sheet";
import { useEffect } from "react";

export default function Index() {
  const { session } = useSession();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchUserVoiceNotes(session?.user.id!),
    enabled: !!session?.user.id,
  });

  useEffect(() => {
    refetch();
  }, []);

  const renderItem = ({ item }: { item: VoiceNote }) => {
    return (
      <Pressable
        style={styles.itemContainer}
        onPress={() => {
          router.push(`/note/${item.id}`);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: theme.spacing.s5,
          }}
        >
          <Text style={[styles.itemTitle, {}]} numberOfLines={2}>
            {item.title}
          </Text>
          <Pressable
            onPress={() => {
              SheetManager.show("NOTE_OPTIONS", {
                payload: item,
              });
            }}
          >
            <Ionicons name="ellipsis-vertical" size={20} color="black" />
          </Pressable>
        </View>
        <Text style={styles.itemSummary}>{item.summary}</Text>
        <Text style={styles.itemDate}>{formatDbDate(item.created_at!)}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Voice Notes</Text>
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: theme.borderRadius.full,
            width: 40,
            height: 40,
            backgroundColor: theme.colors.background.input,
          }}
          onPress={() => router.push("/profile")}
        >
          <AntDesign
            name="user"
            size={24}
            color={theme.colors.primary.DEFAULT}
          />
        </Pressable>
      </View>
      <InputField
        placeholder="Search notes"
        icon={<Ionicons name="search-outline" size={24} color="black" />}
      />
      <FlashList
        data={data || []}
        renderItem={renderItem}
        ListEmptyComponent={() => {
          return (
            <View style={styles.emptyContainer}>
              <Text style={styles.itemSummary}>No notes found</Text>
              <Text
                style={styles.toRecordText}
                onPress={() => router.push("/create")}
              >
                Create
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    paddingHorizontal: theme.spacing.s4,
    backgroundColor: theme.colors.white,
    flex: 1,
    gap: theme.spacing.s6,
  },
  title: {
    fontFamily: theme.fontFamily.heading.Roboto.bold,
    fontSize: theme.fontSize.t6,
    color: theme.colors.black,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "#171a1f14",
    padding: theme.spacing.s3,
    borderRadius: theme.spacing.s1,
    marginVertical: theme.spacing.s3,
    gap: theme.spacing.s2,
  },
  itemTitle: {
    fontFamily: theme.fontFamily.body.Montserrat.bold,
    fontSize: theme.fontSize.t4,
    color: "#171A1FFF",
  },
  itemSummary: {
    fontFamily: theme.fontFamily.body.Montserrat.regular,
    fontSize: theme.fontSize.t4,
    color: "#9095A1FF",
  },
  itemDate: {
    fontFamily: theme.fontFamily.body.Montserrat.regular,
    fontSize: theme.fontSize.t4,
    color: "#9095A1FF",
  },
  playButton: {
    borderColor: theme.colors.primary.DEFAULT,
    borderWidth: 1,
    borderRadius: theme.spacing.s1,
    alignSelf: "flex-start",
  },
  playButtonText: {
    color: theme.colors.primary.DEFAULT,
    fontFamily: theme.fontFamily.body.Montserrat.regular,
    padding: theme.spacing.s1,
    fontSize: theme.fontSize.t4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.s4,
  },
  toRecordText: {
    fontFamily: theme.fontFamily.body.Montserrat.regular,
    fontSize: theme.fontSize.t4,
    color: theme.colors.primary.DEFAULT,
    textDecorationLine: "underline",
  },
});
