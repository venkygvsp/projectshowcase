import {Component} from 'react'
import './index.css'

class ProjectsData extends Component {
  render() {
    const {item} = this.props
    return (
      <li className="project-lists">
        <div className="project-card">
          <img src={item.imageUrl} alt={item.name} className="project-img" />
          <p className="proj-head">{item.name}</p>
        </div>
      </li>
    )
  }
}

export default ProjectsData
