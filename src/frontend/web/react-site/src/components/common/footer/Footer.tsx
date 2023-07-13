import React from "react"
import { blog } from "../../../dummydata"
import "./footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faHeartbeat, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

const Footer = () => {
  return (
    <>
      {/* <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>Newsletter - Stay tune and get the latest update</h1>
            <span>Far far away, behind the word mountains</span>
          </div>
          <div className='right row '>
            <input className=" rounded-md" type='text' placeholder='Enter email address' />
            <FontAwesomeIcon icon={faPaperPlane} className=" w-10 h-6"/>
           
          </div>
        </div>
      </section> */}
      <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h1>SchoolDiscipline</h1>
            <span>Consultez votre état disciplinaire</span>
            {/* <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p> */}

            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
          </div>
          <div className='flexS'>
            
            <div className=''>
              <h3>Liens Rapides</h3>
              <div className='box link left'>
                <ul>
                  <li><a href="/about">A propos</a></li>
                  <li><a href="courses">Cours</a></li>
                  <li><a href="/proviseur">Proviseur</a></li>
                </ul>
              </div>
              <div className='box link droit'>
                <ul>
                  <li><a href="/enseignant">Enseignants</a></li>
                  <li><a href="contact">Nous contacter</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* <div className='box link'>
             <h3>Liens Rapide</h3>
            <ul>
              <li>Contact Us</li>
              <li>Pricing</li>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
              <li>Feedbacks</li>
            </ul>
          </div> */}
          <div className='box'>
            <div className='container flexSB'>
              <div className='newlette'>
                <h1>Newsletter - Restez à lécoute et recevez la dernière mise à jour</h1>
                <br/>
                <input className=" rounded-md" type='text' placeholder='Entrez votre adresse mail' /> 
                {/* <FontAwesomeIcon icon={faPaperPlane} className=" w-10 h-6"/> */}
              </div>
            </div>
            {/* <h3>Recent Post</h3>
            {blog.slice(0, 3).map((val, key) => (
              <div className='items flexSB' key={key}>
                <div className='img'>
                  <img src={val.cover} alt='' />
                </div>
                <div className='text'>
                  <span>
                    <i className='fa fa-calendar-alt'></i>
                    <label htmlFor=''>{val.date}</label>
                  </span>
                  <span>
                    <i className='fa fa-user'></i>
                    <label htmlFor=''>{val.type}</label>
                  </span>
                  <h4>{val.title.slice(0, 40)}...</h4>
                </div>
              </div>
            ))} */}
          </div>
          <div className='box '>
            <h3>Avez vous une question?</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                <a>lycée de ..., Ouest, Cameroun</a>
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                <a href="tel:+237622334455">+237 622 334 455</a>
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                <a href="mailto:schooldiscipline@gmail.com">schooldiscipline@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Copyright ©2023 All rights reserved | This app is made with <FontAwesomeIcon style={{ color: 'red' }} icon={faHeartbeat}/> by ...
        </p>
      </div>
    </>
  )
}

export default Footer
