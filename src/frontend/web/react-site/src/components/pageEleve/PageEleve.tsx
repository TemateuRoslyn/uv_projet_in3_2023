import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TOKEN_LOCAL_STORAGE_KEY } from "../../constants/LOCAL_STORAGE";
import { ConseilDisciplinesApi, ConvocationApi, FautesApi, SanctionprevusApi } from "../../generated";
import { ReduxProps } from "../../redux/configureStore";
import { useSelector } from "react-redux";
import { ConseilDiscipline, Convocation, Faute, SanctionPrevu } from "../../generated/models";
import FautesSection from "./components/FautesSection";



const PageEleve = () => {
  const location = useLocation();
  const data = location.state;

  const state = useSelector((state: ReduxProps) => state);
  
  const [conseilDisciplinses, setConseilDisciplines] = useState<ConseilDiscipline[]>([]);
  const [fautes, setFautes] = useState<Faute[]>([]);
  const [convocations, setConvocations] = useState<Convocation[]>([]);
  const [sanctions, setSanctions] = useState<SanctionPrevu[]>([]);
  
  console.log(data)


  useEffect(() => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
    const apiParent = new FautesApi({
      ...state.environment,
      accessToken: token,
    });

    apiParent
      .viewFauteEleve("Bearer " + token, data.id)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
      
            setFautes(response.data.content);
       
          }
        }
      }).catch((error) =>{

        console.log(error)
      });

      const apiConvoation = new ConvocationApi({
        ...state.environment,
        accessToken: token,
      });

  apiConvoation
        .viewConvocationEleve("Bearer " + token, data.id)
        .then((response) => {
          if (response && response.data) {
            if (response.data.success === true) {
            
              setConvocations(response.data.content);
          
            }
          }
        }).catch((error) =>{
  
          console.log(error)
        });

        
        const apiConseilDiscipline = new ConseilDisciplinesApi({
          ...state.environment,
          accessToken: token,
        });
  
    apiConseilDiscipline
          .viewConseilDisciplineEleve("Bearer " + token, data.id)
          .then((response) => {
            if (response && response.data) {
              if (response.data.success === true) {
            
                setConseilDisciplines(response.data.content);
             
              }
            }
          }).catch((error) =>{
    
            console.log(error)
          });
  
           
        const apiSanction = new SanctionprevusApi({
          ...state.environment,
          accessToken: token,
        });
    console.log("here");
    apiSanction
          .viewSanctionPrevusEleve("Bearer " + token, data.id)
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
  
  }, []);


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Child Disciplinary State Details</h2>

      {/* Convocations */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Convocations</h3>
        {convocations.map((convocation,key) => (
          <div className="mb-6">
         
          <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg font-semibold">Convocation #{key}</p>
   
          </div>
            <p>Date de convocation: {convocation.dateConvocation}</p>
            <p>Date de rendez-vous: {convocation.dateRdv}</p>
            <p>Libellé: {convocation.libelle}</p>
            <p>Statut: {convocation.statut}</p>
            <p>Date de création: {convocation.created_at}</p>
        
            <div className="flex items-center justify-between mt-3">
            <p className="text-lg font-semibold">Personnel</p>
   
          </div>
           
            <p>Nom: {convocation.personnel.firstName} {convocation.personnel.lastName}</p>
            <p>Fonction: {convocation.personnel.fonction}</p>
           
          </div>
        </div>
        
        ))}
      </div>

      {/* Fautes */}
      <FautesSection fautes={fautes}/>

      {/* Conseildiscipline */}
      <div className="mb-6">
  <h3 className="text-xl font-semibold mb-2">Conseil de Discipline</h3>
  {conseilDisciplinses.map(conseildiscipline => (
         
       
  <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
     <div className="flex items-center justify-between mb-2">
            <p className="text-lg font-semibold">ConseilDiscipline #{conseildiscipline.id}</p>
   
          </div>
    <p>Date de Conseil de Discipline: {conseildiscipline.dateCd}</p>
    <p>Heure de début: {conseildiscipline.heureDebutCd}</p>
    <p>Heure de fin: {conseildiscipline.heureFinCd}</p>
    <p>Status: {conseildiscipline.status}</p>

    <h4 className="mt-4 font-medium">Élève</h4>
    <p>Nom: {conseildiscipline.eleve.firstName} {conseildiscipline.eleve.lastName}</p>
    <p>Date de Naissance: {conseildiscipline.eleve.dateDeNaissance}</p>
    <p>Lieu de Naissance: {conseildiscipline.eleve.lieuDeNaissance}</p>

    <h4 className="mt-4 font-medium">Faute</h4>
    <p>Gravité: {conseildiscipline.faute.gravite}</p>
    <p>Libellé de la Faute: {conseildiscipline.faute.libelle}</p>
    <p>Règle: {conseildiscipline.faute.regle.libelle}</p>

    {/* <h4 className="mt-4 font-medium">Réparation</h4>
    <p>Date de Création: {conseildiscipline.reparation.created_at}</p> */}
  </div>
   ))}
</div>

      {/* Sanctions */}
     
  

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Sanctions</h3>
        {sanctions.map(sanction => (

          
          <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
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
    </div>
  );
};

export default PageEleve;
