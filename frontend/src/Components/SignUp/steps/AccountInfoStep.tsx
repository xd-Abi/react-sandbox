import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {useSignUpDispatch, useSignUpSelector} from "../../../hooks";
import {accountInfoChange, AccountInfoChangeType} from "../../../store/user";
import {SignUpWorkflowStepProps} from "../types";

const AccountInfoStep = (props: SignUpWorkflowStepProps) => {
  const yupValidationSchema = yup.object<
    Record<keyof AccountInfoChangeType, yup.AnySchema>
  >({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: yup
      .string()
      .required("Confirm your password")
      .oneOf([yup.ref("password")], "Passwords don't match"),
  });

  const dispatch = useSignUpDispatch();
  const initialState = useSignUpSelector();

  const {
    handleSubmit,
    register,
    control,
    formState: {errors},
    getValues,
  } = useForm<AccountInfoChangeType>({
    resolver: yupResolver(yupValidationSchema),
    mode: "onChange",
    defaultValues: {
      ...initialState,
    },
  });

  const onBackButtonClick = () => {
    dispatch(
      accountInfoChange({
        username: getValues("username"),
        password: getValues("password"),
        confirmPassword: getValues("confirmPassword"),
      })
    );
    props.onBackButtonClick!();
  };

  const onSubmit = (data: AccountInfoChangeType) => {
    dispatch(accountInfoChange(data));
    props.onNextButtonClick!();
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form className="grid" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 p-0 m-0">
          <p>Username</p>
          <div className="p-inputgroup">
            <InputText
              className={`p-inputtext-lg ${
                errors.username?.message ? "p-invalid" : ""
              }`}
              {...register("username")}
            />
          </div>
          {<p className="p-error block">{errors.username?.message}</p>}
        </div>
        <div className="col-12 p-0 m-0">
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
                  toggleMask
                  onChange={e => field.onChange(e.target.value)}
                  value={field.value}
                />
              )}
            />
          </div>
          {<p className="p-error block">{errors.password?.message}</p>}
        </div>
        <div className="col-12 p-0 m-0">
          <p>Confirm Password</p>
          <div className="p-inputgroup">
            <Controller
              control={control}
              name="confirmPassword"
              render={({field}: any) => (
                <Password
                  className={`p-inputtext-lg ${
                    errors.confirmPassword?.message ? "p-invalid" : ""
                  }`}
                  toggleMask
                  onChange={e => field.onChange(e.target.value)}
                  value={field.value}
                />
              )}
            />
          </div>
          {<p className="p-error block">{errors.confirmPassword?.message}</p>}
        </div>
        <div className="col-12 pt-3">
          <div className="flex justify-content-center">
            <Button
              label="Back"
              onClick={onBackButtonClick}
              className="mr-3 p-button-secondary"
            />
            <Button label="Continue" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountInfoStep;
