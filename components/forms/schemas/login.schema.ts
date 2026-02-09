import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().min(3).required("Username is required"),
  password: yup.string().min(8).required("Password is required"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
