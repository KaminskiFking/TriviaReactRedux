import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testing the Feedback.jsx page', () => {
    const GOOD_RESULT = {
        player: {
            answers: 3,
            email: 'test@email.com',
            name: 'player',
            assertions: 5,
            trueAnswers: 2,
            score: 200,
          }
    }
    const BAD_RESULT = {
        player: {
            answers: 0,
            email: 'test@email.com',
            name: 'player',
            assertions: 1,
            trueAnswers: 1,
            score: 23,
          }
    }
  it('test if the component exists and appear all the infos of the game', () => {
    const { history } = renderWithRouterAndRedux(<App />, GOOD_RESULT, '/feedback');
    const { location: { pathname } } = history;
    expect(pathname).toEqual('/feedback');
    const SCORE_FEEDBACK = screen.getByTestId('feedback-total-score');
    const SCORE_TEXT = screen.getByTestId('feedback-text');
    const SCORE_QUESTION = screen.getByTestId('feedback-total-question');
    expect(SCORE_FEEDBACK.innerHTML).toBe('200');
    expect(SCORE_TEXT.innerHTML).toBe('Well Done!');
    expect(SCORE_QUESTION.innerHTML).toBe('5');
  });
  it('test if with a bad result change the text to Could Be Better!', () => {
    renderWithRouterAndRedux(<App />, BAD_RESULT, '/feedback');
    const SCORE_FEEDBACK = screen.getByTestId('feedback-text');
    expect(SCORE_FEEDBACK.innerHTML).toBe('Could be better...');
  })
  it('test if the button play again works', () => {
    const { history } = renderWithRouterAndRedux(<App />, BAD_RESULT, '/feedback');
    const PLAY_AGAIN_BTN = screen.getByTestId('btn-play-again');
    userEvent.click(PLAY_AGAIN_BTN);
    const { location: { pathname } } = history;
    expect(pathname).toEqual('/');
  });
});
