import ReactDom from "react-dom";
import { useContext, useEffect } from "react";
import modalContext from "../../context/ModalContext";
import { ReactComponent as Cross } from "../../assets/icons/cross.svg";

const Modal = () => {
  const { modalState, setModalState } = useContext(modalContext);
  const block = "modal";

  useEffect(() => {
    !modalState
      ? document.body.classList.remove("no-scroll")
      : document.body.classList.add("no-scroll");
  }, [modalState]);

  return ReactDom.createPortal(
    <>
      {modalState && (
        <div className={`${block}__background`}>
          <div className={`${block}__root`} role="dialog" aria-modal="true">
            <div className={`${block}__header`}>
              <h1 className={`${block}__title--h1`}>{modalState.title ? modalState.title : "Error" }</h1>
              <button
                className={`${block}__btn-close`}
                onClick={() => setModalState(null)}
              >
                <Cross />
              </button>
            </div>
            <div className={`${block}__body`}>
              <p>{modalState.message}</p>
            </div>
            <div className={`${block}__footer`}>
              <button
                className={`${block}__button`}
                onClick={() => setModalState(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
