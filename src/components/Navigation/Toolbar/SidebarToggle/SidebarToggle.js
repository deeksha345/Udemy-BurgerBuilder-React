import React from 'react';
import classes from './SidebarToggle.css';

const sidebarToggle = (props) => (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default sidebarToggle;