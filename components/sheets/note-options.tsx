import { deleteVoiceNote } from "@/supabase-api/api";
import { theme } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { View, Text, Pressable } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";

export const noteOptions = (props: SheetProps<"NOTE_OPTIONS">) => {
  const { payload } = props;
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: deleteVoiceNote,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const deleteNote = async () => {
    if (payload && payload.id) {
      deleteNoteMutation.mutateAsync(payload.id);
      SheetManager.hide(props.sheetId);
    }
  };

  return (
    <ActionSheet
      containerStyle={{
        height: "50%",
        paddingHorizontal: theme.spacing.s6,
        paddingVertical: theme.spacing.s8,
      }}
      id={props.sheetId}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={deleteNote}
      >
        <MaterialIcons
          name="delete-outline"
          size={24}
          color={theme.colors.danger.DEFAULT}
        />
        <Text
          style={{
            fontFamily: theme.fontFamily.body.Montserrat.semiBold,
            fontSize: theme.fontSize.t5,
          }}
        >
          Delete
        </Text>
      </Pressable>
    </ActionSheet>
  );
};
