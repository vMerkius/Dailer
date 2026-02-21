import * as SecureStore from "expo-secure-store";

const KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  EXPIRES_IN: "expiresIn",
} as const;

export type TokenPayload = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export async function setTokens(payload: TokenPayload): Promise<void> {
  await SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, payload.accessToken);
  await SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, payload.refreshToken);
  await SecureStore.setItemAsync(
    KEYS.EXPIRES_IN,
    String(payload.expiresIn),
  );
}

export async function getAccessToken(): Promise<string | null> {
  return SecureStore.getItemAsync(KEYS.ACCESS_TOKEN);
}

export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(KEYS.REFRESH_TOKEN);
}

export async function getExpiresIn(): Promise<number | null> {
  const value = await SecureStore.getItemAsync(KEYS.EXPIRES_IN);
  if (value == null) return null;
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? null : n;
}

export async function clearTokens(): Promise<void> {
  await SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN);
  await SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN);
  await SecureStore.deleteItemAsync(KEYS.EXPIRES_IN);
}
