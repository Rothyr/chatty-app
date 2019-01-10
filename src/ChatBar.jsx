require('../styles/home.scss');
import React, {Component} from 'react';
const uuidv4 = require('uuid/v4');

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ' '
    }
  this.handleNameChange = this.handleNameChange.bind(this);
  this.messageChange = this.messageChange.bind(this);
  this.keyPress = this.keyPress.bind(this);
  }

  handleNameChange(e) {
    this.props.changeUser(e.target.value);

  }

  messageChange(e) {
    this.setState({
      content: e.target.value,
    })
  }

  keyPress(e) {
    if(e.keyCode == 13) {
      const message = {
        id: uuidv4(),
        username: this.props.user.name,
        content: this.state.content
      }

      this.props.addMessage.send(JSON.stringify(message));
      this.setState({
          content:' '
      })
    }
  }

  render() {
    return (

      <footer className="chatbar">

        <input className="chatbar-username" placeholder="Your Name (Optional)"  value={this.props.user.name} onChange={this.handleNameChange} />

        <input className="chatbar-message" onChange={this.messageChange} onKeyDown={this.keyPress} value={this.state.content} />

      </footer>
    );
  }
}
export default ChatBar;
