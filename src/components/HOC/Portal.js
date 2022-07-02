import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from '../UI/Modal.module.scss';

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Portal = (props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted
    ? (
      <>
        {createPortal(<Backdrop onClose={props.onClose} />,
          document.querySelector("#portal"))}
        {createPortal(<ModalOverlay>{props.children}</ModalOverlay>,
          document.querySelector("#portal"))}
      </>
    )
    : null
}

export default Portal