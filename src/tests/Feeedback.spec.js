import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testing the Feedback.jsx page', () => {
  it('test if the component exists', () => {
    renderWithRouterAndRedux(<App />);
    const PLAYER_USER = 'player';
    const PLAYER_EMAIL = 'player@test.com';
    const labelUser = screen.getByLabelText(USERNAME);
    const labelEmail = screen.getByLabelText(EMAIL);

  });


  it('Testando se é possivel interagir com os inputs', () => {
    renderWithRouterAndRedux(<Login />);

    const USERNAME = 'Username';
    const EMAIL = 'Email';
    const CONTENT_EMAIL = 'dinhoouropreto@email.com';
    const CONTENT_USERNAME = 'Dinho Ouro Preto';

    const labelUser = screen.getByPlaceholderText(USERNAME);
    const labelEmail = screen.getByPlaceholderText(EMAIL);

    userEvent.type(labelUser, CONTENT_USERNAME);
    userEvent.type(labelEmail, CONTENT_EMAIL);

    expect(labelUser.value).toEqual(CONTENT_USERNAME);
    expect(labelEmail.value).toEqual(CONTENT_EMAIL);
  });

  it('Testando o link do botão \'Play\'', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const USERNAME = 'Username';
    const EMAIL = 'Email';
    const CONTENT_EMAIL = 'dinhoouropreto@email.com';
    const CONTENT_USERNAME = 'Dinho Ouro Preto';

    const labelUser = screen.getByPlaceholderText(USERNAME);
    const labelEmail = screen.getByPlaceholderText(EMAIL);

    userEvent.type(labelUser, CONTENT_USERNAME);
    userEvent.type(labelEmail, CONTENT_EMAIL);

    expect(labelUser.value).toEqual(CONTENT_USERNAME);
    expect(labelEmail.value).toEqual(CONTENT_EMAIL);

    const btnPlay = screen.getByTestId('btn-play');
    userEvent.click(btnPlay);
    const { location: { pathname } } = history;

    expect(pathname).toEqual('/game');
  });

  it('Testando o link do botão \'Settings\'', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const btnSettings = screen.getByTestId('btn-settings');
    userEvent.click(btnSettings);
    const { location: { pathname } } = history;

    expect(pathname).toEqual('/config');
  });
});
