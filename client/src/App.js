import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { StoreProvider } from './globalStore/store';
import * as ROUTES from './constants/routes';
import SnackbarProvider from 'react-simple-snackbar'

import Navigation from './components/Ui/Navigation';
import RegisterUser from './components/User/RegisterUser';
import LoginUser from './components/User/LoginUser';
import Home from './components/Home';

import './App.css';
import ScrollToTop from './ScrollToTop';

const App = () => {


  return (
    <StoreProvider>
      <Router>
        <ScrollToTop>
          <SnackbarProvider>
            <div className="App">
              <Navigation />
              <div className="uk-container">
                <Switch>
                  <Route exact path={ROUTES.HOME} component={Home} />        
                  <Route path={ROUTES.REGISTER} component={RegisterUser} />
                  <Route path={ROUTES.LOGIN} component={LoginUser} />
                </Switch>
              </div>          
            </div>
          </SnackbarProvider>
        </ScrollToTop>
      </Router>
    </StoreProvider>
  );
}

export default App;
