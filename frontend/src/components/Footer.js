import React from 'react';
import { Nav, NavItem, } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Footer = (props) => {
    return(
        <nav className="footer">
        <Nav pills>
            <NavItem>
                <NavLink exact to="/">Home</NavLink>
            </NavItem>

            <NavItem>
                <NavLink to="/cities">Cities</NavLink>
            </NavItem>
            {props.token &&
                <NavItem>
                <NavLink to="/sign_out">Sign Out</NavLink>
            </NavItem>}
            {!props.token &&
                <NavItem>
                <NavLink to="/sign_in">Sign In</NavLink>
            </NavItem>}
            {!props.token &&
            <NavItem>
                <NavLink to="/sign_up">Sign Up</NavLink>
            </NavItem>}
        </Nav>
        <div>
            <img className="rrss" src="../assets/facebook.png" alt="logo Facebook"/>
            <img className="rrss" src="../assets/twitter.png" alt="logo Twitter"/>
            <img className="rrss" src="../assets/instagram.png" alt="logo Instagram"/>
        </div>
    </nav>
    )
}

const mapStateToProps = (state) => {
    return{
        token: state.user.token
    }
}

export default connect(mapStateToProps)(Footer);