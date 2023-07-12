import React, { useEffect, useState } from "react";
import Back from "../common/back/Back";
import Heading from "../common/heading/Heading";
import { ParentsApi } from "../../generated";
import {
  TOKEN_LOCAL_STORAGE_KEY,
  USER_LOCAL_STORAGE_KEY,
} from "../../constants/LOCAL_STORAGE";
import { useSelector } from "react-redux";
import { ReduxProps } from "../../redux/configureStore";
import { Parents } from "../../generated/models";
import environment from "../../environments/environment.dev";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MesEnfants = () => {
  const state = useSelector((state: ReduxProps) => state);
  const authUser = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY));
  const [parent, setParent] = useState<Parents>();
  const navigate =  useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
    const apiParent = new ParentsApi({
      ...state.environment,
      accessToken: token,
    });

    apiParent
      .viewparent("Bearer " + token, authUser.model.id)
      .then((response) => {
        if (response && response.data) {
          if (response.data.success === true) {
            setParent(response.data.content);
            console.log(response.data);
          }
        }
      });
  }, []);

  const handleClick = (item)=>{
    navigate("/pageEleve", {state: item});
  }

  return (
    <>
      <Back title={"Mes Enfants"} />

      <section className="h-100 w-auto justify-center justify-items-center bg-transparent">
        <div className="container-sm m-2 grid grid-cols-1 justify-center justify-items-center gap-2 bg-transparent md:grid md:grid-cols-2  md:gap-0 xl:grid-cols-3">
          {parent?.eleves.map((val,key)=>(
            <div key={key} className="m-5 flex flex-col rounded-lg bg-stone-200 p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
            <img
              className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={`${environment.basePath}/api/files/download?filekey=${val.photo}`}
              alt=""
            />
            <div>
            <div className="flex flex-col justify-start p-6">
              <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                {val.firstName + " " + val.lastName}
              </h5>
              <p className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50" >
              Date de naissance : {val.dateDeNaissance }
              </p>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Lieu de naissance : {val.lieuDeNaissance}
              </p>
              <p
              className="mb-4 text-base text-neutral-600 dark:text-neutral-200" >
                Telephone : {val.telephone}
              </p>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {val.classe.speciality? val.classe.shortName + " " +val.classe.speciality + val.classe.no : val.classe.shortName + " " + val.classe.no }
              </p>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
               Redoublant :  {val.redoublant? " OUI" : "NON " }
              </p>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Solvable :  {val.solvable? " OUI" : "NON " }
              </p>
              <div className="justify-center mb-2 text-xl border shadow-md bg-[#6ec9da] rounded-lg font-medium text-neutral-800 dark:text-neutral-50">
              <button className="w-full justify-center mb-2" onClick={()=>handleClick(val)} >
                Voir plus ...<span><FontAwesomeIcon icon={"arrow-alt-to-right"}/></span>
              </button>
              </div>
            </div>
         
            </div>
          </div>
          ))}
          
        </div>
      </section>
    </>
  );
};

export default MesEnfants;

/* 
<>
    <Back title="Mes Enfants" />
    <section className="bg-white padding">
        <div className='shadow-[0_2px_1px_-3px_rgba(0,0,0,0.07),0_1px_20px_-2px_rgba(0,0,0,0.04)] text-left text-5xl p-3 font-extrabold justify-start items-center'>
            <h1>Mes Enfants</h1>
        </div>
    
            
      <div
  className="flex flex-col rounded-lg bg-stone-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
  <img
    className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
    src="https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg"
    alt="" />
  <div className="flex flex-col justify-start p-6">
    <h5
      className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
      Card title
    </h5>
    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
      This is a wider card with supporting text below as a natural lead-in
      to additional content. This content is a little bit longer.
    </p>
    <p className="text-xs text-neutral-500 dark:text-neutral-300">
      Last updated 3 mins ago
    </p>
  </div>
</div>
</section>
    </> */
