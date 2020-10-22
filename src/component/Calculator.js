import React from "react";
import "../style.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { TextField, Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const TYPE = {
  MULTI: "MULTI",
  MINUS: "MINUS",
  ADD: "ADD",
  DIV: "DIV",
  SQRT: "SQRT",
  EXPO: "EXPO",
  POW: "POW",
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar: false,
      snackbarMessage: "",
      open: false,
      loading: false,
    };
  }

  getData() {
    let { data } = this.props;
    return data;
  }

  getValue1() {
    let data = this.getData();
    return data.value1;
  }

  getValue2() {
    let data = this.getData();
    return data.value2;
  }

  onChange = (name, e) => {
    let { setValue } = this.props;
    setValue({
      [name]: e.target.value,
    });
  };

  onCalcClick = (type) => {
    let {
      setValue,
      data: { value1, value2, username },
    } = this.props;
    let calculation = "";
    let value = 0;

    value1 = parseInt(value1);
    value2 = parseInt(value2);

    switch (type) {
      case TYPE.ADD:
        value = value1 + value2;
        calculation = `${value1} + ${value2} = ${value}`;
        break;
      case TYPE.MULTI:
        value = value1 * value2;
        calculation = `${value1} * ${value2} = ${value}`;
        break;
      case TYPE.DIV:
        value = value1 / value2;
        calculation = `${value1} / ${value2} = ${value}`;
        break;
      case TYPE.MINUS:
        value = value1 - value2;
        calculation = `${value1} - ${value2} = ${value}`;
        break;
      case TYPE.SQRT:
        value1 = value1 ? Math.sqrt(value1) : "";
        value2 = value2 ? Math.sqrt(value2) : "";
        value = true;
        calculation = `Square root = ${value1} : ${value2}`;
        break;
      case TYPE.EXPO:
        value1 = value1 ? Math.exp(value1) : "";
        value2 = value2 ? Math.exp(value2) : "";
        value = true;
        calculation = `Exponential = ${value1} : ${value2}`;
        break;
      case TYPE.POW:
        value = value1 && value2 ? Math.pow(value1,value2) : '';
        calculation = `${value1} ^ ${value2} = ${value}`;
        break;
    }

    if (!value) {
      this.openSnackBar("Please try with valid inputs!");
      return;
    }
    setValue({
      calculation,
    });
    this.openSnackBar(calculation);
    this.sendLog(username, calculation);
  };

  sendLog(username, calculation) {
    let data = {
      username,
      calculation,
    };
    this.setState({ loading: true });
    axios.post("https://calc-logger.herokuapp.com/send", data).then((res) => {
      this.setState({
        loading: false,
      });
      this.props.setValue({
        value1: "",
        value2: "",
      });
    });
  }

  openSnackBar(message) {
    this.setState({
      open: true,
      snackbarMessage: message,
    });
  }

  closeSnackBar() {
    this.setState({
      open: false,
      snackBarMessage: "",
    });
  }

  handleCloseSnackBar = () => {
    this.closeSnackBar();
  };

  onClearClick = () => {
    this.props.setValue({
      calculation: "",
      value1: "",
      value2: "",
    });
  };

  getLoading() {
    let { loading } = this.state;
    return loading;
  }

  renderArithmeticButtons() {
    return (
      <Grid container spacing={1} style={{ marginTop: 16 }}>
        <Grid item xs={4} md={2}>
          <Button
            disabled={this.getLoading()}
            onClick={() => {
              this.onCalcClick(TYPE.ADD);
            }}
            variant="contained"
            color="primary"
            style={{ width: "100%" }}
          >
            <span style={{ fontSize: 24 }}>+</span>
          </Button>
        </Grid>
        <Grid item xs={4} md={2}>
          <Button
            disabled={this.getLoading()}
            onClick={() => {
              this.onCalcClick(TYPE.MINUS);
            }}
            variant="contained"
            color="primary"
            style={{ width: "100%" }}
          >
            <span style={{ fontSize: 24 }}>-</span>
          </Button>
        </Grid>
        <Grid item xs={4} md={2}>
          <Button
            disabled={this.getLoading()}
            onClick={() => {
              this.onCalcClick(TYPE.MULTI);
            }}
            variant="contained"
            color="primary"
            style={{ width: "100%" }}
          >
            <span style={{ fontSize: 24 }}>*</span>
          </Button>
        </Grid>
        <Grid item xs={4} md={2}>
          <Button
            disabled={this.getLoading()}
            onClick={() => {
              this.onCalcClick(TYPE.DIV);
            }}
            variant="contained"
            color="primary"
            style={{ width: "100%" }}
          >
            <span style={{ fontSize: 24 }}>/</span>
          </Button>
        </Grid>
        <Grid item xs={8} md={2}>
          <Button
            disabled={this.getLoading()}
            onClick={() => {
              this.onCalcClick(TYPE.SQRT);
            }}
            variant="contained"
            color="primary"
            style={{ width: "100%", height: 52 }}
          >
            Square root
          </Button>
        </Grid>
        <Grid item xs={8} md={2}>
          <Button
            disabled={this.getLoading()}
            onClick={() => {
              this.onCalcClick(TYPE.EXPO);
            }}
            variant="contained"
            color="primary"
            style={{ width: "100%", height: 52 }}
          >
            <span style={{ textOverflow: "ellipsis" }}>Exponential</span>
          </Button>
        </Grid>
        <Grid item xs={4} md={2}>
          <Button
            disabled={this.getLoading()}
            onClick={() => {
              this.onCalcClick(TYPE.POW);
            }}
            variant="contained"
            color="primary"
            style={{ width: "100%", height: 52 }}
          >
            <span style={{ textOverflow: "ellipsis" }}>POWER</span>
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            disabled={this.getLoading()}
            onClick={() => {
              this.onClearClick();
            }}
            variant="contained"
            color="primary"
            style={{ width: "100%", height: 52 }}
          >
            <span style={{ fontSize: 14 }}>Clear</span>
          </Button>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <div>
        <Card
          style={{
            minWidth: 275,
            marginTop: 16,
          }}
        >
          <CardContent>
            <Typography
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
              color="textSecondary"
              gutterBottom
            >
              Make your calculations
            </Typography>
            <br></br>
            <form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Value 1"
                    variant="outlined"
                    style={{ width: "100%" }}
                    type="number"
                    value={this.getValue1()}
                    onChange={(e) => this.onChange("value1", e)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="outlined-basic"
                    label="Value 2"
                    variant="outlined"
                    style={{ width: "100%" }}
                    type="number"
                    value={this.getValue2()}
                    onChange={(e) => this.onChange("value2", e)}
                  />
                </Grid>
              </Grid>
            </form>
            {/* Render Arithmetic content */}
            {this.renderArithmeticButtons()}
          </CardContent>
        </Card>
        <Snackbar open={this.state.open} autoHideDuration={6000}>
          <Alert onClose={() => this.handleCloseSnackBar()} severity="info">
            {this.state.snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
