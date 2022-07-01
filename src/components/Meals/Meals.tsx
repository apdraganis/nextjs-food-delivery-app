import MealsList from './MealsList';
import styles from './Meals.module.scss';

const Meals = (props: any) => {
  return (
    <section className={styles.meals}>
      <MealsList meals={props.meals} />
    </section>
  );
};

export default Meals;
