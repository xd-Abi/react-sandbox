import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import {Container, FormCalendar, FormDropdown, FormField} from "../Utility";
import SignUpFormType from "./SignUpFormType";
import SignUpValidationSchema from "./SignUpValidationSchema";

const SignUp = () => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<SignUpFormType>({
    resolver: yupResolver(SignUpValidationSchema),
    mode: "onChange",
  });

  return (
    <Container>
      <Card className="md:pr-5 md:pl-5 lg:pr-7 lg:pl-7">
        <h1 className="mb-5">Sign Up</h1>
        <form className="grid">
          <div className="col-12 md:col-6">
            <FormField
              id="name"
              label="Full Name"
              required
              control={control}
              error={errors.name?.message}
            />
          </div>
          <div className="col-12 md:col-6">
            <FormField
              id="username"
              label="Username"
              required
              control={control}
              error={errors.username?.message}
            />
          </div>
          <div className="col-12 md:col-6">
            <FormField
              id="email"
              label="Email"
              required
              control={control}
              error={errors.email?.message}
            />
          </div>
          <div className="col-12 md:col-6">
            <FormCalendar
              id="birthdate"
              label="Date of Birth"
              required
              control={control}
              error={errors.birthdate?.message}
            />
          </div>
          <Divider align="center">
            <span className="p-tag">Residence</span>
          </Divider>
          <div className="col-12 md:col-6">
            <FormField
              id="address"
              label="Address"
              required
              control={control}
              error={errors.address?.message}
            />
          </div>
          <div className="col-12 md:col-6">
            <FormField
              id="city"
              label="City"
              required
              control={control}
              error={errors.city?.message}
            />
          </div>
          <div className="col-12 md:col-6">
            <FormField
              id="postcode"
              label="Postcode"
              required
              control={control}
              error={errors.postcode?.message}
            />
          </div>
          <div className="col-12 md:col-6">
            <FormDropdown
              id="country"
              label="Country"
              required
              control={control}
              options={[
                {label: "Australia", value: "AU"},
                {label: "Brazil", value: "BR"},
                {label: "China", value: "CN"},
                {label: "Egypt", value: "EG"},
                {label: "France", value: "FR"},
                {label: "Germany", value: "DE"},
                {label: "India", value: "IN"},
                {label: "Japan", value: "JP"},
                {label: "Spain", value: "ES"},
                {label: "United States", value: "US"},
              ]}
              error={errors.country?.message}
            />
          </div>
          <Divider align="center">
            <span className="p-tag">Password</span>
          </Divider>
          <div className="col-12 md:col-6">
            <FormField
              id="password"
              label="Password"
              required
              control={control}
              error={errors.password?.message}
            />
          </div>
          <div className="col-12 md:col-6">
            <FormField
              id="repeatPassword"
              label="Comfirm Password"
              required
              control={control}
              error={errors.repeatPassword?.message}
            />
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default SignUp;
