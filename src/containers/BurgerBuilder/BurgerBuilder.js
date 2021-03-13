import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Buildcontrols from "../../components/Burger/Buildcontrols/Buildcontrols"

import Aux from '../../hoc/Hoc'

export default class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
        }
    }
    render() {
        return (
            <Aux>
                <div><Burger ingredients={this.state.ingredients} /></div>
                <Buildcontrols/>   
            </Aux>
            
        )
    }
}
