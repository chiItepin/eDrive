import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '../../globalStore/store';
import { useSnackbar } from 'react-simple-snackbar'

const LoginUser = () => {
  const [initialValue, setInitialValue] = useState([]);
  const [openSnackbar] = useSnackbar({position: 'top-right'})
  const { state, dispatch } = useStore();
  const history = useHistory();

  useEffect(() => {
    // console.log('mounted');
  }, []);

  const handleInput = (property, value) => {
    const updated = { ...initialValue };
    updated[property] = value;
    setInitialValue(updated);
  };

  const submitForm = (event) => {
    event.preventDefault();
    axios.post('/api/authenticate/user', initialValue)
    .then(res => {
      if(res.data){
        openSnackbar('Logged in successfully');
        dispatch({ type: 'updateToken', value: res.data.data });
        localStorage.setItem('token', res.data.data);
        setInitialValue([]);
        history.push('/');
      }
    })
    .catch(err => {
      if (err.response.data.message) {
        openSnackbar(err.response.data.message);
      } else {
        openSnackbar('There was a problem logging in');
      }
    })
  };

  const getUsers = () => {
    axios.get('/api/users',
    {
        headers: {
          Authorization: 'Bearer '+ state.token
        }
    })
      .then(res => {
      if(res.data){
      
      }
    })
    .catch(err => {
      if (err.response.data.message) {
        openSnackbar(err.response.data.message);
      } else {
        openSnackbar('There was a problem retrieving users');
      }
    })
  };

  return (
    <>
      <form onSubmit={(event) => { submitForm(event); }}>
        <div className="uk-margin">
            <div className="uk-inline">
                <span className="uk-form-icon" uk-icon="icon: user"></span>
                <input required onChange={(event) => handleInput('email', event.target.value)} value={initialValue.email ? initialValue.email : ''} className="uk-input uk-form-width-large" placeholder="Email" maxLength="100" type="text" />
            </div>
        </div>
        <div className="uk-margin">
            <div className="uk-inline">
                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                <input
                  onChange={(event) => handleInput('password', event.target.value)}
                  value={initialValue.password ? initialValue.password : ''}
                  className={initialValue.password && initialValue.password.length < 6 ? 'uk-input uk-form-width-large uk-form-danger' : 'uk-input uk-form-width-large'}
                  placeholder="Password"
                  required
                  maxLength="100"
                  type="password"
                />
            </div>
        </div>

        <button
          disabled={!initialValue.email || !initialValue.password}
          className="uk-button uk-button-default">
            Login
          </button>
      </form>
    </>
    )
};

export default LoginUser;
