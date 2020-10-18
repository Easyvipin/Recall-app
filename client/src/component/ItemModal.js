import React , {Component} from "react";
import {
    Button, Modal, ModalHeader, ModalBody, Input, Label, Form, FormGroup 
} from 'reactstrap';

import { connect } from 'react-redux';
import {addItem}  from '../actions/itemAcions';

class ItemModal extends Component {
  state ={
       modal:false,
       name:'',
       place:'',
  }
  toggle =()=>{
      this.setState({
          modal:!this.state.modal
      })
  }
 onChange = (e) =>{
     this.setState({
         [e.target.name]:e.target.value
     })
 }
 onSubmit = (e)=>{
     e.preventDefault();

     const newItem = {
         name:this.state.name,
         place:this.state.place
     }
     this.props.addItem(newItem);
     this.toggle();
 }


  render(){
      return(
          <div>
          <Button 
          color="dark"
          style={{marginBottom:'2rem'}}
          onClick ={this.toggle}>
          Add Recall
          </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Add to Recall List</ModalHeader>
        <ModalBody>
        <Form onSubmit={this.onSubmit}>
        <FormGroup>
        <Label for="item">Item</Label>
        <Input type="text" name="name" id="item" placeholder="Add item" onChange={this.onChange}/>
        <Label for="place">Place</Label>
        <Input type="text" name="place" id="place" placeholder="where ?" onChange={this.onChange}/>
        <Button color="dark" style={{marginTop:'2rem'}} block>Make a Recall</Button>
        </FormGroup>
        </Form>
        </ModalBody>
        </Modal>
        </div>
      )
  }
}
 
export default connect(null,{addItem})(ItemModal);