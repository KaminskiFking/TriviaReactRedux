import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TrueOrFalseQuestion extends Component {
  constructor(props) {
    super(props);
    const { shuffleAnswers, question } = this.props;
    this.state = { answers: shuffleAnswers(question) };
  }

  componentDidMount() {
    const { setTimer } = this.props;
    const velocidade = 1000;
    setInterval(() => setTimer(), velocidade);
  }

  componentDidUpdate(prevProps) {
    const { changeAnswers, question, shuffleAnswers } = this.props;
    if (changeAnswers !== prevProps.changeAnswers) {
      this.setState({ answers: shuffleAnswers(question) });
    }
  }

  render() {
    const { timer, disable, border, submitAnswer, question } = this.props;
    const { answers } = this.state;
    return (
      question && (
        <fieldset>
          <div>
            Tempo para responder:
            <span data-testid="question-timer">{ timer }</span>
            segundos
          </div>
          <div data-testid="question-category">{question.category}</div>
          <div>{question.difficulty}</div>
          <div data-testid="question-text">{question.question}</div>
          <div data-testid="answer-options">
            {answers.map((element, index) => {
              if (element === question.correct_answer) {
                return (
                  <button
                    key="correct-answer"
                    className={ border && 'correct-answer' }
                    data-testid="correct-answer"
                    type="button"
                    value={ element }
                    disabled={ disable }
                    onClick={ submitAnswer }
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
                  onClick={ submitAnswer }
                >
                  {element}
                </button>
              );
            })}
          </div>
        </fieldset>
      )
    );
  }
}

TrueOrFalseQuestion.propTypes = {
  changeAnswers: PropTypes.bool.isRequired,
  shuffleAnswers: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  setTimer: PropTypes.func.isRequired,
  border: PropTypes.bool.isRequired,
  disable: PropTypes.bool.isRequired,
  submitAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    category: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.shape(PropTypes.object.isRequired),
    incorrect_answers: PropTypes.shape(PropTypes.object.isRequired),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(TrueOrFalseQuestion);
