import ReactDom from "react-dom";
import { useContext, useEffect } from "react";
import loadingContext from "../../context/LoadingContext";
//TODO
const LoadingSpinner = () => {
  const block = "spinner";
  return <div className={`${block}__root`}></div>;
};

const LoadingModal = () => {
  const { loadingModal } = useContext(loadingContext);
  const block = "loading-modal";

  useEffect(() => {
    !loadingModal
      ? document.body.classList.remove("no-scroll")
      : document.body.classList.add("no-scroll");
  }, [loadingModal]);

  return ReactDom.createPortal(
    <>
      {loadingModal && (
        <div className={`${block}__background`}>
          <div className={`${block}__root`} role="dialog" aria-modal="true">
            <LoadingSpinner />
          </div>
        </div>
      )}
    </>,
    document.getElementById("portal")
  );
};

export default LoadingModal;
