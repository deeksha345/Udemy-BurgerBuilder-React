import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 0.8
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                lettuce: 0,
                bacon: 0,
                cheese: 0,
                meat: 0,
            },
            totalPrice: 0,
            canCheckout: false,
            showModal: false,
        }
    }

    modalHandler = () => {
        this.setState({showModal: true})
    }

    closeModal = () => {
        this.setState({showModal: false})
    }

    continueToCheckout = () => {
        this.setState({showModal: false})
    }

    updatePurchaseHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        this.setState({canCheckout: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseHandler(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseHandler(updatedIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.showModal}
                    modalClicked={this.closeModal}
                >
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        cancelOrder={this.closeModal}
                        continueToCheckout={this.continueToCheckout}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    add={this.addIngredientHandler}
                    delete={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.canCheckout}
                    showModal={this.modalHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;