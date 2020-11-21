import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '../globalStore/store'
import { useSnackbar } from 'react-simple-snackbar'

const Home = () => {
  const [openSnackbar] = useSnackbar({position: 'top-right'})
  const { state } = useStore();
  const history = useHistory();

  const inputFile = useRef(null);

  useEffect(() => {
    if (!state.token) {
      history.push('/login');
    }
  }, [history, state.token]);

  const submitFile = (file) => {
    const uploadedFile = file.files[0];
    if (uploadedFile.size >= 10000000) {
      openSnackbar('Uploaded file size must be less than 10 MB');
    } else {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      openSnackbar('Uploading your file...');
  
      axios.post('/api/files', formData,
      {
          headers: {
              Authorization: 'Bearer '+ state.token
          }
      })
      .then(res => {
        if(res.data){
          openSnackbar('Uploaded successfully');
          inputFile.current.value = null;
        }
      })
      .catch(err => {
        if (err.response.data.message) {
          openSnackbar(err.response.data.message);
        } else {
          openSnackbar('There was a problem uploaded the file');
        }
      })
    }
  };

  return (
    <>
        <div className="js-upload">
            <input ref={inputFile} onChange={(event) => submitFile(event.target)} type="file" />
            <button className="uk-button uk-button-default uploadBtn" type="button">Upload</button>
        </div>
    </>
    )
};

export default Home;
