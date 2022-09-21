import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { mockData, countTimer } from './helpers/mockData';

describe('Testing the Game.jsx page', () => {
    const INITIAL_STATE = {
        player: {
            score: 0,
            name: 'flashwispy',
            email: 'test@email.com',
            questions: {
              results: mockData.results,
            }
        }
    }
  it('test if the game works and loaded the questions and answers, beyond redirect after the fifth answer', async () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
      const QUESTION_CATEGORY = screen.getByTestId("question-category");
      const ANSWER_OPTIONS = screen.getByTestId("answer-options");
      const CORRECT_ANSWER = screen.getByTestId("correct-answer");
      const QUESTION_TIMER = screen.getByTestId("question-timer");
      expect(QUESTION_CATEGORY).toBeInTheDocument();
      expect(ANSWER_OPTIONS).toBeInTheDocument();
      expect(CORRECT_ANSWER).toBeInTheDocument();
      expect(QUESTION_TIMER).toBeInTheDocument();
      userEvent.click(CORRECT_ANSWER);
      const BTN_NEXT = screen.getByTestId("btn-next");
      expect(BTN_NEXT).toBeInTheDocument();
      userEvent.click(BTN_NEXT);
      expect(screen.getByTestId('question-text').innerHTML).toBe('What was the FIRST Valve game to have VR?');
      userEvent.click(CORRECT_ANSWER);
      userEvent.click(BTN_NEXT);
      userEvent.click(CORRECT_ANSWER);
      userEvent.click(BTN_NEXT);
      userEvent.click(CORRECT_ANSWER);
      userEvent.click(BTN_NEXT);
      userEvent.click(CORRECT_ANSWER);
      userEvent.click(BTN_NEXT);
      expect(history.location.pathname).toBe('/feedback');
  });
  it('test if the code has 3, return to the Login page', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        response_code: 3,
      }),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId("input-player-name");
    const emailInput= screen.getByTestId("input-gravatar-email");
    const btnLogin = screen.getByTestId("btn-play");
    userEvent.type(nameInput, 'flashwispy');
    userEvent.type(emailInput, 'test@email.com');
    userEvent.click(btnLogin);
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });
  it('test if the counter of the question works and when the times gets to zero the options are disabled', async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
    const QUESTION_TIMER = screen.getByTestId("question-timer");
    expect(QUESTION_TIMER.innerHTML).toBe('30');
    await countTimer();
    expect(screen.getByTestId("question-timer").innerHTML).toBe('29');
    for(let x = 0; x < 30; x += 1) {
      await countTimer();
    }
    const CORRECT_ANSWER = screen.getByTestId("correct-answer");
    expect(CORRECT_ANSWER).toHaveProperty('disabled', true);
  }, 35000);
  it('test the score is right when are right or wrong answers', async() => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
    const CORRECT_ANSWER = screen.getByTestId("correct-answer");
    userEvent.click(CORRECT_ANSWER);
    const BTN_NEXT = screen.getByTestId("btn-next");
    userEvent.click(BTN_NEXT);
    const HEADER_SCORE = screen.getByTestId("header-score");
    expect(HEADER_SCORE.innerHTML).toBe('40');
    const WRONG_ANSWER = screen.getByText(`10`);
    userEvent.click(WRONG_ANSWER);
    userEvent.click(BTN_NEXT);
    expect(screen.getByTestId("header-score").innerHTML).toBe('40');
    userEvent.click(screen.getByTestId("correct-answer"));
    userEvent.click(BTN_NEXT);
    expect( screen.getByTestId("header-score").innerHTML).toBe('110');
    userEvent.click(screen.getByTestId("correct-answer"));
    userEvent.click(BTN_NEXT);
    expect( screen.getByTestId("header-score").innerHTML).toBe('210');
  });
  it('test if the component TrueOrFalse is render is the right way with all the elements', ()=> {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
    for(let x = 0; x < 4; x += 1) {
      const CORRECT_ANSWER = screen.getByTestId("correct-answer")
      userEvent.click(CORRECT_ANSWER);
      const BTN_NEXT = screen.getByTestId("btn-next");
      userEvent.click(BTN_NEXT);
    }
    const QUESTION_CATEGORY = screen.getByTestId("question-category");
    const ANSWER_OPTIONS = screen.getByTestId("answer-options");
    const QUESTION_TIMER = screen.getByTestId("question-timer");
    const correctAnswer = screen.getByTestId("correct-answer");
    const QUESTION_TEXT = screen.getByTestId("question-text");
    const WRONG_ANSWER = screen.getByText("False");
    expect(QUESTION_CATEGORY).toBeInTheDocument();
    expect(ANSWER_OPTIONS).toBeInTheDocument();
    expect(QUESTION_TIMER).toBeInTheDocument();
    expect(WRONG_ANSWER).toBeInTheDocument();
    expect(QUESTION_TEXT.innerHTML).toBe('The Xenomorph from the science fiction film, Alien, has acidic blood.');
    expect(correctAnswer.innerHTML).toBe("True");
    userEvent.click(correctAnswer);
    expect(correctAnswer).toHaveProperty('className', 'correct-answer');
    const BTN_NEXT = screen.getByTestId("btn-next");
    userEvent.click(BTN_NEXT);
  });
});
