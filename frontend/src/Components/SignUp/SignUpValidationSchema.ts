import * as yup from "yup";
import SignUpFormType from "./SignUpFormType";

const SignUpValidationSchema = yup.object<
  Record<keyof SignUpFormType, yup.AnySchema>
>({
  name: yup.string().required("Name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  postcode: yup.string().required("Postcode is required"),
  country: yup.string().required("Country is required"),
  email: yup.string().required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  repeatPassword: yup
    .string()
    .required("Confirm password")
    .oneOf([yup.ref("password")], "Passwords don't match"),
  birthdate: yup.string().required("Birthdate is required"),
});

export default SignUpValidationSchema;
