import React from "react";
import "../style.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { TextField, Button } from "@material-ui/core";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLoggedInView() {
    const { login, username } = this.props.data;
    if (!login) return null;
    return (
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <span style={{ fontWeight: "bold", flex: 1 }}>
          User name :
          <span style={{ fontWeight: "normal", marginLeft: 8, fontSize: 14 }}>
            {username}
          </span>
        </span>
        <span
          onClick={this.handleLogout}
          style={{ fontWeight: "bold", color: "blue", cursor: "pointer" }}
        >
          Logout
        </span>
      </div>
    );
  }

  handleLogout = () => {
    this.props.setValue({
      login: false,
      username: "",
      value1: "",
      value2: "",
      calculation: "",
    });
  };

  renderLoginView() {
    const { login, username } = this.props.data;
    if (login) return null;
    return (
      <div>
        <Typography
          style={{
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 16,
          }}
          color="textSecondary"
          gutterBottom
        >
          Register your name to access calculator
        </Typography>
        <form noValidate autoComplete="off" action="#">
          <TextField
            id="outlined-basic"
            label="User name"
            variant="outlined"
            style={{ width: "100%" }}
            value={username}
            onChange={this.handleUserName}
          />
          <br></br>
          <br></br>
          <Button
            type="submit"
            onClick={this.handleStart}
            variant="contained"
            color="primary"
          >
            Start
          </Button>
        </form>
      </div>
    );
  }

  /**
   * handles the user name change value
   * @param {object} e
   */
  handleUserName = (e) => {
    let text = e.target.value;
    this.props.setValue({
      username: text,
    });
  };

  handleStart = () => {
    let { username } = this.props.data;
    if (!username) {
      alert("Enter valid user name");
      return;
    }
    this.props.setValue({
      login: true,
    });
  };

  render() {
    return (
      <div>
        <Card
          style={{
            minWidth: 275,
            marginTop: 32,
          }}
        >
          <CardContent>
            {this.renderLoginView()}
            {this.renderLoggedInView()}
          </CardContent>
        </Card>
      </div>
    );
  }
}
