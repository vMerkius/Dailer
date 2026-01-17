import { StyleSheet } from "react-native";

import { ThemedView } from "@/components/themed-view";
import { YearTracker } from "@/components/ui/year-tracker";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <YearTracker />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
