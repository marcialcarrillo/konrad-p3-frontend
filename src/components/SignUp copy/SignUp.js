import { Link } from "react-router-dom";
import CheckoutDeliveryInfo from "../SingUPForm/CheckoutDeliveryInfo";

const SignUp = () => {
  const block = "sign-up";
  return (
    <main className={`${block}__root`}>
      <div className={`${block}__container`}>
        <CheckoutDeliveryInfo />
        <span>
          Already have an account? <Link to="sign-in">Sign in</Link>
        </span>
      </div>
    </main>
  );
};

export default SignUp;
