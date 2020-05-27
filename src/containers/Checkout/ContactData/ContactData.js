import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                eleType: "input",
                eleConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg: "Please enter a value!",
            },
            street: {
                eleType: "input",
                eleConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg: "Please enter a value!",
            },
            zipCode: {
                eleType: "input",
                eleConfig: {
                    type: "text",
                    placeholder: "ZipCode"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
                errorMsg: "Please enter a value 5 chars in length!",
            },
            country: {
                eleType: "input",
                eleConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg: "Please enter a value!",
            },
            email: {
                eleType: "input",
                eleConfig: {
                    type: "email",
                    placeholder: "Your email"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg: "Please enter a valid email!",
            },
            deliveryMethod: {
                eleType: "select",
                eleConfig: {
                    options: [
                        {value: 'fastest', label: 'Fatest Delivery'},
                        {value: 'cheapest', label: "Cheapest Delivery"}
                    ]
                },
                value: "fastest",
                validation: {},
                valid: true,
            },
        },
        formIsValid: false,
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault(); // prevent reload when form submitted
        this.setState({loading: true});
        const formData = {};
        for (let formEle in this.state.orderForm) {
            formData[formEle] = this.state.orderForm[formEle].value;
        }
        const data = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event, inputID) => {
        // this alone will not do a deep clone because there are nested objects inside orderForm those will just have their pointers stored so changes to those objects will be mutable
        //const updatedForm = { ...this.state.orderForm }

        const updatedForm = {...this.state.orderForm};
        const updatedFormEle = {...updatedForm[inputID]};
        // if you are also updating the eleConfig nested object you would need to clone that deeply also 
        // const updateFormEleConfig = {...updatedFormEle.eleConfig}

        updatedFormEle.value = event.target.value;
        updatedFormEle.valid = this.checkValidity(updatedFormEle.value, updatedFormEle.validation);
        updatedFormEle.touched = true;
        updatedForm[inputID] = updatedFormEle;

        let formIsValid = true;
        for (let id in updatedForm) {
            formIsValid = updatedForm[id].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedForm, 
            formIsValid: formIsValid
        });
    }

    render () {
        const formEleArray = [];
        for (let key in this.state.orderForm) {
            formEleArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formEleArray.map(formEle => (
                    <Input 
                        key={formEle.id}
                        eleType={formEle.config.eleType}
                        eleConfig={formEle.config.eleConfig}
                        value={formEle.config.value}
                        invalid={!formEle.config.valid}
                        shouldValidate={formEle.config.validation}
                        touched={formEle.config.touched}
                        errorMsg={formEle.config.errorMsg}
                        changed={(event) => {this.inputChangeHandler(event, formEle.id)}}
                    />
                ))}
                <Button 
                    buttonType="Success" 
                    disabled={!this.state.formIsValid}
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