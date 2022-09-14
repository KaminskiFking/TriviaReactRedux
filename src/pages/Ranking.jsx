import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
    };
  }

  componentDidMount() {
    const { players } = this.props;
    const n = -1;
    players.sort((a, b) => {
      if (a.score > b.score) return n;
      if (a.score < b.score) return 1;
      return 0;
    });
    this.setState({ players });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { players } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { players.map((player, index) => (
          <div key={ player.hash }>
            <img src={ `https://www.gravatar.com/avatar/${player.hash}` } alt="avatar" />
            <div>
              <p
                data-testid={ `player-name-${index}` }
              >
                { player.name }
              </p>
              <div>
                <span>
                  Acertos:
                  {' '}
                  { player.assertions }
                </span>
                <span
                  data-testid={ `player-score-${index}` }
                >
                  Pontuação:
                  {' '}
                  { player.score }
                </span>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  players: PropTypes.arrayOf,
}.isRequired;

const mapStateToProps = (state) => ({
  players: state.game.players,
});

export default connect(mapStateToProps)(Ranking);
