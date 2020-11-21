import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../globalStore/store';
import { useSnackbar } from 'react-simple-snackbar'

const RegisterUser = () => {
  const [initialValue, setInitialValue] = useState([]);
  const [openSnackbar] = useSnackbar({position: 'top-right'})
  const { dispatch } = useStore();
  const history = useHistory();

  const handleInput = (property, value) => {
    const updated = { ...initialValue };
    updated[property] = value;
    setInitialValue(updated);
  };

  const submitForm = (event) => {
    event.preventDefault();
    axios.post('/api/users', initialValue)
    .then(res => {
      if(res.data){
        dispatch({ type: 'updateToken', value: res.data.data.token });
        localStorage.setItem('token', res.data.data.token);
        openSnackbar('Account created successfully');
        setInitialValue([]);
        history.push('/');
      }
    })
    .catch(err => {
      if (err.response.data.message) {
        openSnackbar(err.response.data.message);
      } else {
        openSnackbar('There was a problem creating your account');
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

        <div className="uk-margin">
            <div className="uk-inline">
                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                <input
                  onChange={(event) => handleInput('confirmPassword', event.target.value)}
                  value={initialValue.confirmPassword ? initialValue.confirmPassword : ''}
                  className={initialValue.confirmPassword && initialValue.confirmPassword.length < 6 ? 'uk-input uk-form-width-large uk-form-danger' : 'uk-input uk-form-width-large'}
                  placeholder="Confirm Password"
                  required
                  maxLength="100"
                  type="password"
                />
            </div>
        </div>        
        <button
          disabled={!initialValue.email || !initialValue.password || !initialValue.confirmPassword }
          className="uk-button uk-button-default">
            Sign Up
          </button>
      </form>
    </>
    )
};

export default RegisterUser;
