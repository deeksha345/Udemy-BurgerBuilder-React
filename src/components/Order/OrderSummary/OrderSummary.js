import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

const orderSummary = (props) => {
    return (
        <div className={classes.OrderSummary}>
            <h1>This is your order summary!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                buttonType="Danger"
                clicked={props.onCheckoutCancelled}
            >Cancel</Button>
            <Button 
                buttonType="Success"
                clicked={props.checkoutContinued}
            >Continue</Button>
        </div>
    );
}

export default orderSummary;