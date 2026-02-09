import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { ReviewDayModal, UserProfileModal } from "../modals";
import { DatePickerRow } from "./date-picker-row";
import { Header } from "./header";
import { YearGrid } from "./year-grid";

export function YearTracker() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const colorScheme = useColorScheme();

  const daysInYear = 365;
  const squareSize = 12;
  const spacing = 6;

  const today = new Date();
  const startOfYear = new Date(selectedDate.getFullYear(), 0, 1);
  const todayStartOfYear = new Date(today.getFullYear(), 0, 1);

  const selectedDayOfYear =
    Math.floor(
      (selectedDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24),
    ) + 1;
  const todayDayOfYear =
    Math.floor(
      (today.getTime() - todayStartOfYear.getTime()) / (1000 * 60 * 60 * 24),
    ) + 1;

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <View style={styles.container}>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
      <ReviewDayModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
      <UserProfileModal
        isOpen={isUserProfileModalOpen}
        onClose={() => setIsUserProfileModalOpen(false)}
      />
      <Header
        onPlusPress={() => setIsReviewModalOpen(true)}
        onUserPress={() => setIsUserProfileModalOpen(true)}
      />
      <DatePickerRow
        formattedDate={formattedDate}
        onPreviousDay={handlePreviousDay}
        onNextDay={handleNextDay}
        onDatePress={() => setShowDatePicker(true)}
      />
      <View style={styles.todayDateContainer}>
        <Pressable onPress={() => setShowDatePicker(true)}>
          <ThemedText type="default">Today</ThemedText>
        </Pressable>
      </View>
      <YearGrid
        daysInYear={daysInYear}
        squareSize={squareSize}
        spacing={spacing}
        selectedDayOfYear={selectedDayOfYear}
        todayDayOfYear={todayDayOfYear}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  todayDateContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: "center",
  },
});
