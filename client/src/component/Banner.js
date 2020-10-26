import React from "react";
import {  Container ,Row ,Col ,Button } from 'reactstrap';
import Auth from "./Auth";
import worry from "./worry.png";
class Banner extends React.Component {
    render() { 
        return (
<div>
    <Container>
            <Row xs="1" sm="2">
            <Col>
          <img
            alt="..."
            className="img-fluid"
            src={worry}

          ></img>
        </Col>
        <Col>
           <h1 className="display-4 text-center">Recall App</h1>
           <p className="lead text-center">For the people who forget things easily :)</p>
         <Auth/>
        </Col>
      </Row>
                
    </Container>
</div>
            
            );
    }
}
 
export default Banner;