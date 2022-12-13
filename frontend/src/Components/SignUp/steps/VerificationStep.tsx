import {Button} from "primereact/button";
import {Checkbox} from "primereact/checkbox";
import {FileUpload} from "primereact/fileupload";
import {Tag} from "primereact/tag";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";

import {useSignUpDispatch} from "../../../hooks";
import {verificationChange, VerificationChangeType} from "../../../store/user";
import {SignUpWorkflowStepProps, VerificationProps} from "../types";
import {useRef} from "react";
import {ErrorOption} from "react-hook-form/dist/types";
import axios from "axios";
import {ReCaptchaConfig} from "../../../config";

const VerificationStep = (
  props: SignUpWorkflowStepProps & VerificationProps
) => {
  const yupValidationSchema = yup.object<
    Record<keyof VerificationChangeType, yup.AnySchema>
  >({
    isTermsAndConditionsAccepted: yup
      .bool()
      .required("")
      .oneOf([true], "Accept terms and conditions"),
    idConfirmationFile: yup.string().optional(),
  });

  const dispatch = useSignUpDispatch();
  const fileUploadRef = useRef<FileUpload>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    handleSubmit,
    control,
    setError,
    formState: {errors},
  } = useForm<VerificationChangeType>({
    resolver: yupResolver(yupValidationSchema),
    mode: "onChange",
    defaultValues: {
      isTermsAndConditionsAccepted: false,
    },
  });

  const validateRecaptchaToken = async () => {
    const token = await recaptchaRef.current!.executeAsync();

    const result = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      {},
      {
        params: {
          secret: ReCaptchaConfig.secret,
          response: token,
        },
      }
    );

    if (result.data.success) {
      return true;
    }

    return false;
  };

  const validateFileUpload = () => {
    const file = fileUploadRef.current?.getFiles()[0]!;

    if (file === undefined) {
      setError("idConfirmationFile", {
        message: "Upload a file to confirm your identity",
      } as ErrorOption);
      return;
    }
    const supportedFileTypes = ["image/jpeg", "image/jpg", "application/pdf"];

    // TODO: Check the mimetype of the file using binary
    if (!supportedFileTypes.includes(file.type)) {
      setError("idConfirmationFile", {
        message:
          "File type is not supported. Supported file types are jpeg, jpg and pdf. ",
      } as ErrorOption);

      return false;
    }

    return true;
  };

  const onSubmit = async (data: VerificationChangeType) => {
    if ((await validateRecaptchaToken()) === false) {
      props.onReCaptchaFailure();
      return;
    }

    if (validateFileUpload() === false) {
      return;
    }

    dispatch(
      verificationChange({
        isTermsAndConditionsAccepted: data.isTermsAndConditionsAccepted,
        idConfirmationFile: fileUploadRef.current?.getFiles()[0]!,
      })
    );
    props.onSubmit();
  };

  const headerTemplate = (options: any) => {
    const {className, chooseButton} = options;

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
      </div>
    );
  };

  return (
    <div>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={ReCaptchaConfig.siteKey}
        size="invisible"
      />
      <h1>Sign Up</h1>
      <form className="grid" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 p-0 m-0 mt-4">
          <p>Upload any kind of ID to confirm the account creation</p>
          <div className="input-field">
            <Controller
              control={control}
              name="isTermsAndConditionsAccepted"
              render={({field}: any) => (
                <FileUpload
                  ref={fileUploadRef}
                  customUpload
                  accept="image/*"
                  maxFileSize={1000000}
                  headerTemplate={headerTemplate}
                  itemTemplate={itemTemplate}
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
              onClick={() => props.onBackButtonClick!()}
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
