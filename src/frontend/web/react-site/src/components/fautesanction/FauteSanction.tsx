import React, { useEffect, useState } from "react"
import Back from "../common/back/Back"
import "./fautesanction.css"
import { TOKEN_LOCAL_STORAGE_KEY, USER_LOCAL_STORAGE_KEY } from "../../constants/LOCAL_STORAGE"
import { FautesApi } from "../../generated"
import { useDispatch, useSelector } from "react-redux"
import { ReduxProps } from "../../redux/configureStore"
import { TOKEN_EXPIRED } from "../../constants/RESPONSES_CODE"
import { Faute } from "../../generated/models"
import FautesSection from "../pageEleve/components/FautesSection"
import { SanctionprevusApi, ReparationsApi } from "../../generated/api"
import { SanctionPrevu } from "../../generated/models/sanction-prevu"

const FauteSanction = () => {
  const state = useSelector((state: ReduxProps) => state);
  const dispatch = useDispatch();
  const [showIndicator, setShowIndicator] = useState<boolean>(false);
  const [fautes, setFautes] = useState<Faute[]>([]);
  const [sanctions, setSanctions] = useState<SanctionPrevu[]>([]);
  const [reparations, setReparations] = useState<ReparationsApi[]>([]);
    


  const authUser = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY))
  if(authUser.roles[0].description == "ELEVE")
  {
    useEffect(()=>{
      const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)

      const apiReparation = new ReparationsApi({
        ...state.environment,
        accessToken: token,
      });
      console.log("here");
      apiReparation
        .reparationsIndex( "Bearer " + token,  authUser.model.id)
        .then((response) => {
          if (response && response.data) {
            if (response.data.success === true) {
              console.log(response.data);
             setReparations(response.data.content);
  
            }
          }
        }).catch((error) => {
          
          console.log(error)
        }).finally(() => {
          
        });
     

      const fautesApi = new FautesApi({...state.environment,  accessToken:token});

      setShowIndicator(true);
      console.log(authUser.model)
      fautesApi.viewFauteEleve("Bearer "+ token, authUser.model.id)
        .then((response)=>{
          if (response && response.data) {                    
            if (response.data.success === true) { 
                console.log(response);
                setFautes(response.data.content);
            }
        }
    })
    .catch((error) => {
        if(error?.response?.status === TOKEN_EXPIRED.status && error?.response?.data?.message === TOKEN_EXPIRED.data.message){
            //props.setTokenExpired()
          } else {
            alert(error?.response?.data?.message)
          }
    })
    .finally(() => {
        setShowIndicator(false);
    });
    
    

    const apiSanction = new SanctionprevusApi({
      ...state.environment,
      accessToken: token,
    });
console.log("here");
apiSanction
      .viewSanctionPrevusEleve("Bearer " + token, authUser.model.id)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            console.log(response.data);
            setSanctions(response.data.content);
            console.log(response.data);
          }
        }
      }).catch((error) =>{

        console.log(error)
      });

    },[])

    

  }else(authUser.roles[0].description == "PARENT")
  {

  }
    return (
    <>
      <Back title='Fautes et sanctions' />
      <section className='contacts padding'>
        <FautesSection fautes={fautes} reparations={reparations}/>
       

        <div className="mt-10 mb-6">
        <h3 className="text-3xl font-semibold mb-2">Sanctions</h3>
        {sanctions.map((sanction,key) => (

          
          <div key={key} className="bg-white shadow-lg rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
                 <p className="text-lg font-semibold">Sanction #{sanction.id}</p>
        
               </div>
            <p>Created At: {sanction.created_at}</p>
        
            <h4 className="mt-4 font-medium">Élève</h4>
            <p>Nom: {sanction.eleve.firstName} {sanction.eleve.lastName}</p>
            <p>Date de Naissance: {sanction.eleve.dateDeNaissance}</p>
            <p>Lieu de Naissance: {sanction.eleve.lieuDeNaissance}</p>
        
            <h4 className="mt-4 font-medium">Faute</h4>
            <p>Libellé de la Faute: {sanction.faute.libelle}</p>
            <p>Règle: {sanction.faute.regle.libelle}</p>
          </div>
   
        ))}
      </div>
      </section>
    </>
  )
}

export default FauteSanction
