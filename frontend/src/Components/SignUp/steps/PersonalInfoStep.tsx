import {InputText} from "primereact/inputtext";
import {Calendar, CalendarChangeParams} from "primereact/calendar";
import {Button} from "primereact/button";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {SignUpWorkflowStepProps} from "../types";
import {personalInfoChange, PersonalInfoChangeType} from "../../../store/user";
import {useSignUpDispatch, useSignUpSelector} from "../../../hooks";

const PersonalInfoStep = (props: SignUpWorkflowStepProps) => {
  const phoneRegexPattern =
    /^$|^(?:(?:|0{1,2}|\+{0,2})41(?:|\(0\))|0)([1-9]\d)(\d{3})(\d{2})(\d{2})$/g;

  const yupValidationSchema = yup.object<
    Record<keyof PersonalInfoChangeType, yup.AnySchema>
  >({
    fullname: yup
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

  const dispatch = useSignUpDispatch();
  const initialState = useSignUpSelector();

  const {
    handleSubmit,
    register,
    control,
    formState: {errors},
  } = useForm<PersonalInfoChangeType>({
    resolver: yupResolver(yupValidationSchema),
    mode: "onChange",
    defaultValues: {
      fullname: initialState.fullname,
      birthdate: initialState.birthdate,
      email: initialState.email,
      phoneNumber: initialState.phoneNumber,
    },
  });

  const onSubmit = (data: PersonalInfoChangeType) => {
    dispatch(personalInfoChange(data));

    props.onNextButtonClick!();
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form className="grid" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12">
          <p>Fullname</p>
          <div className="p-inputgroup">
            <InputText
              className={`p-inputtext-lg ${
                errors.fullname?.message ? "p-invalid" : ""
              }`}
              {...register("fullname")}
            />
          </div>
          {<p className="p-error block">{errors.fullname?.message}</p>}
        </div>
        <div className="col-12">
          <p>Date of Birth</p>
          <div className="p-inputgroup">
            <Controller
              control={control}
              name="birthdate"
              render={({field}: any) => (
                <Calendar
                  className={`p-inputtext-lg ${
                    errors.birthdate?.message ? "p-invalid" : ""
                  }`}
                  onChange={(e: CalendarChangeParams) =>
                    field.onChange(e.target.value)
                  }
                  value={field.value !== undefined ? field.value : null}
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>
          {<p className="p-error block">{errors.birthdate?.message}</p>}
        </div>
        <div className="col-12">
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
        <div className="col-12">
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
        <div className="col-12 pt-3">
          <div className="flex justify-content-center">
            <Button label="Continue" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoStep;
