import { ThemedText } from "@/components/themed-text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

interface HeaderProps {
  onPlusPress: () => void;
}

export function Header({ onPlusPress }: HeaderProps) {
  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">Dailer</ThemedText>
      <Pressable style={styles.plusButton} onPress={onPlusPress}>
        <MaterialCommunityIcons name="plus" size={28} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  plusButton: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
  },
});
