import styles from './Card.module.scss';

const Card = (props: { children: React.ReactNode }) => {
  return <div className={styles.card}>{props.children}</div>
};

export default Card;