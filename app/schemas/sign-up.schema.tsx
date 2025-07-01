import * as yup from "yup";

const SignUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Can't be empty")
    .min(2, "Minimum 2 characters")
    .max(30, "Maximum 30 characters")
    .matches(/^[a-zA-Z\s]+$/, "Only letters allowed"),
  lastName: yup
    .string()
    .required("Can't be empty")
    .min(2, "Minimum 2 characters")
    .max(30, "Maximum 30 characters")
    .matches(/^[a-zA-Z\s]+$/, "Only letters allowed"),
  email: yup.string().required("Can't be empty").email("It must be an e-mail"),
  password: yup
    .string()
    .required("Can't be empty")
    .min(8, "Minimum 8 characters")
    .max(20, "Maximum 20 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password must include uppercase, lowercase and number"
    ),
  country: yup
    .string()
    .required("Can't be empty")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),
  city: yup
    .string()
    .required("Can't be empty")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),
});

export default { SignUpSchema };
