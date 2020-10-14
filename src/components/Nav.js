import React from "react"
import { NavLink } from 'react-router-dom'


export default function Nav() {
  return (
    <ActivePage />
  );
}

class ActivePage extends React.Component {
  state = {
    home: true,
    tasks: false
  }
  render() {
    return (
  
      <nav>
        <ul>
          <li>
            <NavLink id="homeTab" 
            className={ this.state.home ? "tab-active": "tab-inactive"}
            onClick={() => this.setState({home: true,tasks: false})}
            to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink id="taskTab" 
            className={ this.state.tasks ? "tab-active2": "tab-inactive"}
            onClick={() => this.setState({home: false, tasks: true})}
            to='/Tasks'>Tasks</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
  
