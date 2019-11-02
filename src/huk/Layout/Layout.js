import React, { Component } from 'react';
import Ayx from '../Ayx/Ayx';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/NavigationItems/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        // this.setState({showSideDrawer: !this.state.showSideDrawer});
        this.setState( (prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });;
    }

    render () {
        return(
            <Ayx>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={ classes.content }>
                    {this.props.children}
                </main>
            </Ayx>
        )
    }
};

export default Layout;