import React from 'react'
import Aux from '../../hoc/Hoc';
import './Layout.css'
const Layout = (props) => {
    return (
        <Aux >
            <div className="Contain">Toolbar, SideDrawer, Backdrop</div>
            <main className="Contain">{props.children}</main>
        </Aux>
       
    )
}

export default Layout;
