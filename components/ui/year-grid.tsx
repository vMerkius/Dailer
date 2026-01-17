import { ScrollView, StyleSheet, View } from "react-native";
import { DaySquare } from "./day-square";

interface YearGridProps {
  daysInYear: number;
  squareSize: number;
  spacing: number;
  selectedDayOfYear: number;
  todayDayOfYear: number;
}

export function YearGrid({
  daysInYear,
  squareSize,
  spacing,
  selectedDayOfYear,
  todayDayOfYear,
}: YearGridProps) {
  const days = Array.from({ length: daysInYear }, (_, i) => i + 1);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.gridContainer}>
        {days.map((day) => {
          const isBeforeToday = day < todayDayOfYear;
          const isCurrentDay = day === selectedDayOfYear;

          return (
            <DaySquare
              key={day}
              day={day}
              squareSize={squareSize}
              spacing={spacing}
              isBeforeToday={isBeforeToday}
              isCurrentDay={isCurrentDay}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
});
