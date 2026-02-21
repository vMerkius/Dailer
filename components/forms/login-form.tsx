import { loginUser } from "@/api";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { setTokens } from "@/lib/token-storage";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LoginFormData, loginSchema } from "./schemas";

interface LoginFormProps {
  onClose: () => void;
  onToggleForm: () => void;
}

function getErrorMessage(error: unknown): string {
  if (isAxiosError(error) && error.response?.data?.message) {
    return String(error.response.data.message);
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong. Try again.";
}

export function LoginForm({ onClose, onToggleForm }: LoginFormProps) {
  const colorScheme = useColorScheme();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      await setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
      });
      console.log("[Auth] Tokens saved:", {
        message: data.message,
        statusCode: data.statusCode,
        hasAccessToken: !!data.accessToken,
        hasRefreshToken: !!data.refreshToken,
        expiresIn: data.expiresIn,
      });
      onClose();
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
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
          <View style={styles.passwordRow}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
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
                  secureTextEntry={!showPassword}
                />
              )}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setShowPassword((prev) => !prev)}
              hitSlop={8}
            >
              <MaterialIcons
                name={showPassword ? "visibility-off" : "visibility"}
                size={24}
                color={colorScheme === "dark" ? "#9BA1A6" : "#687076"}
              />
            </Pressable>
          </View>
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}
        </View>

        {loginMutation.isError && (
          <View style={styles.apiErrorContainer}>
            <Text style={styles.error}>
              {getErrorMessage(loginMutation.error)}
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title={loginMutation.isPending ? "Logging in..." : "Login"}
            onPress={handleSubmit(onSubmit)}
            color="#22C55E"
            disabled={loginMutation.isPending}
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
              Don&apos;t have an account?
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
  passwordRow: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    paddingRight: 48,
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    padding: 4,
  },
  error: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 6,
  },
  apiErrorContainer: {
    marginBottom: 12,
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
