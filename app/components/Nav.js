import React from 'react'
import { ThemeConsumer } from '../contexts/theme'
// import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="row space-between">
          <button
            className="btn-clear"
            style={{ fontSize: 30 }}
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🔦' : '💡'}
          </button>
        </nav>
      )}
    </ThemeConsumer>
    // <ul className="nav">
    //   <li>
    //     {/* <NavLink exact activeClassName="active" to="/"> */}
    //       Home
    //     {/* </NavLink> */}
    //   </li>
    //   <li>
    //     {/* <NavLink activeClassName="active" to="/battle"> */}
    //       Battle
    //     {/* </NavLink> */}
    //   </li>
    //   <li>
    //     {/* <NavLink activeClassName="active" to="/popular"> */}
    //       Popular
    //     {/* </NavLink> */}
    //   </li>
    // </ul>
  )
}
