import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchTokenAPI, requestUser } from '../redux/actions';
import '../style/login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handClickApi = () => {
    const { dispatch, history } = this.props;
    dispatch(fetchTokenAPI());
    dispatch(requestUser(this.state));
    history.push('/game');
  };

  render() {
    const { username, email } = this.state;
    return (
      <div className="formLogin">
        <form>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              id="username"
              className="username"
              placeholder="Username"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              value={ username }
            />
          </label>

          <label htmlFor="email">
            <input
              data-testid="input-gravatar-email"
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              className="email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <div className="buttonsLogin">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !username || !email }
              onClick={ this.handClickApi }
            >
              Play
            </button>
            <Link to="/config">
              <button
                type="button"
                data-testid="btn-settings"
              >
                Settings
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
