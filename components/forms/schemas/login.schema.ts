import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: yup.string().trim().required("Password is required"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
