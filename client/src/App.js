import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNav from "./component/navApp";
import RecallList from './component/RecallList';
import {Provider} from 'react-redux';
import store from "./store";
import ItemModal from './component/ItemModal';
import {Container} from "reactstrap";
function App() {
  return (
    <Provider store={store}>
    <div className="App">
    <AppNav/>
    <Container>
    <ItemModal/>
     <RecallList/>
     </Container>
    </div>
    </Provider>
  );
}

export default App;
