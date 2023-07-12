import React from "react"
import Back from "../common/back/Back"
import "./convocation.css"
import {
  IS_LOGGED_LOCAL_STORAGE_KEY,
  TOKEN_LOCAL_STORAGE_KEY,
  USER_LOCAL_STORAGE_KEY,
} from "../../constants/LOCAL_STORAGE";

const Convocation = () => {
  const authUser = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY)!);
  console.log(authUser)
   return (
    <>
      <Back title='Convocations' />
      <section className='contacts padding'>
        <div className='container shadow flexSB'>
          {authUser.roles[0].name}
        </div>
      </section>
    </>
  )
}

export default Convocation
