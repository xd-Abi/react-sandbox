import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Button} from "primereact/button";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import {FormCalendar, FormDropdown, FormField} from "../Utility";
import SignUpFormType from "./SignUpFormType";
import {useEffect, useState} from "react";
import {IDropdownOptions} from "../Utility/FormDropdown";
import * as CountryList from "country-list";

const phoneRegexPattern =
  /^$|^(?:(?:|0{1,2}|\+{0,2})41(?:|\(0\))|0)([1-9]\d)(\d{3})(\d{2})(\d{2})$/g;

const SignUpForm = () => {
  const [contryOptions, setCountryOptions] = useState<IDropdownOptions>();

  const yupValidationSchema = yup.object<
    Record<keyof SignUpFormType, yup.AnySchema>
  >({
    name: yup
      .string()
      .required("Name is required")
      .max(255, "Full name must be under 255 characters"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(phoneRegexPattern, "Invalid phone number"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    postcode: yup.string().required("Postcode is required"),
    country: yup.string().required("Country is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    username: yup
      .string()
      .required("Username is required")
      .max(25, "Username must be under 25 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    repeatPassword: yup
      .string()
      .required("Confirm password")
      .oneOf([yup.ref("password")], "Passwords don't match"),
    birthdate: yup.string().required("Birthdate is required"),
  });

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<SignUpFormType>({
    resolver: yupResolver(yupValidationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    let options = [] as IDropdownOptions;
    for (let country of CountryList.getData()) {
      options.push({label: country.name, value: country.code});
    }

    setCountryOptions(options);
  }, []);

  const onSubmit = () => {};

  return (
    <Card className="md:pr-5 md:pl-5 lg:pr-7 lg:pl-7">
      <h1 className="mb-5">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <div className="col-12 md:col-6 mt-2">
            <FormField
              id="name"
              label="Full Name"
              required
              control={control}
              error={errors.name?.message}
            />
          </div>
          <div className="col-12 md:col-6 mt-2">
            <FormField
              id="username"
              label="Username"
              required
              control={control}
              error={errors.username?.message}
            />
          </div>
          <div className="col-12 md:col-6 mt-2">
            <FormField
              id="email"
              label="Email"
              required
              control={control}
              error={errors.email?.message}
            />
          </div>
          <div className="col-12 md:col-6 mt-2">
            <FormCalendar
              id="birthdate"
              label="Date of Birth"
              required
              control={control}
              error={errors.birthdate?.message}
            />
          </div>
          <div className="col-12 md:col-6 mt-2">
            <FormField
              id="phoneNumber"
              label="Phone Number"
              required
              control={control}
              error={errors.phoneNumber?.message}
            />
          </div>
          <Divider align="center">
            <span className="p-tag">Residence</span>
          </Divider>
          <div className="col-12 md:col-6 mt-2">
            <FormField
              id="address"
              label="Address"
              required
              control={control}
              error={errors.address?.message}
            />
          </div>
          <div className="col-12 md:col-6 mt-2">
            <FormField
              id="city"
              label="City"
              required
              control={control}
              error={errors.city?.message}
            />
          </div>
          <div className="col-12 md:col-6 mt-2">
            <FormField
              id="postcode"
              label="Postcode"
              required
              control={control}
              error={errors.postcode?.message}
            />
          </div>
          <div className="col-12 md:col-6 mt-2">
            <FormDropdown
              id="country"
              label="Country"
              required
              control={control}
              options={contryOptions ?? []}
              error={errors.country?.message}
            />
          </div>
          <Divider align="center">
            <span className="p-tag">Password</span>
          </Divider>
          <div className="col-12 md:col-6 mt-2">
            <FormField
              id="password"
              label="Password"
              required
              control={control}
              error={errors.password?.message}
            />
          </div>
          <div className="col-12 md:col-6 mt-2">
            <FormField
              id="repeatPassword"
              label="Comfirm Password"
              required
              control={control}
              error={errors.repeatPassword?.message}
            />
          </div>
        </div>
        <div className="flex justify-content-center mt-5">
          <Button icon="pi pi-check" label="Continue" type="submit" />
        </div>
      </form>
    </Card>
  );
};

export default SignUpForm;
