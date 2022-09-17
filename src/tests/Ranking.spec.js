import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testing the Ranking.jsx page', () => {
    const INITIAL_STATE = {
        ranking: {
            players: [{
            name: 'player',
            assertions: 3,
            score: 75,
            hash:'5e9ce47004afb4ea3db4a123dadb4cb8',
          }],
        }
    }
  it('test if the component exists and have the header, button to home and the player rank', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    const RANKING_TITLE = screen.getByTestId('ranking-title');
    const BTN_HOME = screen.getByTestId('btn-go-home');
    const PLAYERS_RANK = screen.getByTestId('player-name-0');
    expect(RANKING_TITLE).toBeInTheDocument();
    expect(BTN_HOME).toBeInTheDocument();
    expect(PLAYERS_RANK).toBeInTheDocument();
  });
  it('test if when click in Home, redirect the page to /', ()=>{
    const { history }= renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
    const BTN_HOME = screen.getByTestId('btn-go-home');
    userEvent.click(BTN_HOME);
    const { location: { pathname } } = history;
    expect(pathname).toEqual('/');
  });
});
