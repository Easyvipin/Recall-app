import React , { Component } from 'react';
import {Container , ListGroup, ListGroupItem , Button,Badge,Spinner } from 'reactstrap';
import {CSSTransition ,TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems , deleteItem} from "../actions/itemAcions";
import PropTypes from "prop-types";

class RecallList extends Component {
    componentDidMount(){
     
        this.props.getItems();
    }
    onDeleteClick = (id)=>{
         this.props.deleteItem(id);
    }
    render() { 
        const {items} = this.props.item;
        return (
        <Container>
           {this.props.item.loading == true ?  <Spinner style={{ position:'absolute',width: '4rem', height: '4rem' }} color="secondary" />:''}
           <ListGroup >
           <TransitionGroup className="recall-list">
           {items.map(({_id,itemName,itemPlace})=>(
               <CSSTransition key={_id} timeout={500} classNames="fade">
               <ListGroupItem>
               <Button className="remove-btn" color="danger" size="sm" onClick={this.onDeleteClick.bind(this,_id)
               }>&times;</Button>
               {itemName}<Badge style={{marginLeft:'1rem'}}color="warning">{itemPlace}</Badge>
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
    console.log(state);
    return {
        item:state.item
    }
}
export default connect(mapStateToProps,{getItems ,deleteItem})(RecallList);