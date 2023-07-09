import React from "react"
import Back from "../common/back/Back"
import "./contact.css"

const Contact = () => {
  const map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945089.628012213!2d12.929731998285743!3d5.594114711933558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x106cdd94bfebc8f1%3A0xdb295bdfec6cb26c!2sCameroon!5e0!3m2!1sen!2snp!4v1652612232960!5m2!1sen!2snp" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer"';

  //const map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3991688.143656266!2d17.683401905469745!3d8.121442401771064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104d3c7078dbe237%3A0xc26a9e424a9e2cc8!2sAfrica!5e0!3m2!1sen!2snp!4v1652611480455!5m2!1sen!2snp" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer"';

  //const map = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d904726.6131739549!2d85.24565535!3d27.65273865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1652535615693!5m2!1sen!2snp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" '
  return (
    <>
      <Back title='Contactez nous' />
      <section className='contacts padding'>
        <div className='container shadow flexSB'>
          <div className='left row'>
            <iframe src={map}></iframe>
          </div>
          <div className='right row'>
            <h1>Contactez nous</h1>
            <p>Nous sommes là pour vous aider à tirer le meilleur parti de notre application de gestion de la discipline en milieu scolaire.</p>
            <p>Si vous avez des questions, commentaires ou préoccupations, n'hésitez pas à nous contacter!</p>
            <div className='items grid2'>
              <div className='box'>
                <h4>ADDRESSE:</h4>
                <p>université de dschang</p>
              </div>
              <div className='box'>
                <h4>EMAIL:</h4>
                <p> <a href="mailto:schooldiscipline@gmail.com">schooldiscipline@gmail.com</a></p>
              </div>
              <div className='box'>
                <h4>TÉLÉPHONE:</h4>
                <p><a href="tel:+237622334455"> +237622334455</a></p>
              </div>
            </div>

            <form action=''>
              <div className='flexSB'>
                <input type='text' placeholder='Nom' />
                <input type='email' placeholder='Email' />
              </div>
              <input type='text' placeholder='sujet' />
              <textarea cols='30' rows='10'>
                Creer un message ici...
              </textarea>
              <button className='primary-btn'>ENVOYER</button>
            </form>

            <h3>suivez nous!</h3>
            <span>FACEBOOK TWITTER INSTAGRAM DRIBBBLE</span>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
