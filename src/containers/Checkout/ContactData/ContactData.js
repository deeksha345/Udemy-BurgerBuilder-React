import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: ''
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault(); // prevent reload when form submitted
        this.setState({loading: true});
        const data = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
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
                this.setState({loading: false});
                this.props.history.push('/');

            })
            .catch(error => { 
                console.log(error);
                this.setState({loading: false});
            })
    }

    render () {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your name" />
                <input type="email" name="email" placeholder="Your email" />
                <input type="text" name="street" placeholder="Your street" />
                <input type="text" name="zip" placeholder="Your zip code" />
                <Button 
                    buttonType="Success" 
                    clicked={this.orderHandler}
                >Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.Contact}>
                <h4>Enter your contact info below!</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;