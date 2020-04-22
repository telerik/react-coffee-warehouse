import React from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Planning from './pages/Planning.jsx';
import Profile from './pages/Profile.jsx';
import Info from './pages/Info.jsx';
import DrawerRouterContainer from './components/DrawerRouterContainer.jsx';
import { AppContext } from './AppContext';
import { countries } from './resources/countries';

import './App.scss';

const App = () => {
    const [contextState, setContextState] = React.useState({
        languageId: 'en',
        firstName: 'Peter',
        lastName: 'Douglas',
        middleName: '',
        email: 'peter.douglas@progress.com',
        phoneNumber: '(+1) 8373-837-93-02',
        avatar: null,
        country: countries[33].name,
        isInPublicDirectory: true,
        biography: '',
        teamId: 1
    });
    const onLanguageChange = React.useCallback(
        (event) => { setContextState({...contextState, languageId: event.value.languageId}) },
        [contextState, setContextState]
    );
    const onProfileChange = React.useCallback(
        (event) => {
            setContextState({...contextState, ...event.dataItem});
        },
        [contextState, setContextState]
    );
    return (
        <div className="App">
            <AppContext.Provider value={{...contextState, onLanguageChange, onProfileChange}}>
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
            </AppContext.Provider>
        </div>
    );
}

export default App;
