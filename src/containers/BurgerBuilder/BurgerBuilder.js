import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
            ingredients: null,
            totalPrice: 0,
            canCheckout: false,
            showModal: false,
            loading: false,
            error: false,
        }
    }

    componentDidMount () {
        axios.get("https://react-burger-builder-10302.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    modalHandler = () => {
        this.setState({showModal: true})
    }

    closeModal = () => {
        this.setState({showModal: false})
    }

    continueToCheckout = () => {
        this.setState({loading: true});
        const data = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Deeksha Sharma",
                address: {
                   street: "1 Test streed",
                   zipCode: "45675",
                   country: "United States"
                },
                email: "test@test.com",
            },
            deliveryMethod: "Expedited shipping"
        }
        axios.post("/orders.json", data)
            .then(response => { 
                console.log(response);
                this.setState({loading: false, showModal: false});
            })
            .catch(error => { 
                console.log(error);
                this.setState({loading: false, showModal: false});
            })
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

        let order = null;
        let burger = this.state.error ? <p>Ingredients cant be loaded!</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
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
            order = <OrderSummary 
            ingredients={this.state.ingredients} 
            cancelOrder={this.closeModal}
            continueToCheckout={this.continueToCheckout}
            price={this.state.totalPrice}
        />
        }
        if (this.state.loading) {
            order = <Spinner />
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.showModal}
                    modalClicked={this.closeModal}
                >
                    {order}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);