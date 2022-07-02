import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import styles from './MealsList.module.scss';


const MealsList = (props: any) => {
  // const [meals, setMeals] = useState<{}[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [httpError, setHttpError] = useState();
  // // Could use useReducer to handle all states

  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     const res = await fetch('');

  //     if (!res.ok) {
  //       throw new Error('Something went wrong!');
  //     }

  //     const data = await res.json();

  //     const loadedMeals = [];

  //     for (const key in data) {
  //       loadedMeals.push({
  //         id: key,
  //         name: data[key].name,
  //         description: data[key].description,
  //         price: data[key].price,
  //       });
  //     }

  //     setMeals(loadedMeals);
  //     setIsLoading(false);
  //   };

  //   fetchMeals().catch(e => {
  //     setIsLoading(false);
  //     setHttpError(e.message);
  //   })


  // }, []);

  // if (isLoading) {
  //   return (
  //     <section>
  //       <p className={styles.MealsLoading}>Loading...</p>
  //     </section>
  //   )
  // }

  // if (httpError) {
  //   return (
  //     <section>
  //       <p className={styles.MealsError}>{httpError}</p>
  //     </section>
  //   )
  // }
  const mealsList = props.meals.map((meal: any) => (
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