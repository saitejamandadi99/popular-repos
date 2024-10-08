import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {activeLanguage: 'ALL', reposList: [], isLoading: true}

  componentDidMount() {
    this.getReposList() // Fetches repositories when the component is mounted
  }

  // Method to change the active language and fetch repositories accordingly
  changeLanguage = id => {
    this.setState(
      {activeLanguage: id, isLoading: true}, // Set the new language and start the loading process
      this.getReposList, // Fetch the repositories after setting the new active language
    )
  }

  // Method to fetch repositories from the API
  getReposList = async () => {
    const {activeLanguage} = this.state // Correct reference to activeLanguage from state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`, // Fetch repositories based on activeLanguage
    )
    const data = await response.json()
    const updatedData = data.popular_repos.map(eachObj => ({
      name: eachObj.name,
      id: eachObj.id,
      issuesCount: eachObj.issues_count,
      forksCount: eachObj.forks_count,
      starsCount: eachObj.stars_count,
      avatarUrl: eachObj.avatar_url,
    }))
    this.setState({reposList: updatedData, isLoading: false}) // Update the state with the fetched repositories and stop loading
  }

  // Method to render the list of repositories
  renderReposList = () => {
    const {reposList} = this.state
    return (
      <ul className="reposList">
        {reposList.map(repo => (
          <RepositoryItem key={repo.id} repoDetails={repo} /> // Display each repository using RepositoryItem component
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, activeLanguage} = this.state
    return (
      <div className="appContainer">
        <h1>Popular</h1>
        <ul className="languageFiltersData">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              details={each}
              key={each.id}
              changeLanguage={this.changeLanguage}
              isActive={each.id === activeLanguage} // Pass the changeLanguage method as a prop
            />
          ))}
        </ul>
        {isLoading ? (
          <div className="loader" data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
            {/* Display the loader when isLoading is true */}
          </div>
        ) : (
          this.renderReposList() // Render the repository list once data is loaded
        )}
      </div>
    )
  }
}

export default GithubPopularRepos
