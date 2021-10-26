import React, { useState } from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';

const Header = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);

    return(
        <nav className="header">
        <Nav pills>
            <NavItem>
                <NavLink exact to="/">Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/cities">Cities</NavLink>
            </NavItem>
        </Nav>
        <Nav pills>
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle nav caret>
                    <img className="user" src={props.token ? props.profilePicture : "../assets/user.png"}
                    alt="Sign in" style={{borderRadius:"50%"}}/>
                </DropdownToggle>
                <DropdownMenu>
                    {!props.token && <DropdownItem><NavLink to="/sign_in">Sign In</NavLink></DropdownItem>}
                    {!props.token && <DropdownItem><NavLink to="/sign_up">Sign Up</NavLink></DropdownItem>}
                    {props.token && <DropdownItem><p>{props.userName}</p></DropdownItem>}
                    {props.token && <DropdownItem><p onClick={() => props.logOut()}>Sign Out</p></DropdownItem>}
                </DropdownMenu>
            </Dropdown>
        </Nav>
    </nav>
    )
}

const mapStateToProps = (state) => {
    return{
        token: state.user.token,
        userName: state.user.name,
        profilePicture: state.user.profilePicture
    }
}

const mapDispatchToProps = {
    logOut: userActions.logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);