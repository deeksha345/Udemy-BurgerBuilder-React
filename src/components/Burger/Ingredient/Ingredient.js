import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './Ingredient.css';

class Ingredient extends Component {
    render() {
        let thisIngredient = null
        switch (this.props.type) {
            case ('breadBottom'):
                thisIngredient = <div className={classes.BreadBottom}></div>;
                break;
            case ('breadTop'):
                thisIngredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ('meat'):
                thisIngredient = <div className={classes.Meat}></div>;
                break;
            case ('cheese'):
                thisIngredient = <div className={classes.Cheese}></div>;
                break;
            case ('lettuce'):
                thisIngredient = <div className={classes.Salad}></div>;
                break;
            case ('bacon'):
                thisIngredient = <div className={classes.Bacon}></div>;
                break;
            default:
                thisIngredient = null;
                break;
        }
        
        return thisIngredient
    } 
}

// Prop type validation to ensure wrong data isnt getting passed to this comp thru props
Ingredient.propTypes = {
    type: PropTypes.string.isRequired,
}

export default Ingredient;