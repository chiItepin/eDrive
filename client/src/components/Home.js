/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { apiFiles } from '../services/api/apiFiles';
import { useStore } from '../globalStore/store'
import { useSnackbar } from 'react-simple-snackbar'
import moment from 'moment';

const Home = () => {
  const [openSnackbar] = useSnackbar({position: 'top-right'})
  const [listPage, setListPage] = useState(1);
  const [listOfFiles, setListOfFiles] = useState([]);
  const [filesLoading, setfFilesLoading] = useState(false);
  const [listLoaded, setListLoaded] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [enableLoadMore, setEnableLoadMore] = useState(false);
  const { state } = useStore();
  const history = useHistory();
  const inputFile = useRef(null);

  const submitFile = (file) => {
    const uploadedFile = file.files[0];
    if (uploadedFile.size >= 10000000) {
      openSnackbar('Uploaded file size must be less than 10 MB');
    } else {
      setfFilesLoading(true);
      const formData = new FormData();
      formData.append('file', uploadedFile);
      openSnackbar('Uploading your file...');
      apiFiles.post(formData)
      .then((response) => {
        setfFilesLoading(false);
        openSnackbar('Uploaded successfully');
        inputFile.current.value = null;
        const updated = [...listOfFiles]
        updated.unshift(response);
        setListOfFiles([...updated]);
      })
      .catch(error => {
        openSnackbar(error.toString());
      });
    }
  };

  const getFiles = () => {
    setListLoading(true);
    apiFiles.getAll(listPage)
    .then((response) => {
      setListLoaded(true);
      if (response.length !== 0) {
        const updated = [...listOfFiles, ...response];
        setEnableLoadMore(true);
        setListLoading(false);
        setListOfFiles(updated);
      } else {
        setEnableLoadMore(false);
      }
    })
    .catch(error => {
      openSnackbar(error.toString());  
    });
  };

  const deleteFile = (id, index) => {
    openSnackbar('Deleting...');
    apiFiles.remove(id)
    .then((response) => {
      openSnackbar('Deleted successfully');
      const updated = [...listOfFiles]
      updated.splice(index, 1);
      setListOfFiles([...updated]);
    })
    .catch(error => {
      openSnackbar(error.toString());  
    });
  };

  const handleDate = (date) => {
    const dateIsValid = moment(date).isValid();
    if (dateIsValid) {
      const dateUtc = moment.utc(date, "YYYY-MM-DD HH:mm:ss");
      return dateUtc.local().calendar();
    }
    return moment().fromNow();;
  };

  useEffect(() => {
    if (!state.token) {
      history.push('/login');
    } else {
      getFiles();
    }
  }, [history, state]);

  return (
    <>
      <div className="js-upload">
          <input disabled={filesLoading} ref={inputFile} onChange={(event) => submitFile(event.target)} type="file" />
          <button className="uk-button uk-button-default uploadBtn" type="button">
            {
              filesLoading
                ? <div uk-spinner="true"></div>
                : 'Upload'
            }
          </button>
      </div>
      {
        !listLoaded
          ? <div uk-spinner="true"></div>
          : (
            <>
              <div className="uk-overflow-auto">
                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                  <thead>
                      <tr>
                          <th className="uk-table-shrink">Type</th>
                          <th className="uk-table-expand">Name</th>
                          <th className="uk-width-small">Created at</th>
                          <th className="uk-width-small">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                      listOfFiles && listOfFiles.lengh !== 0
                        ? (
                          <>
                            {
                              listOfFiles.map((file, index) => {
                                return (
                                  <tr key={file._id}>
                                    <td>
                                      {
                                        ['.png','.jpg','.gif'].some(element => file.path.includes(element))
                                          ? <span className="uk-margin-small-right" uk-icon="image"></span>
                                          : (file.path.indexOf('.pdf') > -1)
                                            ? <span className="uk-margin-small-right" uk-icon="file-pdf"></span>
                                            : <span className="uk-margin-small-right" uk-icon="file-text"></span>
                                      }
                                    </td>
                                    <td className="uk-table-link">
                                    <a className="uk-link-reset" rel="noreferrer" target="_blank" href={file.path}>{file.name}</a>
                                    </td>
                                    <td className="uk-text-nowrap">{handleDate(file.createdAt)}</td>
                                    <td className="uk-text-nowrap">
                                    <div class="uk-inline">
                                      <button class="uk-button uk-button-default" type="button"><span uk-icon="icon: more"></span></button>
                                      <div uk-dropdown="true">
                                          <ul class="uk-nav uk-dropdown-nav">
                                              <li>
                                                <a rel="noreferrer" target="_blank" href={file.path}>Open</a>
                                              </li>
                                              <li>
                                                <a href="#!" onClick={ () => deleteFile(file._id, index) }>Delete</a>
                                              </li>                                              
                                          </ul>
                                      </div>
                                    </div>
                                    </td>
                                  </tr>
                                );
                              })
                            }
                          </>
                        )
                        : null
                    }
                  </tbody>
                </table>
              </div>
              {
                  listLoaded && enableLoadMore
                    ? <button disabled={listLoading} onClick={ () => setListPage(listPage + 1) } className="uk-button uk-button-default loadbtn">Load more</button>
                    : null
                }              
            </>
          )
      }
    </>
    )
};

export default Home;
