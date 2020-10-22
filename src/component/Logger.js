import React from "react";
import "../style.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import io from 'socket.io-client';

export default class Logger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        logs : []
    };
  }

  componentDidMount(){
    const socket = io('https://calc-logger.herokuapp.com/');
    socket.on('log',this.handleLog);
  }

  handleLog = (res) => {
    let {logs} = this.state;
    logs.unshift(res);
    if(logs.length > 10){
        logs.pop();
    }
    this.setState({logs});
  }

  renderAllLog(){
    let {logs} = this.state;
    if(logs.length === 0) return (
        <div style = {{color : "gray",textAlign:"center",borderTop:"1px solid #e8e7e7",paddingTop : 8}}>
            NO LOGS
        </div>
    )
    return logs.map((log) => {
        return this.renderLog(log);
    });
  }

  renderLog(res){
      const {username,calculation} = res;
      return (
          <div style = {{display:"flex",flex:1,marginTop:8,flexDirection : "column",padding:8,border:"1px solid gainsboro"}}>
              <span style = {{fontSize : 14,fontWeight : "bold"}}>{username}</span>
              <div style = {{borderTop : "1px solid #ecebeb",marginTop : 8}}>
                Calculation : {calculation}
              </div>
          </div>
      )
  }

  render() {
    return (
      <div>
        <Card
          style={{
            minWidth: 275,
            marginTop: 16,
            marginBottom : 32
          }}
        >
          <CardContent>
            <Typography
              style={{
                fontSize: 14,
                fontWeight : "bold",
                marginBottom : 16
              }}
              color="textSecondary"
              gutterBottom
            >
              Calculations Logs
            </Typography>
            {this.renderAllLog()}
          </CardContent>
        </Card>
      </div>
    );
  }
}
