import { ThemedText } from "@/components/themed-text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

interface DatePickerRowProps {
  formattedDate: string;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onDatePress: () => void;
}

export function DatePickerRow({
  formattedDate,
  onPreviousDay,
  onNextDay,
  onDatePress,
}: DatePickerRowProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.arrowButton} onPress={onPreviousDay}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="white" />
      </Pressable>
      <Pressable onPress={onDatePress}>
        <ThemedText type="subtitle">{formattedDate}</ThemedText>
      </Pressable>
      <Pressable style={styles.arrowButton} onPress={onNextDay}>
        <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  arrowButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
