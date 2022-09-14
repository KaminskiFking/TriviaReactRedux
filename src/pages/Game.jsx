import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { goLogin } from '../services/consts';

class Game extends Component {
  componentDidUpdate() {
    const { history, questions } = this.props;
    const objVerify = {
      response_code: 3,
      results: [],
    };
    if (questions.response_code === objVerify.response_code) {
      localStorage.removeItem('token');
      history.push(goLogin);
    }
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <Questions history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.player.questions,
});

export default connect(mapStateToProps)(Game);
