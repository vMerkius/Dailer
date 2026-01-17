import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, View } from "react-native";

interface DaySquareProps {
  day: number;
  squareSize: number;
  spacing: number;
  isBeforeToday: boolean;
  isCurrentDay: boolean;
}

export function DaySquare({
  day,
  squareSize,
  spacing,
  isBeforeToday,
  isCurrentDay,
}: DaySquareProps) {
  const colorScheme = useColorScheme();

  return (
    <View
      key={day}
      style={[
        styles.square,
        {
          width: squareSize,
          height: squareSize,
          margin: spacing,
          backgroundColor: isCurrentDay
            ? "#3B82F6"
            : isBeforeToday
              ? "#EF4444"
              : colorScheme === "dark"
                ? Colors.dark.tabIconSelected
                : Colors.light.tabIconSelected,
          borderRadius: 2,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  square: {
    opacity: 0.8,
  },
});
