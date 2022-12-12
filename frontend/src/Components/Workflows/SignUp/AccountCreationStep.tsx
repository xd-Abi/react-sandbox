import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";

import AccountCreationStepType from "./Types/AccountCreationStepType";

type AccountCreationStepProps = {
  onSubmit: (data: AccountCreationStepType) => void;
};

const AccountCreationStep = (props: AccountCreationStepProps) => {
  const yupValidationSchema = yup.object<
    Record<keyof AccountCreationStepType, yup.AnySchema>
  >({
    username: yup.string().required("Username is required"),
    isTermsAndConditionChecked: yup
      .boolean()
      .required()
      .oneOf([true], "Accept Terms and conditions"),
  });

  const {
    handleSubmit,
    control,
    register,
    formState: {errors},
  } = useForm<AccountCreationStepType>({
    resolver: yupResolver(yupValidationSchema),
    mode: "onChange",
  });

  return (
    <form className="grid" onSubmit={handleSubmit(props.onSubmit)}>
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
      <div className="col-12 p-0 m-0 mt-4">
        <div className="field-checkbox">
          <Controller
            control={control}
            name="isTermsAndConditionChecked"
            render={({field}: any) => (
              <Checkbox
                inputId="term-and-conditions-field"
                value="New York"
                className={`p-inputtext-lg ${
                  errors.isTermsAndConditionChecked?.message ? "p-invalid" : ""
                }`}
                checked={field.value}
                onChange={field.onChange}
                {...field}
              />
            )}
          />
          <label
            htmlFor="term-and-conditions-field"
            className="p-checkbox-label"
          >
            I agree to the terms and conditions
          </label>
        </div>
      </div>
      <div className="col-12 pt-3">
        <div className="flex justify-content-center">
          <Button icon="pi pi-check" label="Continue" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default AccountCreationStep;
