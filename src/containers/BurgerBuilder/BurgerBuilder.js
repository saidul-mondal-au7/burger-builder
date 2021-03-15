import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Buildcontrols from "../../components/Burger/Buildcontrols/Buildcontrols"

import Aux from '../../hoc/Hoc';

const INGREDIENT_PRICES = {
    salad : 50,
    cheese : 70,
    meat : 100,
    bacon : 70
}

export default class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
        },
        totalPrice : 99,
        purchasable : false
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

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for( let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <div><Burger ingredients={this.state.ingredients} /></div>
                <Buildcontrols 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice} />   
            </Aux>
            
        )
    }
} 
