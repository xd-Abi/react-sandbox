import {Container} from "../Utility";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <Container>
      <div className="grid">
        <div className="xl:col-6">
          <SignUpForm />
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
