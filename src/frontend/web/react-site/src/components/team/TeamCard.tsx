import React, {useEffect, useState} from "react"
import { team } from "../../dummydata"
import {Professeur  } from '../../generated/models';
import { ReduxProps } from '../../redux/configureStore';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../constants/LOCAL_STORAGE';
import { connect, useSelector } from 'react-redux';

import { ProfesseursApi } from '../../generated';
import environment from "../../environments/environment.dev";
const TeamCard = () => {
  const state = useSelector((state: ReduxProps) => state);
  const [enseignants, setEnseignants] = useState < Professeur[] > ([]);
  useEffect(() => {
    const apiParams: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const professeursApi = new ProfesseursApi({ ...state.environment, accessToken: apiParams });

   // setIsLoading(true)

    professeursApi.professeursIndex('Bearer ' + apiParams)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) { setEnseignants(response.data.content) }
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message)
      })
      .finally(() => {
        //setIsLoading(false)
      });
  }, []);

  return (
    <>
      {enseignants.map((val) => (
        <div className='items shadow'>
        <div className='img'>
          <img src={`${environment.basePath}/api/files/download?filekey=${val.photo}`} alt='' />
          <div className='overlay'>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
            <i className='fab fa-tiktok icon'></i>
          </div>
        </div>
        <div className='details'>
          <h2>{val.firstName}</h2>
          <p>{ val.statut}</p>

        </div>
      </div>
      ))}
    </>
  )
}


function mapStateToProps(state: ReduxProps): ReduxProps {
  return { 
      user: state.user,
      environment: state.environment,
      loggedIn: state.loggedIn,
      access_token: state.access_token,
  };
} 
export default connect(mapStateToProps)(TeamCard)
