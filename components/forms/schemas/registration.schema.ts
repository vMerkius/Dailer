import * as yup from "yup";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const PASSWORD_REQUIREMENTS =
  "At least 8 characters, one uppercase, one lowercase, one number, one of @$!%*?&";

export const registrationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .matches(PASSWORD_REGEX, PASSWORD_REQUIREMENTS),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
