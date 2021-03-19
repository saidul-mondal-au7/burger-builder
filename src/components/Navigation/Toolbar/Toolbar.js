import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import NavigationItems from '../NavigationItems/NavigationsItems'
function Toolbar(props) {
    return (
        <header className="Toolbar">
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <div className="Logos">
                <Logo />
            </div>
            <nav className="DesktopOnly">
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar
