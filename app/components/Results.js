import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import queryString from 'query-string';
import { battle } from '../utils/api';
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser
} from 'react-icons/fa';
import Card from './Card';
// import { Link } from 'react-router-dom';
// import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <FaCompass color="rgb(144, 115, 255)" size={22} />
          {profile.location}
        </li>
      )}
      {profile.company && (
        <li>
          <FaBriefcase color="#795548" size={22} />
          {profile.company}
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}
ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
};

export default class Results extends Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  };
  async componentDidMount() {
    const { playerOne, playerTwo } = this.props;

    const players = await battle([playerOne, playerTwo]);

    if (players === null) {
      return this.setState(() => ({
        error:
          'Looks like there was error. Check that both users exist on Github',
        loading: false
      }));
    }

    this.setState({
      error: null,
      winner: players[0],
      loser: players[1],
      loading: false
    });
  }
  render() {
    const { error, winner, loser, loading } = this.state;

    if (loading === true) {
      return <Loading />;
    }

    if (error) {
      return (
        <div>
          <p className="center-text error">{error}</p>
          {/* <Link to="/battle">Reset</Link> */}
        </div>
      );
    }

    return (
      <>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile} />
          </Card>
          <Card
            header={loser.score === loser.score ? 'Tie' : 'Loser'}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            href={loser.profile.html_url}
            name={loser.profile.login}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <button onClick={this.props.onReset} className="btn dark-btn btn-space">
          Reset
        </button>
      </>
    );
  }
}

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
};
