import { useColorScheme } from "@/hooks/use-color-scheme";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { RegistrationFormData, registrationSchema } from "./schemas";

interface RegistrationFormProps {
  isLoading?: boolean;
  onClose: () => void;
  onToggleForm: () => void;
}

export function RegistrationForm({
  isLoading,
  onClose,
  onToggleForm,
}: RegistrationFormProps) {
  const colorScheme = useColorScheme();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema),
    mode: "onBlur",
  });

  const password = watch("password");

  const onSubmit = (data: RegistrationFormData) => {
    console.log("Registration data:", data);
    onClose();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Text
            style={[
              styles.label,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}
          >
            Username
          </Text>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    color: colorScheme === "dark" ? "#fff" : "#000",
                    borderColor: errors.username ? "#ef4444" : "#ccc",
                  },
                ]}
                placeholder="Enter username"
                placeholderTextColor={colorScheme === "dark" ? "#999" : "#ccc"}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.username && (
            <Text style={styles.error}>{errors.username.message}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text
            style={[
              styles.label,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}
          >
            Password
          </Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    color: colorScheme === "dark" ? "#fff" : "#000",
                    borderColor: errors.password ? "#ef4444" : "#ccc",
                  },
                ]}
                placeholder="Enter password"
                placeholderTextColor={colorScheme === "dark" ? "#999" : "#ccc"}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry
              />
            )}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text
            style={[
              styles.label,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}
          >
            Confirm Password
          </Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    color: colorScheme === "dark" ? "#fff" : "#000",
                    borderColor: errors.confirmPassword ? "#ef4444" : "#ccc",
                  },
                ]}
                placeholder="Confirm password"
                placeholderTextColor={colorScheme === "dark" ? "#999" : "#ccc"}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.error}>{errors.confirmPassword.message}</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={isLoading ? "Creating Account..." : "Register"}
            onPress={handleSubmit(onSubmit)}
            color="#22C55E"
            disabled={isLoading}
          />
        </View>

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Pressable onPress={onToggleForm}>
            <Text
              style={[
                styles.link,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}
            >
              Already have an account?
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  formContainer: {
    padding: 20,
    paddingTop: 40,
    width: "100%",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  error: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 6,
  },
  buttonContainer: {
    marginTop: 30,
  },
  link: {
    textDecorationLine: "underline",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },
});
