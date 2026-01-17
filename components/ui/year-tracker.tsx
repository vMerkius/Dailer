import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export function YearTracker() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const colorScheme = useColorScheme();
  const daysInYear = 365;
  const squareSize = 12;
  const spacing = 6;
  const squaresPerRow = 12;

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

  const days = Array.from({ length: daysInYear }, (_, i) => i + 1);

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#f5f5f5",
              },
            ]}
          >
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <MaterialCommunityIcons name="close" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.headerContainer}>
        <View style={styles.appNameSection}>
          <ThemedText type="subtitle">Dailer</ThemedText>
          <Pressable
            style={styles.plusButton}
            onPress={() => setModalVisible(true)}
          >
            <MaterialCommunityIcons name="plus" size={28} color="white" />
          </Pressable>
        </View>
      </View>
      <View style={styles.datePickerRow}>
        <Pressable style={styles.arrowButton} onPress={handlePreviousDay}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="white" />
        </Pressable>
        <Pressable onPress={() => setShowDatePicker(true)}>
          <ThemedText type="subtitle">{formattedDate}</ThemedText>
        </Pressable>
        <Pressable style={styles.arrowButton} onPress={handleNextDay}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="white"
          />
        </Pressable>
      </View>
      <View style={styles.todayDateContainer}>
        <Pressable onPress={() => setShowDatePicker(true)}>
          <ThemedText type="default">Today</ThemedText>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gridContainer}>
          {days.map((day) => {
            const isBeforeToday = day < todayDayOfYear;
            const isCurrentDay = day === selectedDayOfYear;

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
    paddingBottom: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  datePickerRow: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  plusButton: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  appNameSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },
  todayDateContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    minHeight: "60%",
    maxHeight: "80%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
});
