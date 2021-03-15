import React from 'react'
import './Buildcontrol.css'

export default function Buildcontrol(props) {
    return (
        <div className="BuildControl">
            <div className="Label">{props.label}</div>
            <button 
                className="Less" 
                onClick={props.removed}
                disabled={props.disabled} >Less</button>
            <button 
                className="More" 
                onClick={props.added} >More</button>
        </div>
    )
}




