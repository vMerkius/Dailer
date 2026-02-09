import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { LoginForm, RegistrationForm } from "../forms";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  showRegistration?: boolean;
}

export function UserProfileModal({
  showRegistration = true,
  isOpen,
  onClose,
}: UserProfileModalProps) {
  const colorScheme = useColorScheme();

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
              <RegistrationForm
                onSubmit={(data) => {
                  console.log("Registration data:", data);
                  onClose();
                }}
              />
            ) : (
              <LoginForm
                onSubmit={(data) => {
                  console.log("Login data:", data);
                  onClose();
                }}
              />
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
