import React, { useEffect, useState } from "react"
import { testimonal } from "../../../dummydata"
import Heading from "../../common/heading/Heading"
import "./style.css"
import { ReduxProps } from '../../../redux/configureStore';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../../constants/LOCAL_STORAGE';
import { connect, useSelector } from 'react-redux';

import environment from "../../../environments/environment.dev";
import { Eleve } from "../../../generated/models/eleve";
import { ElevesApi } from "../../../generated/index";

const Testimonal = () => {
  const state = useSelector((state: ReduxProps) => state);
  const [eleves, setEleves] = useState < Eleve[] > ([]);
  useEffect(() => {
    const apiParams: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    const elevesApi = new ElevesApi({ ...state.environment, accessToken: apiParams });

   // setIsLoading(true)

    elevesApi.mostDisciplinesEleves()
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) { setEleves(response.data.content) }
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message)
      })
      .finally(() => {
        //setIsLoading(false)
      });
  }, []);
console.log(eleves)
  return (
    <>
      <section className='testimonal padding flex sm:block'>
        <div className='container'>
          <Heading subtitle='' title='Nos meilleurs élèves' />

          <div className='content grid2'>
            {eleves.map((val, key) => (
              <div className='items shadow' key={key}>
                <div className='box flex'>
                  <div className='img'>
                    <img src={`${environment.basePath}/api/files/download?filekey=${val.cover}`} alt={val.firstName} />
                    <i className='fa fa-quote-left icon'></i>
                  </div>
                  <div className='name'>
                    <h2>{val.firstName + val.lastName}</h2>
                    <h3>{val.sexe}</h3>
                    <span>{val.classe.name + (val.classe.speciality? val.classe.speciality: ' ') + val.classe.no}</span>
                    
                  </div>
                </div>
                <p>No de faute : {val.fautes_count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonal
