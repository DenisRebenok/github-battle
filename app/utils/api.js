const id = '25998991c1faf17e2ccf'
const sec = 'a89f618eb33d214a94f28a70e21913543e525c35'
const params = `?client_id=${id}&client_secret=${sec}`

async function getProfile(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}${params}`
  )
  return response.json()
}

async function getRepos(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  )

  return response.json()
}

function getStarCount(repos) {
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  )
}

function calculateScore({ followers }, repos) {
  return followers * 3 + getStarCount(repos)
}

function handleError(error) {
  console.warn(error)
  return null
}

async function getUserData(player) {
  const [profile, repos] = await Promise.all([
    getProfile(player),
    getRepos(player)
  ])
  return {
    profile,
    score: calculateScore(profile, repos)
  }
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score)
}

export async function battle(players) {
  return Promise.all(players.map(getUserData))
    .then(results => sortPlayers(results))
    .catch(handleError)
}

export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  )

  return fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      if (!data.items) {
        throw new Error(data.message)
      }

      return data.items
    })
}
