import React from "react"

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            <div className='gauche'>
              <img src='./images/logo.png' alt='' />
            </div>
            <div className='droite'>
              <h1>SchoolDiscipline</h1>
              <span>Consultez votre état disciplinaire</span>
            </div>
          </div>

          <div className='social'>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-instagram icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-youtube icon'></i>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
