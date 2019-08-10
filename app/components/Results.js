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

// function Profile({ info }) {
//   return (
//     <PlayerPreview avatar={info.avatar_url} username={info.login}>
//       <ul className="space-list-items">
//         {info.name && <li>{info.name}</li>}
//         {info.location && <li>{info.location}</li>}
//         {info.company && <li>{info.company}</li>}
//         <li>Followers: {info.followers}</li>
//         <li>Following: {info.following}</li>
//         <li>Public Repos: {info.public_repos}</li>
//         {info.blog && (
//           <li>
//             <a href={info.blog}>{info.blog}</a>
//           </li>
//         )}
//       </ul>
//     </PlayerPreview>
//   );
// }

// Profile.propTypes = {
//   info: PropTypes.object.isRequired
// };

function PlayerCard({ label, score, profile }) {
  return (
    <Card
      header={label}
      subheader={`Score: ${score.toLocaleString()}`}
      avatar={profile.avatar_url}
      href={profile.html_url}
      name={profile.login}
    >
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
    </Card>
  );
}

PlayerCard.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
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
      <div className="grid space-around container-sm">
        <PlayerCard
          label={winner.score === loser.score ? 'Tie' : 'Winner'}
          score={winner.score}
          profile={winner.profile}
        />
        <PlayerCard
          label={winner.score === loser.score ? 'Tie' : 'Loser'}
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    );
  }
}
