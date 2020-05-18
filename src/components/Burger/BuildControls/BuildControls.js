import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Lettuce', type: 'lettuce' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <h3 style={{borderBottom: "1px solid black", width: "100%", textAlign: "center", paddingBottom: "25px"}}>Burger Build Controls</h3>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                more={() => props.add(ctrl.type)}
                less={() => props.delete(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <p>Total price: <strong>${props.price.toFixed(2)}</strong></p>
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.showModal}
        >CHECKOUT</button>
    </div>
);

export default buildControls;