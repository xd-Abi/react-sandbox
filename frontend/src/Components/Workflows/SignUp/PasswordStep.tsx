import {yupResolver} from "@hookform/resolvers/yup";
import {InputText} from "primereact/inputtext";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {Password} from "primereact/password";

import PasswordStepType from "./Types/PasswordStepType";
import {Button} from "primereact/button";

type PasswordStepProps = {
  onSubmit: (data: PasswordStepType) => void;
};

const PasswordStep = (props: PasswordStepProps) => {
  const yupValidationSchema = yup.object<
    Record<keyof PasswordStepType, yup.AnySchema>
  >({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    repeatPassword: yup
      .string()
      .required("Confirm your password")
      .oneOf([yup.ref("password")], "Passwords don't match"),
  });

  const {
    handleSubmit,
    control,
    register,
    formState: {errors},
  } = useForm<PasswordStepType>({
    resolver: yupResolver(yupValidationSchema),
    mode: "onChange",
  });

  return (
    <form className="grid" onSubmit={handleSubmit(props.onSubmit)}>
      <div className="col-12">
        <p>Password</p>
        <div className="p-inputgroup">
          <Controller
            control={control}
            name="password"
            render={({field}: any) => (
              <Password
                className={`p-inputtext-lg ${
                  errors.password?.message ? "p-invalid" : ""
                }`}
                {...field}
              />
            )}
          />
        </div>
        {<p className="p-error block">{errors.password?.message}</p>}
      </div>
      <div className="col-12">
        <p>Confirm Password</p>
        <div className="p-inputgroup">
          <InputText
            className={`p-inputtext-lg ${
              errors.repeatPassword?.message ? "p-invalid" : ""
            }`}
            {...register("repeatPassword")}
          />
        </div>
        {<p className="p-error block">{errors.repeatPassword?.message}</p>}
      </div>
      <div className="col-12">
        <div className="flex justify-content-center">
          <Button icon="pi pi-check" label="Continue" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default PasswordStep;
