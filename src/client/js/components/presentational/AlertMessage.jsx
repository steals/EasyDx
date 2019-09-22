import React, { Component } from 'react';

class AlertMessage extends Component {
  render() {
    const alertClass = `alert bg-${this.props.alertClass}`;
    return (
      <div className={alertClass}>
        <i className="fas fa-exclamation-circle fa-lg" /> {this.props.message}
      </div>
    );
  }
}

export default AlertMessage;
