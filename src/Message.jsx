require('../styles/home.scss');
import React, {Component} from 'react';
import MessageList from './MessageList.jsx';

class Messages extends Component {
  render() {
    return (
      <div>
        <main className="messages">
          {this.props.messages.map((message) => {
            switch(message.type) {
              case 'incomingMessage':
              return (<MessageList list={message} key={message.id} />)
                break;

              case 'incomingNotification':
                return (
                  <div className="message system" key={message.id}>
                  {message.content}
                  </div>)
                break;
            }
          })
        }
        </main>
      </div>
    );
  }
}

export default Messages;
