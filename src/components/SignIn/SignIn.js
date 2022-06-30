import { Link } from "react-router-dom";
import CheckoutDeliveryInfo from "../SingUPForm/SingUpForm";

const SignIn = () => {
  const block = "sign-in";
  return (
    <main className={`${block}__root`}>
      <div className={`${block}__container`}>
        <p>Sing IN PAGE</p>
        <span>
          Don't have an account yet? <Link to="/sign-up">Sign Up!</Link>
        </span>
      </div>
    </main>
  );
};

export default SignIn;
