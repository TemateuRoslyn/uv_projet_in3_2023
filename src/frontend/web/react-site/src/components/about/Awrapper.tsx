import React, { useEffect, useState } from "react"
import { awrapper } from "../../dummydata"
import { ConseilDisciplinesApi, ElevesApi, FautesApi, ParentsApi, SanctionprevusApi } from "../../generated";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../constants/LOCAL_STORAGE";
import { useSelector } from "react-redux";
import { ReduxProps } from "../../redux/configureStore";
import { ConseilDiscipline, Eleve } from "../../generated/models";

const Awrapper: React.FC = () => {

  const state = useSelector((state: ReduxProps) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [conseilDisciplines, setConseilDisciplines] = useState<ConseilDiscipline[]>(
    []
  );
  const [sanctionprevus, setSanctionprevus] = useState<ConseilDiscipline[]>(
    []
  );
  const [fautes, setFautes] = useState<Eleve[]>([]);
  const [eleves, setEleves] = useState<Eleve[]>([]);
  
  useEffect(() => {
    const apiParams: string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    
    setIsLoading(true)
   
    const conseilDisciplinesApi = new ConseilDisciplinesApi({
      ...state.environment,
      accessToken: apiParams,
    });

    setIsLoading(true);


    conseilDisciplinesApi
      .conseilDisciplinesIndex('Bearer ' + apiParams)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            setConseilDisciplines(response.data.content);
          }
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

      const elevesApi = new ElevesApi({...state.environment, accessToken: apiParams});

    setIsLoading(true)
    
    elevesApi.elevesIndex('Bearer ' + apiParams)
    .then((response) => {  
      if(response && response.data){        
        if(response.data.success === true){ setEleves(response.data.content) }
      }
    })
    .catch((error) => {
      alert(error?.response?.data?.message)
    })
    .finally(() => {
      setIsLoading(false)
    });  

    const sanctionprevusApi = new SanctionprevusApi({
      ...state.environment,
      accessToken: apiParams,
    });

    setIsLoading(true);

    sanctionprevusApi
      .sanctionprevusIndex('Bearer ' + apiParams)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            setSanctionprevus(response.data.content);
          }
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

      const fautesApi = new FautesApi({...state.environment, accessToken: apiParams});

    setIsLoading(true)
    
    fautesApi.indexFautes('Bearer ' + apiParams)
    .then((response) => {  
      if(response && response.data){        
        if(response.data.success === true){ setFautes(response.data.content) }
      }
    })
    .catch((error) => {
      alert(error?.response?.data?.message)
    })
    .finally(() => {
      setIsLoading(false)
    });  
  }, []);

  return (
    <>
      <section className='awrapper'>
        <div className='container grid awrapper'>
              <div className='box flex'>
                <div className='img'>
                  <img src='https://img.icons8.com/external-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto/80/1EB2A6/external-graduation-education-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto.png' alt='' />
                </div>
                <div className='text'>
                  <h1 style={{color: '#1EB2A6'}}>{eleves.length}</h1>
                  <h3 className="m-0" style={{color: '#1EB2A6'}}>ELEVES</h3>
                </div>
              </div>
              <div className='box flex'>
                <div className='img'>
                  <img src='https://img.icons8.com/ios/80/1EB2A6/athlete.png' alt='' />
                </div>
                <div className='text'>
                  <h1 style={{color: '#1EB2A6'}}>{fautes.length}</h1>
                  <h3 className="m-0" style={{color: '#1EB2A6'}}>FAUTES</h3>
                </div>
              </div>
              <div className='box flex'>
                <div className='img'>
                  <img src='https://img.icons8.com/external-outline-icons-maxicons/80/1EB2A6/external-calender-insurance-outline-outline-icons-maxicons.png' alt='' />
                </div>
                <div className='text'>
                  <h1 style={{color: '#1EB2A6'}}>{conseilDisciplines.length}</h1>
                  <h3 className="m-0" style={{color: '#1EB2A6'}}>CONSEILS</h3>
                </div>
              </div>
              <div className='box flex'>
                <div className='img'>
                  <img src='https://img.icons8.com/ios/80/1EB2A6/macbook-idea--v3.png' alt='' />
                </div>
                <div className='text'>
                  <h1 style={{color: '#1EB2A6'}}>{sanctionprevus.length}</h1>
                  <h3 className="m-0" style={{color: '#1EB2A6'}}>SANCTIONS</h3>
                </div>
              </div>
        </div>
      </section>
    </>
  )
}

export default Awrapper
