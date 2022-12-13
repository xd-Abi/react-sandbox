import {useState} from "react";
import {Card} from "primereact/card";
import Container from "../Container";
import AccountInfoStep from "./steps/AccountInfoStep";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import ResidenceStep from "./steps/ResidenceStep";
import VerificationStep from "./steps/VerificationStep";
import {SignUpWorkflowSteps} from "./types";
import {getSignUpState} from "../../store";
import axios from "axios";
import {BackendConfig} from "../../config";
import * as fs from "fs";

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState<SignUpWorkflowSteps>(
    SignUpWorkflowSteps.PersonalInfo
  );

  const onSubmit = async () => {
    const state = getSignUpState();

    const multipartFormData = new FormData();
    multipartFormData.append("name", state.fullname!);
    multipartFormData.append("birthdate", state.birthdate!);
    multipartFormData.append("email", state.email!);
    multipartFormData.append("phoneNumber", state.phoneNumber!);
    multipartFormData.append("address", state.address!);
    multipartFormData.append("city", state.city!);
    multipartFormData.append("postcode", state.postcode!);
    multipartFormData.append("country", state.country!);
    multipartFormData.append("username", state.username!);
    multipartFormData.append("password", state.password!);
    multipartFormData.append("idConfirmation", state.idConfirmationFile!);

    axios
      .post(
        `${BackendConfig.domain}:${BackendConfig.port}/login`,
        multipartFormData
      )
      .then(() => {
        console.log("done");
      });
  };

  return (
    <Container>
      <input type="file" onChange={e => console.log(e)} />
      <div className="grid h-screen">
        <div className="xl:col-5 lg:mt-5">
          <Card className="md:pr-5 md:pl-5 lg:pr-7 lg:pl-7 md:mt-5 lg:mt-8">
            <div>
              {currentStep === SignUpWorkflowSteps.PersonalInfo && (
                <PersonalInfoStep
                  onNextButtonClick={() =>
                    setCurrentStep(SignUpWorkflowSteps.Residence)
                  }
                />
              )}
              {currentStep === SignUpWorkflowSteps.Residence && (
                <ResidenceStep
                  onBackButtonClick={() =>
                    setCurrentStep(SignUpWorkflowSteps.PersonalInfo)
                  }
                  onNextButtonClick={() =>
                    setCurrentStep(SignUpWorkflowSteps.AccountInfo)
                  }
                />
              )}
              {currentStep === SignUpWorkflowSteps.AccountInfo && (
                <AccountInfoStep
                  onBackButtonClick={() =>
                    setCurrentStep(SignUpWorkflowSteps.Residence)
                  }
                  onNextButtonClick={() =>
                    setCurrentStep(SignUpWorkflowSteps.Verification)
                  }
                />
              )}
              {currentStep === SignUpWorkflowSteps.Verification && (
                <VerificationStep
                  onBackButtonClick={() =>
                    setCurrentStep(SignUpWorkflowSteps.AccountInfo)
                  }
                  onSubmit={onSubmit}
                />
              )}
            </div>
          </Card>
        </div>
        <div className="xl:col-6 flex justify-content-center">
          <img
            src={process.env.PUBLIC_URL + "/images/sign_up_wallpaper.svg"}
            alt="Sign Up"
            width="85%"
            className="hidden xl:block"
          />
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
