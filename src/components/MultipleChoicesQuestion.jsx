import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestShowBtnNext, requestScore, correctAnswers } from '../redux/actions';

class MultipleChoicesQuestion extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      endTime: false,
      disable: false,
      border: false,
      answers: 1,
    };
  }

  componentDidMount() {
    const velocidade = 1000;
    setInterval(() => this.setTimer(), velocidade);
  }

  setTimer = () => {
    const { timer, endTime } = this.state;
    const { dispatch } = this.props;
    if (timer === 1) {
      const velocidade = 1000;
      const interval = setInterval(() => this.setTimer(), velocidade);
      clearInterval(interval);
      this.setState({ disable: true, endTime: true });
      dispatch(requestShowBtnNext(true));
    }
    if (!endTime) this.setState({ timer: timer - 1 });
  };

  shuffleAnswers = (array) => {
    const number = 0.5;
    array.sort(() => number - Math.random());
  };

  submitAnswer = ({ target }) => {
    const { value } = target;
    const { dispatch, question } = this.props;
    const { timer, answers } = this.state;
    if (value === question.correct_answer) {
      const baseValue = 10;
      let valueDifficult = 0;
      if (question.difficulty === 'hard') {
        valueDifficult = '3';
      }
      if (question.difficulty === 'medium') {
        valueDifficult = '2';
      }
      if (question.difficulty === 'easy') {
        valueDifficult = '1';
      }
      const score = baseValue + (timer * Number(valueDifficult));
      this.setState({ answers: answers + 1 });
      dispatch(correctAnswers(answers));
      dispatch(requestScore(score));
    }
    this.setState({ border: true });
    dispatch(requestShowBtnNext(true));
  };

  render() {
    const { timer, disable, border } = this.state;

    const { question } = this.props;
    const arrayAnswers = [question.correct_answer, ...question.incorrect_answers];
    this.shuffleAnswers(arrayAnswers);

    return (
      <div>
        Tempo para responder:
        { timer }
        segundos
        { question && (
          <div>
            <fieldset>

              <div data-testid="question-category">{question.category}</div>
              <div>{question.difficulty}</div>
              <div data-testid="question-text">{question.question}</div>

              <div data-testid="answer-options">
                {arrayAnswers.map((element, index) => {
                  if (element === question.correct_answer) {
                    return (
                      <button
                        key="correct-answer"
                        className={ border && 'correct-answer' }
                        data-testid="correct-answer"
                        type="button"
                        value={ element }
                        disabled={ disable }
                        onClick={ this.submitAnswer }
                      >
                        {element}
                      </button>
                    );
                  }
                  return (
                    <button
                      key={ index }
                      className={ border && 'wrong-answer' }
                      data-testid={ `wrong-answer-${index}` }
                      type="button"
                      value={ element }
                      disabled={ disable }
                      onClick={ this.submitAnswer }
                    >
                      {element}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>
        ) }
      </div>
    );
  }
}

MultipleChoicesQuestion.propTypes = {
  dispatch: PropTypes.func.isRequired,
  question: PropTypes.shape({
    category: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.shape(PropTypes.object.isRequired),
    incorrect_answers: PropTypes.shape(PropTypes.object.isRequired),
  }).isRequired,
};

export default connect()(MultipleChoicesQuestion);
