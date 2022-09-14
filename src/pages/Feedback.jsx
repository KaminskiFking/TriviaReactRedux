import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { savePlayers } from '../redux/actions';

class Feedback extends Component {
  componentDidMount() {
    const { dispatch, assertions, email, name, score } = this.props;
    const hash = md5(email).toString();
    const player = { assertions, name, score, hash };
    dispatch(savePlayers(player));
  }

  resultFeedback = () => {
    const { answersMultiple, answersTrueOrFalse } = this.props;
    const result = answersMultiple + answersTrueOrFalse;
    const beBetter = 3;
    if (result === beBetter || result > beBetter) {
      return 'Well Done!';
    }
    if (result < beBetter) {
      return 'Could be better...';
    }
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { score, assertions } = this.props;
    const resultFeedback = this.resultFeedback();
    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-text">{resultFeedback}</p>
        <h1 data-testid="feedback-total-question">{assertions}</h1>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ranking</button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  answersMultiple: PropTypes.number,
  answersTrueOrFalse: PropTypes.number,
  score: PropTypes.number,
  assertions: PropTypes.number,
  email: PropTypes.string,
  name: PropTypes.string,
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => {
  console.log(state.player);
  return {
    answersMultiple: state.player.answers,
    assertions: state.player.assertions,
    score: state.player.score,
    answersTrueOrFalse: state.player.trueAnswers,
    name: state.player.name,
    email: state.player.email,
  };
};

export default connect(mapStateToProps)(Feedback);
