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

  }
  render() {
    return (
  
      <nav>
        <ul>
          <li>
            <NavLink id="homeTab" 
            className={ this.state.home ? "tab-active": "tab-inactive"}
            onClick={() => this.setState({home: true})}
            to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink id="taskTab" 
            className={ this.state.home ? "tab-inactive": "tab-active2"}
            onClick={() => this.setState({home: false})}
            to='/Tasks'>Tasks</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
  
