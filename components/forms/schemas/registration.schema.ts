import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  username: yup.string().min(3).required("Username is required"),
  password: yup.string().min(8).required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
