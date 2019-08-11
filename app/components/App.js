import React from 'react'
import Popular from './Popular'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'
import Results from './Results'
import { ThemeProvider } from '../contexts/theme'

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }))
    }
  }
  render() {
    return (
      <ThemeProvider value={this.state}>
        {/* <Router> */}
        <div id="app" className={this.state.theme}>
          <div className="container">
            <Nav />
            <Battle />
          </div>
          {/* <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/battle" component={Battle} />
              <Route path="/battle/results" component={Results} />
              <Route path="/popular" component={Popular} />
              <Route render={() => <p>Not Found</p>} />
            </Switch> */}
        </div>
        {/* </Router> */}
      </ThemeProvider>
    )
  }
}

export default App
