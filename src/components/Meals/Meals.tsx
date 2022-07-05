import MealsList from './MealsList';
import styles from './Meals.module.scss';
import { Meal } from '../../../pages/products/index'


interface MealsProps {
  meals: Meal[];
}

const Meals = ({ meals }: MealsProps) => {
  return (
    <section className={styles.meals}>
      <MealsList meals={meals} />
    </section>
  );
};

export default Meals;
