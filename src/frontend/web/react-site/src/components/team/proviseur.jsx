import React from 'react';
import Back from '../common/back/Back';

const Proviseur = () => {
    return (
        <>
            <Back title="Proviseur" />
            <div className="container bg-white  m-5 p-5">

                <div className="flex items-center gap-10 shadow-2xl">
                    <div className='img brightness-100' >
                        <img src="./images/team/t1.webp" />
                    </div>
                    <div>
                        <div className="informations shadow-lg items-centers  ">
                            <div className="text-center p-5 ">
                                <p class="border-2 p-2 italic bg-[#1eb299] font-bold text-white">
                                    INFORMATIONS SUR MONSIEUR ADRIAN MOLISES PROVISEUR DU LYCEE DE ...
                                </p>
                            </div>
                            <div>
                                <div className="text-center p-5">
                                    <strong>PRESENTATION</strong>
                                    <h6>ADRIAN MOLISES est un leader expérimenté et passionné qui travaille à créer une culture d'apprentissage dynamique et inclusive pour les élèves et les enseignants.</h6>
                                </div>
                                <div className="text-center p-5">
                                    <strong>BIBIOGRAPHIE</strong>

                                    <ul>
                                        <li>Diplômé en éducation de l'Université de Dschang.</li>
                                        <li>20 ans d'expérience dans l'enseignement.</li>
                                        <li> A travaillé en tant que professeur de langue anglaise.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="text-center p-5">
                                <strong>RESPONSABILITES</strong>
                                <ul>
                                    <li>Superviser la direction du lycée.</li>
                                    <li>Travailler avec les enseignants et les parents pour améliorer les résultats des élèves.</li>
                                    <li>Assurer la discipline et le respect des règles dans l'établissement.</li>
                                    <li>Contacter les établissements scolaires voisins pour organiser des événements inter-écoles.</li>
                                </ul>
                            </div>
                            <div className="text-center p-5">
                                <strong>PHILOSOPHIE EDUCATIVE</strong>
                                <h6>ADRIAN MOLISES croit que chaque élève a le potentiel de réussir à condition qu'il soit encouragé et soutenu dans un environnement stimulant et inclusif.</h6>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>



    );
}
export default Proviseur;
