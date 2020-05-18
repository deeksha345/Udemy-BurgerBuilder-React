import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidebar from '../Navigation/Sidebar/Sidebar';

class Layout extends Component {
    state = {
        showModal: false,
    }

    sidebarToggleHandler = () => {
        this.setState((prevState) => { 
            return {showModal: !prevState.showModal}
        });
    }

    closeModal = () => {
        this.setState({showModal: false})
    }

    render() {
        return (
            <Aux>
                <Sidebar open={this.state.showModal} close={this.closeModal}/>
                <Toolbar clicked={this.sidebarToggleHandler}/>
                <main className={classes.Content}> 
                    {this.props.children}
                </main>
                {/* Could put footer here */}
            </Aux>
        )
    }
}

export default Layout;