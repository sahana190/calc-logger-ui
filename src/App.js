import React, { Fragment } from "react";
import "./style.css";
import { Container } from "@material-ui/core";
import Login from "./component/Login";
import Calculator from "./component/Calculator";
import Logger from "./component/Logger";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      username : '',
      value1 : '',
      value2 : '',
      calculation : ''
    };
  }

  setValue = (data) => {
    this.setState(data);
  }

  renderCalculator(){
    let {login} = this.state;
    if(!login) return null;
    return (
      <Calculator data = {this.state} setValue = {this.setValue}/>
    )
  }

  renderLogger(){
    let {login} = this.state;
    if(!login) return null;
    return (
      <Logger data = {this.state} setValue = {this.setValue}/>
    )
  }

  render() {
    return (
      <Fragment>
        <Container maxWidth="md">
          <Login data = {this.state} setValue = {this.setValue}/>
          {this.renderCalculator()}
          {this.renderLogger()}
        </Container>
      </Fragment>
    );
  }
}
export default App;
