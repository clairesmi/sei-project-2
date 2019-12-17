import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import 'bulma'
import '../src/style.scss'

import Home from './components/common/Home'
import EpisodeShow from './components/EpisodeShow'
import CharactersIndex from './components/CharactersIndex'
import CharactersShow from './components/CharactersShow'


const App = () => (
  <BrowserRouter>
    <main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/episodes/:id" component={EpisodeShow} />
        <Route path="/characters/:id" component={CharactersShow} />
        <Route path="/characters" component={CharactersIndex} />
        
      </Switch>
    </main> 
  </BrowserRouter>
)


ReactDOM.render(
  <App />,
  document.getElementById('root')
)