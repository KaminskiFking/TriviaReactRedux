import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/ranking.css';
import { goLogin } from '../services/consts';

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
    history.push(goLogin);
  };

  render() {
    const { players } = this.state;
    return (
      <div className="ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Home
        </button>
        { players.map((player, index) => (
          <div key={ player.hash } className="player">
            <img src={ `https://www.gravatar.com/avatar/${player.hash}` } alt="avatar" />
            <div className="infoPlayer">
              <p data-testid={ `player-name-${index}` }>
                { player.name }
              </p>
              <div>
                <span>
                  {`Acertos: ${player.assertions}`}
                </span>
                <span data-testid={ `player-score-${index}` }>
                  {`Pontuação: ${player.score}`}
                </span>
              </div>
            </div>
          </div>
        ))}
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
  players: state.ranking.players,
});

export default connect(mapStateToProps)(Ranking);
