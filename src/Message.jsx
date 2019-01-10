require('../styles/home.scss');
import React, {Component} from 'react';
import MessageList from './MessageList.jsx';

class Messages extends Component {
  render() {
    return (

      <div>

        <main className="messages">

          {this.props.messages.map((message) =>
            (<MessageList list={message} key={message.id} />))
          }

          <div className="message system">
            Anonymous1 changed their name to NootNoot!
          </div>

        </main>

      </div>
    );
  }
}

export default Messages;
