import React, { useEffect, useState } from "react"
import Back from "../common/back/Back"
import "./fautesanction.css"
import { TOKEN_LOCAL_STORAGE_KEY, USER_LOCAL_STORAGE_KEY } from "../../constants/LOCAL_STORAGE"
import { FautesApi } from "../../generated"
import { useDispatch, useSelector } from "react-redux"
import { ReduxProps } from "../../redux/configureStore"
import { TOKEN_EXPIRED } from "../../constants/RESPONSES_CODE"
import { Faute } from "../../generated/models"

const FauteSanction = () => {
  const state = useSelector((state: ReduxProps) => state);
  const dispatch = useDispatch();
  const [showIndicator, setShowIndicator] = useState<boolean>(false);
  const [fautes, setFautes] = useState<Faute[]>([]);
    


  const authUser = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY))
  if(authUser.roles[0].description == "ELEVE")
  {
    useEffect(()=>{
      const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
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
    
    console.log(fautes);
    },[])

  }else(authUser.roles[0].description == "PARENT")
  {

  }
    return (
    <>
      <Back title='Fautes et sanctions' />
      <section className='contacts padding'>
        <div className='container shadow flexSB'>
          {fautes.map((item)=>(
            <div>
              {item}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default FauteSanction
