import React from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Planning from './pages/Planning.jsx';
import Profile from './pages/Profile.jsx';
import Info from './pages/Info.jsx';
import DrawerRouterContainer from './components/DrawerRouterContainer.jsx';

import './App.scss';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <DrawerRouterContainer>
            <Switch>
                <Route exact={true} path="/" component={Dashboard} />
                <Route exact={true} path="/planning" component={Planning} />
                <Route exact={true} path="/profile" component={Profile} />
                <Route exact={true} path="/info" component={Info} />
            </Switch>
        </DrawerRouterContainer>
      </HashRouter>
    </div>
  );
}

export default App;
