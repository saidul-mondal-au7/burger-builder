import React from 'react'
import './Buildcontrol.css'

export default function Buildcontrol(props) {
    return (
        <div className="BuildControl">
            <div className="Label">{props.label}</div>
            <button className="Less">Less</button>
            <button className="More">More</button>
        </div>
    )
}




