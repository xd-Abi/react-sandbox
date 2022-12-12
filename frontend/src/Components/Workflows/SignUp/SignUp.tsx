import {useState} from "react";
import PasswordStep from "./PasswordStep";
import SignUpFormType from "./Types/SignUpFormType";
import PasswordStepType from "./Types/PasswordStepType";
import {Container} from "../../Utility";
import {Card} from "primereact/card";
import PersonalStep from "./PersonalStep";
import PersonalStepType from "./Types/PersonalStepType";

const SignUp = () => {
  enum SignUpWorkflowStep {
    Personal,
    Residence,
    Password,
    AccountCreation,
  }

  const [formState, setFormState] = useState<SignUpFormType>();
  const [currentStep, setCurrentStep] = useState<SignUpWorkflowStep>(
    SignUpWorkflowStep.Personal
  );

  const onPersonalStepSubmit = (data: PersonalStepType) => {
    setFormState({
      ...data,
      ...formState,
    } as SignUpFormType);

    setCurrentStep(SignUpWorkflowStep.Password);
  };

  return (
    <Container>
      <div className="grid">
        <div className="xl:col-5">
          <Card className="md:pr-5 md:pl-5 lg:pr-7 lg:pl-7">
            <h1 className="mb-5">Sign Up</h1>
            {currentStep === SignUpWorkflowStep.Personal && (
              <PersonalStep onSubmit={onPersonalStepSubmit} />
            )}
            {currentStep === SignUpWorkflowStep.Password && (
              <PasswordStep onSubmit={(e: PasswordStepType) => {}} />
            )}
          </Card>
        </div>
        <div className="xl:col-6 flex justify-content-center">
          <img
            src={process.env.PUBLIC_URL + "/images/sign_up_wallpaper.svg"}
            alt="Sign Up"
            width="80%"
            className="hidden xl:block"
          />
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
