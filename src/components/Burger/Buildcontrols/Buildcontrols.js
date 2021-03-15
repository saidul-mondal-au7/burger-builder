import React from 'react';
import './Buildcontrols.css';
import Buildcontrol from "./Buildcontrol/Buildcontrol"

const controls = [
    {label:"Salad" , type:'salad'},
    {label:"Bacon" , type:'bacon'},
    {label:"Cheese" , type:'cheese'},
    {label:"Meat" , type:'meat'}
]

export default function Buildcontrols(props) {
    return (
        <div className="Buildcontrols">
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl =>(
                <Buildcontrol 
                key={ctrl.label} 
                label={ctrl.label} 
                added={()=>props.ingredientAdded(ctrl.type)} 
                removed={()=>props.ingredientRemove(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
            ))}
            <button 
            className="OrderButton"
            disabled={!props.purchasable} >ORDER NOW</button>
        </div>
    )
}
