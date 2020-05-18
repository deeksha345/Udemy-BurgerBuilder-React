import React, { Component } from 'react'
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class orderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(key => {
            return (
                <li key={key}>
                    <span style={{textTransform: 'capitalize'}}>
                        {key}
                    </span>: {this.props.ingredients[key]}
                </li>
            );
        })

        return (
            <Aux>
                <h3>Order Summary:</h3>
                <p>Your burger build has the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button 
                    clicked={this.props.cancelOrder}
                    buttonType="Danger"
                >Cancel</Button>
                <Button 
                    clicked={this.props.continueToCheckout}
                    buttonType="Success"
                >Continue</Button>
            </Aux>
        );
    };
} 

export default orderSummary;