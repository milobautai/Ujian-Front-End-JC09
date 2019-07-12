import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {connect} from 'react-redux'
import {onLogout} from './../redux/actions'
import { Link } from 'react-router-dom'
import Axios from 'axios';

class Example extends React.Component {
  state = {
      isOpen : false
  }
  
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  onBtnLogoutClick = () => {
    this.props.onLogout()
    localStorage.removeItem('terserah')
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
           <Link to='/' color = 'black'><NavbarBrand className='home'>The piratebao</NavbarBrand> </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              
            {
              this.props.name !== ""
              ?
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className='account'>
                  Hello, {this.props.name}
                </DropdownToggle>
                <DropdownMenu right className='dropdown'>
                  <DropdownItem className='dropitem'>
                    <Link to='/profile' className='dropitem'>
                      Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem >
                    <Link to='/trxhistory' className='dropitem'>
                      History
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.onBtnLogoutClick} >
                    <NavItem>
                      <Link to='/'className='dropitem'>
                        <NavLink className='logoutbutton'>
                          Logout
                        </NavLink>
                      </Link>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              :
              null
            } 
            {
              this.props.name === ""
              ?
              <div>
              <NavItem >
                <Link to='/login'><NavLink className='login'>Sign In</NavLink></Link>
              </NavItem>
              </div>
              :
              null
            }  
            {
              this.props.stat === "1"
              ?
              <NavItem >
                <Link to='/manage'><NavLink className='managemovies'>Manage Movies</NavLink></Link>
              </NavItem>
              :
              null
            }
            {
              this.props.name !== ""
              ?
              <div>
              <NavItem>
              <Link to="/cart"><NavLink className="btn btn-white border-white" style={{fontSize:"14px",color:"white"}}><span><i class="fas fa-shopping-cart">{this.props.cart}cart</i></span></NavLink></Link>
              </NavItem>
              </div>
              :
              null
            }
            
              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name : state.user.username,
    stat : state.user.status
  }
}

export default connect(mapStateToProps , {onLogout})(Example)