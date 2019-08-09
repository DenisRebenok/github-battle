import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from 'react-icons/fa';
import Loading from './Loading';

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map(({ name, owner, stargazers_count, html_url }, index) => (
        <li key={html_url}>
          <div className="popular-rank">#{index + 1}</div>
          <ul className="card-list">
            <li>
              <img
                src={owner.avatar_url}
                alt={'Avatar for ' + owner.login}
                className="avatar"
              />
            </li>
            <li>
              <a href={html_url}>{name}</a>
            </li>
            <li>@{owner.login}</li>
            <li>
              <FaStar color="rgb(255, 215, 0)" size={22} />
              {stargazers_count.toLocaleString()} stars
            </li>
          </ul>
        </li>
      ))}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="flex-center">
      {languages.map(language => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

export default class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: {},
    error: null
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = async selectedLanguage => {
    this.setState(() => ({
      selectedLanguage,
      error: null
    }));

    // if selectedLanguage doesn't already exist in repos object
    if (!this.state.repos[selectedLanguage]) {
      const newRepos = await fetchPopularRepos(selectedLanguage);
      try {
        this.setState(({ repos }) => ({
          repos: {
            ...repos,
            [selectedLanguage]: newRepos
          },
          error: null
        }));
      } catch (err) {
        console.warn('Error fetching repos: ', err);
        this.setState(() => ({
          error: 'There was an error fetching the repositories.'
        }));
      }
    }
  };

  isLoading() {
    const { selectedLanguage, repos, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
        {this.isLoading() && <Loading text="Fetching Repos" />}
        {error && <p>{error}</p>}
        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </>
    );
  }
}
