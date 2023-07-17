import React, { useState } from "react"
import { ReduxProps } from "../../redux/configureStore"
import Back from "../common/back/Back"
import "./contact.css"
import { useDispatch, useSelector } from "react-redux"
import { ContactApi } from "../../generated/api"
import { ApiContactBody } from "../../generated/models/api-contact-body"
import { SuccessNotification } from "../common/header/Head"

const Contact = () => {
  // <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7943.632944948618!2d10.065432710502062!3d5.444851168643367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105fb06f92a735ef%3A0xf0cae082ecf4fb56!2sUniversite%20de%20Dschang%20Campus%20A%2C%20Dschang!5e0!3m2!1sfr!2scm!4v1689464806415!5m2!1sfr!2scm" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

  const map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7943.632944948618!2d10.065432710502062!3d5.444851168643367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105fb06f92a735ef%3A0xf0cae082ecf4fb56!2sUniversite%20de%20Dschang%20Campus%20A%2C%20Dschang!5e0!3m2!1sfr!2scm!4v1689464806415!5m2!1sfr!2scm" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer"';

  //const map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3991688.143656266!2d17.683401905469745!3d8.121442401771064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104d3c7078dbe237%3A0xc26a9e424a9e2cc8!2sAfrica!5e0!3m2!1sen!2snp!4v1652611480455!5m2!1sen!2snp" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer"';

  //const map = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d904726.6131739549!2d85.24565535!3d27.65273865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1652535615693!5m2!1sen!2snp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" '
  const [showSuccessNotif, setShowSuccessNotif] = useState<boolean>(false);
  const [successNotifMessage, setSuccessNotifMessage] = useState<string>('');
  const [successNotifDescription, setSuccessNotifDescription] = useState<
    string | null
  >(null);
  const [nom , setNom] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [sujet, setSujet] = useState();

  const state = useSelector((state: ReduxProps) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) =>{

    e.preventDefault();
    const contactApi = new ContactApi({...state.environment})

    const apiParams: ApiContactBody ={
      nom: nom,
      email: email,
      message: message,
      objet: sujet
    }

    contactApi.sendMailContact(apiParams)
    .then((response) => {
      if (response && response.data) {
        if (response.data.success === true) {
            console.log(response.data.success)
            setSuccessNotifMessage(response.data.message);
            setSuccessNotifDescription(
              "Merci d'avoir suggere!"
            );
            setNom('');
            setEmail('');
            setMessage('');
            setSujet('');
            setShowSuccessNotif(true);
  }}})
  .catch(err => {alert(err)})
  .finally(() => {
    setTimeout(() => {
      setShowSuccessNotif(false);
    }, 3000);
  });

  }

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

             {/* Your existing JSX code */}
             {showSuccessNotif && (
          <SuccessNotification
            message={successNotifMessage}
            description={successNotifDescription}
          />)}
             <form onSubmit={handleSubmit} className="mt-4">
  <div className="flex justify-between mb-4">
    <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
  </div>
  <input type="text" placeholder="Sujet" value={sujet} onChange={(e) => setSujet(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
  <textarea cols="30" rows="10" placeholder="Insérer votre message ici..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
  <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">ENVOYER</button>
</form>

    {/* Rest of your JSX code */}

{/*             <h3>suivez nous!</h3>
            <span>FACEBOOK TWITTER INSTAGRAM DRIBBBLE</span>
        */}   </div>
        </div>
      </section>
    </>
  )
}

export default Contact
