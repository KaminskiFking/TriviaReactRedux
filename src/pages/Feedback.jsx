import React, { Component } from 'react';

class Feedback extends Component {
  resultFeedback = () => {
    const value = 3;
    const beBetter = 3;
    if (value <= beBetter) {
      return 'Could be better...';
    }
    return 'Well Done!';
  };

  render() {
    const result = this.resultFeedback();
    return (
      <div>
        <p data-testid="feedback-text">{result}</p>
      </div>
    );
  }
}

export default Feedback;
