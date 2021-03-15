import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';

import Aux from '../../hoc/Hoc'

export default class BurgerBuilder extends Component {
    render() {
        return (
            <Aux>
                <div><Burger /></div>
                
            </Aux>
            
        )
    }
}
