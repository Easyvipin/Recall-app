import React , {Component} from 'react';
import {
    Nav,
    Collapse,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Container,
    NavbarToggler
} from 'reactstrap';

class AppNav extends Component {
 state = {
     isOpen :false ,
 }   
 toggle = () =>{
     this.setState({
         isOpen:!this.state.isOpen
     });
 }
 render(){
     return(
     <div>
    <Navbar color="dark" dark expand="sm" className="mb-5">
    <Container>
     <NavbarBrand href="/">Recall</NavbarBrand>
     <NavbarToggler onClick={this.toggle}/>
     <Collapse isOpen = {this.state.isOpen} navbar>
    <Nav className="ml-auto" navbar>
    <NavItem>
    <NavLink href="https:">
    Github
    </NavLink>
    </NavItem>
    </Nav>
     </Collapse>
    </Container>
    </Navbar>     
     </div>
     )
 }

}
export default AppNav;