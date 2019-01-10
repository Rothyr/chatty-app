require('../styles/home.scss');
import React, {Component} from 'react';


class MessageList extends Component {
  render() {
    console.log(this.props)
    return (

      <div className="message">
        <span className="message-username">{this.props.list.username}</span>
        <span className="message-content">{this.props.list.content}</span>
      </div>

    )
  }
}

export default MessageList;
