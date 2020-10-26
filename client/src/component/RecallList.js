import React , { Component } from 'react';
import {Container , ListGroup, ListGroupItem , Button,Badge,Spinner,Alert } from 'reactstrap';
import {CSSTransition ,TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems , deleteItem} from "../actions/itemAcions";
import PropTypes from "prop-types";

class RecallList extends Component {
    componentDidMount(){
        this.props.getItems(this.props.auth.authID);
    }
    onDeleteClick = (id,authID)=>{
         this.props.deleteItem(id,authID);
    }
    render() { 
       const {items}=this.props.item;
       const {authID} = this.props.auth;
        return (
        <Container>
           {this.props.item.loading == true ?  <Spinner style={{ position:'absolute',width: '4rem', height: '4rem' }} color="secondary" />:''}
           {items.length == 0 && this.props.item.loading == false ?<Alert color="dark">You don't have any recall yet :)</Alert>:''}
           <ListGroup >
           <TransitionGroup className="recall-list">
           {items.map(({_id,itemName,place})=>(
               <CSSTransition key={_id} timeout={500} classNames="fade">
               <ListGroupItem>
               <Button className="remove-btn" color="danger" size="sm" onClick={this.onDeleteClick.bind(this,_id,authID)
               }>&times;</Button>
               {itemName}<Badge style={{marginLeft:'1rem'}}color="warning">{place}</Badge>
               </ListGroupItem>
               </CSSTransition>
           ))}
           </TransitionGroup>
           </ListGroup>
        </Container>
        )
    }
}
RecallList.propTypes = {
    getItems:PropTypes.func.isRequired,
    item:PropTypes.object.isRequired
}
const mapStateToProps = state =>{

    return {
        item:state.item,
        auth:state.auth
    }
}
export default connect(mapStateToProps,{getItems ,deleteItem})(RecallList);