import React , {Component} from 'react';
import Cookies from "universal-cookie";
import axios from "axios";
import XLIF from "./XLIF.gif";
import {
    Nav,
    Collapse,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Container,
    NavbarToggler,
    Badge,
    Button
} from 'reactstrap';
import {connect} from "react-redux";

class AppNav extends Component {
  
 state = {
     isOpen :false ,
 }   
 toggle = () =>{
     this.setState({
         isOpen:!this.state.isOpen
     });
 }
  logout = () =>{
   axios.get('auth/logout')
   .then(resp=>{
    window.location.reload();
   })
 }
 
 render(){
     const {authUser} = this.props.auth;
   
     return(
     <div>
    <Navbar color="dark" dark expand="sm" className="mb-5">
    <Container>
     <NavbarBrand href="/"><img className="logo" src={XLIF}/>Recall </NavbarBrand>
     {authUser?<Badge style={{marginLeft:'0px'}}>|  {authUser}</Badge>
    :''}    
     <NavbarToggler onClick={this.toggle}/>
     <Collapse isOpen = {this.state.isOpen} navbar>
    <Nav className="ml-auto" navbar>
    <NavItem>
    <NavLink href="https://github.com/Easyvipin/Recall-app">
    Github
    </NavLink>
    </NavItem>
    <NavItem>
    {authUser?<Button onClick={this.logout} color="warning">Logout</Button>:''}
    </NavItem>
    </Nav>
     </Collapse>
    </Container>
    </Navbar>     
     </div>
     )
 }

}
const mapStateToProps = (state) => {
    return {
        auth:state.auth 
    }
}
export default connect(mapStateToProps)(AppNav);