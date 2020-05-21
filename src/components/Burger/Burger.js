import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Burger.css';
import Ingredient from './Ingredient/Ingredient';

const burger = (props) => {
    // since burger is not a comp that gets loaded directly through a route but only a child comp of the burger builder which is a comp that gets loaded through a route it needs the withRouter wrapping to get the route props match location and history
    console.log(props);
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

export default withRouter(burger);