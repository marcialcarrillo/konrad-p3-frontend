import ReactDom from "react-dom";
import { useContext, useEffect } from "react";
import loadingContext from "../../context/LoadingContext";
import loading from "../../assets/icons/loading.gif";

const LoadingSpinner = () => {
  const block = "spinner";
  return <div></div>;
};

const LoadingModal = () => {
  const { loadingModal, setLoadingModal } = useContext(loadingContext);
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
            <img
              src={loading}
              alt="loading animated"
              className="spinner__image"
            ></img>
          </div>
        </div>
      )}
    </>,
    document.getElementById("portal")
  );
};

export default LoadingModal;
