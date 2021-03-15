import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css'

function Burger() {
    return (
        <div className="Burger">
            <BurgerIngredient type='bread-top'/>
            <BurgerIngredient type='cheese'/>
            <BurgerIngredient type='meat'/>
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}

export default Burger;
