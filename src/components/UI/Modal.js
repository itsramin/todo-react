import style from "./Modal.module.css";
import ReactDom from "react-dom";

const Backdrop = (props) => {
  return <div className={style.backdrop} onClick={props.onCloseError}></div>;
};
const ModalOverlay = (props) => {
  return <div className={style["modal"]}>{props.children}</div>;
};

const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onCloseError={props.onCloseError} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDom.createPortal(
        <ModalOverlay onCloseError={props.onCloseError}>
          {props.children}
        </ModalOverlay>,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default Modal;
