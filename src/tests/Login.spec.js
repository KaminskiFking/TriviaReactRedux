import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testando o componente <Login />', () => {
  it('Testando se é exibida na tela as labels com os textos "Username" e "Email', () => {
    renderWithRouterAndRedux(<Login />);

    const USERNAME = 'Username';
    const EMAIL = 'Email';
    const labelUser = screen.getByLabelText(USERNAME);
    const labelEmail = screen.getByLabelText(EMAIL);

    expect(labelUser).toBeInTheDocument();
    expect(labelEmail).toBeInTheDocument();
  });

  it(
    'Testando se é exibido na tela os inputs com placeholder "Username" e "Email"',
    () => {
      renderWithRouterAndRedux(<Login />);

      const USERNAME = 'Username';
      const EMAIL = 'Email';
      const labelUser = screen.getByPlaceholderText(USERNAME);
      const labelEmail = screen.getByPlaceholderText(EMAIL);

      expect(labelUser).toBeInTheDocument();
      expect(labelEmail).toBeInTheDocument();
    },
  );

  it('Testando se é exibido na tela os link de navegação', () => {
    renderWithRouterAndRedux(<Login />);

    const linkItem = screen.getAllByRole('link');

    expect(linkItem).toHaveLength(2);
  });

  it('Testando se é exibido os botões "Play" e "Settings', () => {
    renderWithRouterAndRedux(<Login />);

    const btnPlay = screen.getByTestId('btn-play');
    const btnSettings = screen.getByTestId('btn-settings');

    expect(btnPlay).toBeInTheDocument();
    expect(btnPlay).toHaveTextContent('Play');
    expect(btnSettings).toBeInTheDocument();
    expect(btnSettings).toHaveTextContent('Settings');
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
