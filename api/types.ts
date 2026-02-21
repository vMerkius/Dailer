export type IUserCredentials = {
  username: string;
  password: string;
};

export type ILoginResponse = {
  message: string;
  statusCode: number;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};
