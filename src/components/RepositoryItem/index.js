// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {id, name, issuesCount, starsCount, avatarUrl, forksCount} = repoDetails
  return (
    <li className="repoItem">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="repoName">{name}</h1>
      <div className="dataContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="imagesmall"
        />
        <p>{starsCount} stars</p>
      </div>

      <div className="dataContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="imagesmall"
        />{' '}
        <p>{forksCount} forks</p>
      </div>

      <div className="dataContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="imagesmall"
        />{' '}
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
