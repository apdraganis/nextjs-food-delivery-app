import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { Meal } from '../../../pages/products';
import styles from './MealsList.module.scss';

interface MealsListProps {
  meals: Meal[];
}


const MealsList = ({ meals }: MealsListProps) => {
  const mealsList = meals.map((meal: any) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default MealsList;