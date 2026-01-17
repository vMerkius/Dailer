import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

export function YearTracker() {
  const colorScheme = useColorScheme();
  const daysInYear = 365;
  const squareSize = 12;
  const spacing = 6;
  const squaresPerRow = 12;

  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = Math.floor(
    (today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24),
  );

  const days = Array.from({ length: daysInYear }, (_, i) => i + 1);

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ThemedText type="subtitle">{formattedDate}</ThemedText>
        <Pressable style={styles.plusButton}>
          <MaterialCommunityIcons name="plus" size={32} color="white" />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gridContainer}>
          {days.map((day) => {
            const isBeforeToday = day < dayOfYear;

            return (
              <View
                key={day}
                style={[
                  styles.square,
                  {
                    width: squareSize,
                    height: squareSize,
                    margin: spacing,
                    backgroundColor: isBeforeToday
                      ? "#EF4444"
                      : colorScheme === "dark"
                        ? Colors.dark.tabIconSelected
                        : Colors.light.tabIconSelected,
                    borderRadius: 2,
                  },
                ]}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  headerContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  plusButton: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  square: {
    opacity: 0.8,
  },
});
