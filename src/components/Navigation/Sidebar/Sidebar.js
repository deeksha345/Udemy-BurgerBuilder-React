import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidebar.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sidebar = (props) => {
    let allClasses = [classes.Sidebar, classes.Close]
    if (props.open) {
        allClasses = [classes.Sidebar, classes.Open]
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.close} />
            <div className={allClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sidebar;