import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNav from "./component/navApp";
import RecallList from './component/RecallList';
import {connect} from 'react-redux';
import ItemModal from './component/ItemModal';
import {Container} from "reactstrap";
import {authUser} from "./actions/authActions"
import Banner from './component/Banner';
import Footer from './component/Footer';
import XLIF from "./component/XLIF.gif";
class App extends React.Component{
  
componentDidMount(){
  
  this.props.authUser()
}
  render(){
    const {isauth,loading} = this.props.auth;
  return (
    <div className="App">
    <AppNav/>
    {loading == true && isauth ==""?<img src={XLIF}/>:''}
    {isauth === false ? <Banner/>:''}
    {isauth === true?<Container><ItemModal/><RecallList/></Container>:''}
     <Footer/>
    </div>
  );
  }
}
const mapStateToProps = state =>{
  return {
      auth:state.auth
  }
}

export default connect(mapStateToProps,{authUser})(App);
