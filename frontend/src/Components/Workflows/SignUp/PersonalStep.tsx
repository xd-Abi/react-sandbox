import {yupResolver} from "@hookform/resolvers/yup";
import {InputText} from "primereact/inputtext";
import {useForm} from "react-hook-form";
import * as yup from "yup";

import {Button} from "primereact/button";
import PersonalStepType from "./Types/PersonalStepType";
import {Calendar} from "primereact/calendar";

type PersonalStepProps = {
  onSubmit: (data: PersonalStepType) => void;
};

const PersonalStep = (props: PersonalStepProps) => {
  const phoneRegexPattern =
    /^$|^(?:(?:|0{1,2}|\+{0,2})41(?:|\(0\))|0)([1-9]\d)(\d{3})(\d{2})(\d{2})$/g;

  const yupValidationSchema = yup.object<
    Record<keyof PersonalStepType, yup.AnySchema>
  >({
    name: yup
      .string()
      .required("Name is required")
      .max(255, "Full name must be under 255 characters"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(phoneRegexPattern, "Invalid phone number"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    birthdate: yup
      .date()
      .required("Birthdate is required")
      .max(
        new Date(Date.now() - 567648000000),
        "You must be at least 18 years old"
      )
      .typeError("The value must be a date"),
  });

  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<PersonalStepType>({
    resolver: yupResolver(yupValidationSchema),
    mode: "onChange",
  });

  return (
    <form className="grid" onSubmit={handleSubmit(props.onSubmit)}>
      <div className="col-12 p-0 m-0">
        <p>Fullname</p>
        <div className="p-inputgroup">
          <InputText
            className={`p-inputtext-lg ${
              errors.name?.message ? "p-invalid" : ""
            }`}
            {...register("name")}
          />
        </div>
        {<p className="p-error block">{errors.name?.message}</p>}
      </div>
      <div className="col-12 p-0 m-0">
        <p>Date of Birth</p>
        <div className="p-inputgroup">
          <Calendar
            className={`p-inputtext-lg ${
              errors.birthdate?.message ? "p-invalid" : ""
            }`}
            {...register("birthdate")}
          />
        </div>
        {<p className="p-error block">{errors.birthdate?.message}</p>}
      </div>
      <div className="col-12 p-0 m-0">
        <p>Email</p>
        <div className="p-inputgroup">
          <InputText
            className={`p-inputtext-lg ${
              errors.email?.message ? "p-invalid" : ""
            }`}
            {...register("email")}
          />
        </div>
        {<p className="p-error block">{errors.email?.message}</p>}
      </div>
      <div className="col-12 p-0 m-0">
        <p>Phone Number</p>
        <div className="p-inputgroup">
          <InputText
            className={`p-inputtext-lg ${
              errors.phoneNumber?.message ? "p-invalid" : ""
            }`}
            {...register("phoneNumber")}
          />
        </div>
        {<p className="p-error block">{errors.phoneNumber?.message}</p>}
      </div>

      <div className="col-12">
        <div className="flex justify-content-center">
          <Button icon="pi pi-check" label="Continue" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default PersonalStep;
