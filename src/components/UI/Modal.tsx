import reactDom from 'react-dom';
import styles from './Modal.module.scss';

const Backdrop = (props: any) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props: any) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal: React.FC = (props: any) => {
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
