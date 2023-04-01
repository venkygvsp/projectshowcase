import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import ProjectsData from '../ProjectsData'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const constantTypes = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Projects extends Component {
  state = {
    category: categoriesList[0].id,
    data: [],
    apiStatus: constantTypes.initial,
  }

  componentDidMount() {
    this.getProjects()
  }

  changeCategory = event => {
    this.setState({category: event.target.value}, this.getProjects)
  }

  getProjects = async () => {
    this.setState({apiStatus: constantTypes.loading})
    const {category} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${category}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.projects.map(item => ({
        id: item.id,
        name: item.name,
        imageUrl: item.image_url,
      }))
      this.setState({data: updatedData, apiStatus: constantTypes.success})
    } else {
      this.setState({apiStatus: constantTypes.failure})
    }
  }

  renderSuccess = () => {
    const {data} = this.state
    return (
      <ul className="project-items">
        {data.map(item => (
          <ProjectsData item={item} key={item.id} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="failure-btn" onClick={this.getProjects}>
        Retry
      </button>
    </div>
  )

  renderStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constantTypes.success:
        return this.renderSuccess()
      case constantTypes.failure:
        return this.renderFailure()
      case constantTypes.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {category} = this.state
    return (
      <div className="container">
        <div className="header-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            className="header-img"
            alt="website logo"
          />
        </div>
        <div className="category-list">
          <select
            name="category"
            className="input"
            value={category}
            onChange={this.changeCategory}
          >
            {categoriesList.map(item => (
              <option key={item.id} value={item.id}>
                {item.displayText}
              </option>
            ))}
          </select>
          <div className="project-data">{this.renderStatus()}</div>
        </div>
      </div>
    )
  }
}

export default Projects
