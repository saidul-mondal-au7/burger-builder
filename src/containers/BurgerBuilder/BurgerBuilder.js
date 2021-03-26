import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Buildcontrols from "../../components/Burger/Buildcontrols/Buildcontrols";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order'
import Aux from '../../hoc/Hoc';
import withErrorHandler from '../../hoc/withErrorHandler'
// import axios from 'axios';

const INGREDIENT_PRICES = {
    salad : 50,
    cheese : 70,
    meat : 100,
    bacon : 70
}

class BurgerBuilder extends Component {
    state = {
        ingredients : null,
        totalPrice : 99,
        purchasable : false,
        purchasing: false,
        loading: false
    }

    componentDidMount () {
        axios.get( 'https://pure-harbor-293206-default-rtdb.firebaseio.com/ingredients.json' )
            .then( response => {
                this.setState( { ingredients: response.data } );
            } )
            .catch( error => {
                this.setState( { error: true } );
            } );
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce(( sum, el )=>{
            return sum + el;
        }, 0 )
        this.setState( { purchasable: sum > 0 } )
    }
    
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState ({ totalPrice: newPrice, ingredients: updateIngredients })
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState ({ totalPrice: newPrice, ingredients: updateIngredients })
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        this.setState( { loading: true } );
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Saidul Mondal',
                address: {
                    street: 'Jankuli',
                    zipCode: '713408',
                    country: 'India'
                },
                email: 'saidmondal313@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState({ loading: false, purchasing: false });
            } )
            .catch( error => {
                this.setState({ loading: false, purchasing: false });
            } );
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for( let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.state.ingredients ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <Buildcontrols 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />   
                </Aux>
            );

            orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
        };
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
            
        )
    }
} 

export default withErrorHandler(BurgerBuilder, axios)
