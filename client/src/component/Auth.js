import React from "react"
import {Button, Modal ,Form,FormGroup,Label,Input,FormFeedback,ModalHeader,ModalBody,FormText} from "reactstrap";
import {connect} from "react-redux";
import {regUser,logUser} from "../actions/authActions"
class Auth extends React.Component {
    
state = {
    logmodal:false, 
    regmodal:false,
    username:'',
    password:'',
    disabled:true,
    message:'',
 } 
 toggle = (modal)=>{

     console.log(modal);
     if(modal == "reg"){
         this.setState({
             regmodal:!this.state.regmodal
         })
     }
     if(modal == "log"){
         this.setState({
             logmodal:!this.state.logmodal
         })
     }
 }
  
onChange = (e) =>{
    this.setState({
        [e.target.name]:e.target.value
    })
}
onCheck = (e) => {

    if(e.target.value == this.state.password){
        this.setState({
            disabled:false,
            message:''
        }) 
    }
    else {
        this.setState({
            message:'Password does not match'
        }) 
    }
}

 onSubmit = (e,auth) =>{
     e.preventDefault();
   
        if(auth== "reg"){
            console.log("called reg");
            let user = {
                user:this.state.username,
                password:this.state.password,
            }
          this.props.regUser(user);
        }
        if(auth == "log"){
            let user = {
                user:this.state.username,
                password:this.state.password,
            }
            this.props.logUser(user);
        }
 }
    
    render(){
        const {username,password} = this.props.errors;
        return (
           <div className="text-center">
           <Button onClick={()=>this.toggle('reg')} color="info">
           Register
           </Button>{` `}
           <Button onClick={()=>this.toggle('log')} color="dark">
           Login
           </Button>
           {/* REGISTER */}
          <Modal isOpen={this.state.regmodal} toggle={()=>this.toggle('reg')}>
          <ModalHeader toggle={()=>this.toggle('reg')} >Register</ModalHeader>
          <ModalBody>
          <Form onSubmit={(e)=>this.onSubmit(e,"reg")}>
          {/* username */}
          <FormGroup>
          <Label for="username">Choose your username</Label>
           {username?
            <Input type="text" name="username" id="username" placeholder="Username..." onChange={this.onChange} required invalid />:
            <Input type="text" name="username" id="username" placeholder="Username..." onChange={this.onChange} required />}
          <FormFeedback>{username}</FormFeedback>
          <FormText>Rememeber this username,for login ;)</FormText>
          </FormGroup>
          {/* password */}
          <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" onChange={this.onChange} required/>
          <FormFeedback>error message</FormFeedback>
          <FormText>Password must be 8 characters long</FormText>
          </FormGroup>
          {/* confirm */}
          <FormGroup>
          <Label for="confpassword">Confirm password</Label>
            {this.state.password.length > 8 ? <Input type="password" name="conf" id="conf" onChange={this.onCheck} />:<Input type="password" name="conf" id="conf" onChange={this.onCheck} disabled/>}  
            <FormText>{this.state.message}</FormText>
          </FormGroup>
          {this.state.disabled === true ? <Button outline color="success" name="register" size="lg" disabled>Register</Button>:
          <Button outline color="success" name="register" size="lg">Register</Button>}
          </Form>
          </ModalBody>
          </Modal>

           {/* LOGIN */}
           <Modal isOpen={this.state.logmodal} toggle={()=>this.toggle('log')}>
          <ModalHeader toggle={()=>this.toggle('log')} >Login</ModalHeader>
          <ModalBody>
          <Form onSubmit={(e)=>this.onSubmit(e,"log")}>
          {/* username */}
          <FormGroup>
          <Label for="username">Username</Label>
          {username ?<Input type="text" name="username" id="username"  onChange={this.onChange} required invalid/>
            : <Input type="text" name="username" id="username"  onChange={this.onChange} required />}
          <FormFeedback>{username}</FormFeedback>
          </FormGroup>
          {/* password */}
          <FormGroup>
          <Label for="password">Password</Label>
          {password ? <Input type="password" name="password" id="password"  onChange={this.onChange} required invalid/>:
          <Input type="password" name="password" id="password"  onChange={this.onChange} required/>}
          <FormFeedback>{password}</FormFeedback> 
          </FormGroup>
          <Button color="primary" size="lg" name="login">Login</Button>{' '}
          </Form>
          </ModalBody>
          </Modal>
           </div>
        )
    }  
}
const mapStateToProps = (state) =>{
    if(state.auth.error)
  return {
      errors : state.auth.error
  }
}
export default connect(mapStateToProps,{regUser,logUser})(Auth);