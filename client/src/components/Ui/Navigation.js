import React from 'react';
import { useStore } from '../../globalStore/store';
import {
    Link,
    useLocation,
    useHistory
  } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

const Navigation = () => {
    const location = useLocation();
    const history = useHistory();

    const { state, dispatch } = useStore();

    return (
        <>
            <nav className="uk-navbar-container">
                <div className="uk-navbar-left">
                <Link className="uk-navbar-item uk-logo" to={ROUTES.HOME}>eDrive</Link>
                    <ul className="uk-navbar-nav">
                        {
                            state.token
                            ? (
                                <li className={location.pathname === ROUTES.LOGIN ? 'uk-active' : null }>
                                    <a onClick={ () => { dispatch({ type: 'updateToken', value: null }); history.push('/login'); } } href="#logout">Logout</a>
                                </li>  
                            )
                            : (
                                <>
                                    <li className={location.pathname === ROUTES.REGISTER ? 'uk-active' : null }>
                                        <Link to={ROUTES.REGISTER}>Sign up</Link>
                                    </li>
                                    <li className={location.pathname === ROUTES.LOGIN ? 'uk-active' : null }>
                                        <Link to={ROUTES.LOGIN}>Login</Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>                 
                </div>
            </nav>
        </>
    )
};

export default Navigation;
