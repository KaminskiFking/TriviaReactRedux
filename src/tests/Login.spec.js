import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testando o componente <Login />', () => {
  const USERNAME = 'Username';
  const EMAIL = 'Email';
  const CONTENT_EMAIL = 'dinhoouropreto@email.com';
  const CONTENT_USERNAME = 'Dinho Ouro Preto';
  it(
    'Testando se é exibido na tela os inputs com placeholder "Username" e "Email"',
    () => {
      renderWithRouterAndRedux(<App />);
      const labelUser = screen.getByPlaceholderText(USERNAME);
      const labelEmail = screen.getByPlaceholderText(EMAIL);
      expect(labelUser).toBeInTheDocument();
      expect(labelEmail).toBeInTheDocument();
    },
  );

  it('Testando se é exibido na tela os link de navegação', () => {
    renderWithRouterAndRedux(<App />);
    const buttonItem = screen.getAllByRole('button');
    expect(buttonItem).toHaveLength(2);
  });

  it('Testando se é exibido os botões "Play" e "Settings', () => {
    renderWithRouterAndRedux(<App />);
    const btnPlay = screen.getByTestId('btn-play');
    const btnSettings = screen.getByTestId('btn-settings');
    expect(btnPlay).toBeInTheDocument();
    expect(btnPlay).toHaveTextContent('Play');
    expect(btnSettings).toBeInTheDocument();
    expect(btnSettings).toHaveTextContent('Settings');
  });

  it('Testando se é possivel interagir com os inputs', () => {
    renderWithRouterAndRedux(<App />);
    const labelUser = screen.getByPlaceholderText(USERNAME);
    const labelEmail = screen.getByPlaceholderText(EMAIL);
    userEvent.type(labelUser, CONTENT_USERNAME);
    userEvent.type(labelEmail, CONTENT_EMAIL);
    expect(labelUser.value).toEqual(CONTENT_USERNAME);
    expect(labelEmail.value).toEqual(CONTENT_EMAIL);
  });

  it('Testando o link do botão \'Play\'', () => {
    const { history } = renderWithRouterAndRedux(<App />);
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
    const { history } = renderWithRouterAndRedux(<App />);
    const btnSettings = screen.getByTestId('btn-settings');
    userEvent.click(btnSettings);
    const { location: { pathname } } = history;
    expect(pathname).toEqual('/config');
  });
});
