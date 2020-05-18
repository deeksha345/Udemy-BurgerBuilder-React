import React from 'react';
import burgerImg from '../../assets/images/burgerLogo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div 
        className={classes.Logo} 
        style={{height: props.height, backgroundColor: props.color}}>
        <img src={burgerImg} alt="BurgerLogo"/>
    </div>
);

export default logo;
