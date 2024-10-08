// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {details, changeLanguage, isActive} = props
  const {id, language} = details
  const btnClassName = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'
  const onClickButton = () => {
    changeLanguage(id)
  }
  return (
    <li className="listItem">
      <button type="button" className={btnClassName} onClick={onClickButton}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
