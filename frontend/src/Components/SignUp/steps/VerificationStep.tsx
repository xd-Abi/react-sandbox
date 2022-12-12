import {Button} from "primereact/button";
import {Checkbox} from "primereact/checkbox";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {useSignUpDispatch, useSignUpSelector} from "../../../hooks";
import {verificationChange, VerificationChangeType} from "../../../store/user";
import {SignUpWorkflowStepProps, SignUpWorkflowSubmitProps} from "../types";

const VerificationStep = (
  props: SignUpWorkflowStepProps & SignUpWorkflowSubmitProps
) => {
  const yupValidationSchema = yup.object<
    Record<keyof VerificationChangeType, yup.AnySchema>
  >({
    isTermsAndConditionsAccepted: yup
      .bool()
      .required("re")
      .oneOf([true], "Accept terms and conditions"),
  });

  const dispatch = useSignUpDispatch();
  const initialState = useSignUpSelector();

  const {
    handleSubmit,
    control,
    formState: {errors},
    getValues,
  } = useForm<VerificationChangeType>({
    resolver: yupResolver(yupValidationSchema),
    mode: "onChange",
    defaultValues: {
      ...initialState,
    },
  });

  const onBackButtonClick = () => {
    dispatch(
      verificationChange({
        isTermsAndConditionsAccepted: getValues("isTermsAndConditionsAccepted"),
      })
    );
    props.onBackButtonClick!();
  };

  const onSubmit = (data: VerificationChangeType) => {
    dispatch(verificationChange(data));
    props.onSubmit();
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form className="grid" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 p-0 m-0 mt-4">
          <div className="field-checkbox">
            <Controller
              control={control}
              name="isTermsAndConditionsAccepted"
              render={({field}: any) => (
                <Checkbox
                  inputId="term-and-conditions-field"
                  className={`p-inputtext-lg ${
                    errors.isTermsAndConditionsAccepted?.message
                      ? "p-invalid"
                      : ""
                  }`}
                  checked={field.value}
                  onChange={e => field.onChange(e.checked)}
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
            <Button
              label="Back"
              onClick={onBackButtonClick}
              className="mr-3 p-button-secondary"
            />
            <Button label="Create Account" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerificationStep;
