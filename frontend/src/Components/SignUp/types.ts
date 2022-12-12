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

export type SignUpWorkflowSubmitProps = {
  onSubmit: () => void;
};
