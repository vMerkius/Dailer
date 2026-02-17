import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { LoginForm, RegistrationForm } from "../forms";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const colorScheme = useColorScheme();
  const [showRegistration, setShowRegistration] = useState(false);

  const toggleForm = () => {
    setShowRegistration((prev) => !prev);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <Pressable style={styles.centeredView} onPress={() => {}}>
        <View
          style={[
            styles.modalView,
            {
              backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#f5f5f5",
            },
          ]}
        >
          <Pressable style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="white" />
          </Pressable>
          <ScrollView
            style={styles.formScroll}
            showsVerticalScrollIndicator={false}
          >
            {showRegistration ? (
              <RegistrationForm onToggleForm={toggleForm} onClose={onClose} />
            ) : (
              <LoginForm onToggleForm={toggleForm} onClose={onClose} />
            )}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    minHeight: "100%",
    maxHeight: "100%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  formScroll: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
});
