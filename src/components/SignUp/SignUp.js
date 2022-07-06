import { Link } from "react-router-dom";
import SignUpForm from "../SignUpForm/SignUpForm";

const SignUp = () => {
  const block = "sign-up";
  return (
    <main className={`${block}__root`}>
      <div className={`${block}__container`}>
        <SignUpForm />
      </div>
    </main>
  );
};

export default SignUp;
