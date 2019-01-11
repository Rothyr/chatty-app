require('../styles/home.scss');
import React, {Component} from 'react';
import Messages from './Message.jsx';
import ChatBar from './ChatBar.jsx';

// App Component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: 'Default-User'+ Math.floor((Math.random() * 1000) + 1)
      },
      messages: [],
      onlineUsers: 0
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
    console.log('Connected to the Server!');

    this.socket.onopen = () => {
      console.log('Socket is open!');
    }

    this.socket.onmessage = (event) => {
      const parsedMessage = JSON.parse(event.data);
      if (typeof parsedMessage === 'number') {
        this.setState({
          onlineUsers: parsedMessage
        })
      } else {
      this.enterMessage(parsedMessage);
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <img src="/styles/icons/pingu-logo2.png" href="/" className="navbar-logo"></img>
          <a href="/" className="navbar-brand">Ping-U</a>
          <p className="navbar-subtitle">Noot! Noot!</p>

          <h2 className="user-counter">Online Users: {this.state.onlineUsers}</h2>
        </nav>

        <Messages messages={this.state.messages} />

        <ChatBar user={this.state.currentUser} changeUser={this.changeUser} socket={this.socket} />
      </div>
    )
  }
}

export default App;
