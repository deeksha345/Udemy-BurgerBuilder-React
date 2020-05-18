import React from 'react';
import classes from './Burger.css';
import Ingredient from './Ingredient/Ingredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
            return (
                <Ingredient 
                    key={ingredientKey + index}
                    type={ingredientKey}
                />
            );
        });
    }).reduce((transformedIngredients, ele) => {
        return transformedIngredients.concat(ele);
    }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <Ingredient type="breadTop" />
            {transformedIngredients}
            <Ingredient type="breadBottom" />
        </div>
    );
}

export default burger;