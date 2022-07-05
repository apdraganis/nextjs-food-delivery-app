import { ReactNode } from 'react';
import reactDom from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Backdrop = (props: { onClose: () => void }) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props: { children: ReactNode }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props: ModalProps) => {
  return (
    <>
      {reactDom.createPortal(<Backdrop onClose={props.onClose} />, document.querySelector("#portal")!)}
      {reactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.querySelector("#portal")!
      )}
    </>
  );
};

export default Modal;
