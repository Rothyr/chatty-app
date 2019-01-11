require('../styles/home.scss');
import React, {Component} from 'react';


//ChatBar Component
class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user.name,
      content: ''
    }

    //Binding Area
    this.handleNameChange = this.handleNameChange.bind(this);
    this.messageChange = this.messageChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.changedUser = this.changedUser.bind(this);
  }

  //Function: Handle Name Change
  handleNameChange(e) {
    this.setState({
      user: e.target.value
    })
  }

  //Function: Handle Message Change
  messageChange(e) {
    this.setState({
      content: e.target.value
    })
  }

  //Function: Handle Enter Key Press (Posting Message)
  keyPress(e) {
    if(e.keyCode == 13) {
      const message = {
        type: "postMessage",
        username: this.props.user.name,
        content: this.state.content
      }

      this.props.socket.send(JSON.stringify(message));
      this.setState({
        content:''
      })
    }
  }

  //Function: Handle Name Change (Changing Username)
  onEnter(e) {
    if(e.keyCode == 13) {
      this.changedUser(e);
    }
  }

  //Function: Handles Declaration of Name Change
  changedUser(e) {
    if (this.props.user.name !== this.state.user) {
      const notification = {
        type: 'postNotification',
        content: `${this.props.user.name} has changed their name to ${this.state.user}.`
      }
      this.props.socket.send(JSON.stringify(notification));
      this.props.changeUser(this.state.user);
    }
  }

  render() {
    return (

      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"  value={this.state.user} onChange={this.handleNameChange} onKeyDown={this.onEnter} onBlur={this.changedUser}/>

        <input className="chatbar-message" onChange={this.messageChange} onKeyDown={this.keyPress} value={this.state.content} />
      </footer>
    );
  }
}

export default ChatBar;
