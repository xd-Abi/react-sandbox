export enum SignUpWorkflowSteps {
  PersonalInfo,
  Residence,
  AccountInfo,
  Verification,
}

export type SignUpWorkflowStepProps = {
  onBackButtonClick?: () => void;
  onNextButtonClick?: () => void;
};

export type VerificationProps = {
  onSubmit: () => void;
  onReCaptchaFailure: () => void;
};
