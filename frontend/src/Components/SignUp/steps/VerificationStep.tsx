import {Button} from "primereact/button";
import {Checkbox} from "primereact/checkbox";
import {FileUpload, FileUploadHeaderTemplateType} from "primereact/fileupload";
import {Tag} from "primereact/tag";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {useSignUpDispatch, useSignUpSelector} from "../../../hooks";
import {verificationChange, VerificationChangeType} from "../../../store/user";
import {SignUpWorkflowStepProps, SignUpWorkflowSubmitProps} from "../types";
import {useRef, useState} from "react";
import axios from "axios";

const VerificationStep = (
  props: SignUpWorkflowStepProps & SignUpWorkflowSubmitProps
) => {
  const yupValidationSchema = yup.object<
    Record<keyof VerificationChangeType, yup.AnySchema>
  >({
    isTermsAndConditionsAccepted: yup
      .bool()
      .required("")
      .oneOf([true], "Accept terms and conditions"),
    idConfirmationFile: yup.string(),
  });

  const dispatch = useSignUpDispatch();
  const fileUploadRef = useRef<FileUpload>(null);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<VerificationChangeType>({
    resolver: yupResolver(yupValidationSchema),
    mode: "onChange",
  });

  const onBackButtonClick = () => {
    props.onBackButtonClick!();
  };

  const onSubmit = (data: VerificationChangeType) => {
    const file = fileUploadRef.current?.getFiles()[0]! as any;
    dispatch(
      verificationChange({
        isTermsAndConditionsAccepted: data.isTermsAndConditionsAccepted,
        idConfirmationFile: file.objectURL,
      })
    );

    props.onSubmit();
  };

  const headerTemplate = (options: any) => {
    const {className, chooseButton, uploadButton, cancelButton} = options;

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
      </div>
    );
  };

  const itemTemplate = (file: any, props: any) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center mr-4">
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => props.onRemove}
        />
      </div>
    );
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form className="grid" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 p-0 m-0 mt-4">
          <p>Upload any kind of ID to confirm the account creation</p>
          <div className="input-field">
            <Controller
              control={control}
              name="idConfirmationFile"
              render={({field}: any) => (
                <FileUpload
                  ref={fileUploadRef}
                  customUpload
                  accept="image/*"
                  maxFileSize={1000000}
                />
              )}
            />
          </div>
          {
            <p className="p-error block">
              {errors.idConfirmationFile?.message}
            </p>
          }
        </div>
        <div className="col-12 p-0 m-0 mt-6 flex justify-content-center">
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
        <div className="col-12 pt-6">
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
