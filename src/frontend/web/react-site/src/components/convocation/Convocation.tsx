import React, { useEffect, useState } from "react"
import Back from "../common/back/Back"
import "./convocation.css"
import { TOKEN_LOCAL_STORAGE_KEY, USER_LOCAL_STORAGE_KEY } from "../../constants/LOCAL_STORAGE"
import { ConvocationApi } from "../../generated"
import { useDispatch, useSelector } from "react-redux"
import { ReduxProps } from "../../redux/configureStore"
import { TOKEN_EXPIRED } from "../../constants/RESPONSES_CODE"
import { Convocation } from "../../generated/models"

const Convocations = () => {
  const state = useSelector((state: ReduxProps) => state);
  const dispatch = useDispatch();
  const [showIndicator, setShowIndicator] = useState<boolean>(false);
  const [convocations, setConvocations] = useState<Convocation[]>([]);

  const authUser = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY))
  if(authUser.roles[0].description == "ELEVE")
  {
    useEffect(()=>{
      const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
      const convocationsApi = new ConvocationApi({...state.environment,  accessToken:token});

      setShowIndicator(true);
      console.log(authUser.model)
      convocationsApi
        .viewConvocationEleve("Bearer "+ token, authUser.model.id)
        .then((response)=>{
          if (response && response.data) {                    
            if (response.data.success === true) { 
                console.log(response);
                setConvocations(response.data.content);
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
    
    console.log(convocations);
    },[])
    return (
      <>
        <Back title={"Convocations"} />
        <section className='h-100 w-auto justify-center justify-items-center bg-transparent'>
          <div className='container-sm m-2 grid grid-cols-1 justify-center justify-items-center gap-2 bg-transparent md:grid md:grid-cols-2  md:gap-0 xl:grid-cols-3'>
            {convocations.map((item)=>(
              <div className="contact flex flex-col justify-start p-6">
                <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                <b>Sujet :</b> {item.libelle}
                </h5>
                <p className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50" >
                <b>Date de la convocation :</b> {item.dateConvocation }
                </p>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                <b>Date du rendez-vous :</b> {item.dateRdv}
                </p>
                <p
                className="mb-4 text-base text-neutral-600 dark:text-neutral-200" >
                  <b>Statut :</b> {item.statut}
                </p>
            </div>
            ))}
          </div>
        </section>
      </>
    )

  }else(authUser.roles[0].description == "PARENT")
  {
  return (
    <>
      <Back title='Fautes et sanctions' />
      <section className='contacts padding'>
        <div className='container shadow flexSB'>
          {convocations.map((item)=>(
            <div>
              {item}
            </div>
          ))}
        </div>
      </section>
    </>
  )}
}

export default Convocations
