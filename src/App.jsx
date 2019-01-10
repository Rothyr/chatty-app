require('../styles/home.scss');
import React, {Component} from 'react';
import Messages from './Message.jsx';
import ChatBar from './ChatBar.jsx';

// const WebSocket = require('ws');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      currentUser: {
        name: 'Bob'
      },
      messages: []
    };

    //Socket Declaration
    this.socket = new WebSocket('ws://localhost:3001');

    //Binding Area
    this.enterMessage = this.enterMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);

  }

  changeUser(user) {
    this.setState({
      currentUser: {
        name: user
      }

    })
  }

  enterMessage(data) {
    const messages = this.state.messages.concat(data);
    this.setState({messages: messages});
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    console.log('Connected to the Server!');

    this.socket.onopen = (event) => {
      console.log('Socket is open!');
    }

    this.socket.onmessage = (event) => {
      const parsedMessage = JSON.parse(event.data);
      this.enterMessage(parsedMessage);

    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <img src="/styles/pingu-logo2.png" href="/" className="navbar-logo"></img>
          <a href="/" className="navbar-brand">Ping-U</a>
          <p className="navbar-subtitle">Noot! Noot!</p>
        </nav>

        <Messages messages={this.state.messages} />

        <ChatBar user={this.state.currentUser} changeUser={this.changeUser} addMessage={this.socket} />
      </div>
    )
  }
}

export default App;


//
// <footer class="chatbar">
//   <input class="chatbar-username" placeholder="Your Name (Optional)" />
//   <input class="chatbar-message" placeholder="Type a message and hit ENTER" />
// </footer>
