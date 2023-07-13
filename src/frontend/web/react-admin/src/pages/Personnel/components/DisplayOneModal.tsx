import React from 'react';
import Personnels from '../../Personnels';
import { MODAL_MODE } from '../../../constants/ENUM';

interface ModalProps {
  mode: MODAL_MODE;
  title: string;
  onClose: () => void;
  refresh?: () => void;
  item?: Personnels | null;
}
import "./DisplayPersonnels.css";
import environment from '../../../environments/environment.dev';


const DisplayOneModal: React.FC<ModalProps> = (props) => {

  return (
    <div id="authentication-modal" className="authentication-modal pl-800 pt-20" onClick={props.onClose}>
      <div className="top-modal-animation relative mx-auto items-center justify-center px-1" onClick={(event) => event.stopPropagation()}>
        <div className="rounded-sm border border-stroke bg-white bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <button onClick={props.onClose} className="close-button">
            <svg
              aria-hidden="true"
              className="close-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="modal-body">
            <div className="border-b text-black border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="  mb-[1rem] text-size-[1.25rem] font-medium text-black dark:text-white">
                {props.title}
              </h3>
            </div>
            <div className="profile-view">
              <div className="profile-image">
                {/* Image element */}
                 <img className='w-100 max-h-70' src={`${environment.basePath}/api/files/download?filekey=${props.item.photo}`} alt="User Profile Image" width={200} height={100}/>
              </div>
              <div className="profile-info">
                <h4 className="profile-name">
                 {props.item.firstName + " " + props.item.lastName}
                </h4>
                <p className="profile-gender">
                  Sexe : {props.item.sexe}
                </p>

                
                <p className="profile-dateOfBirth">
                  Date de Naissance : {props.item.dateDeNaissance} 
                </p>
                <p className="profile-fonction">
                Fonction: {props.item.user.fonction}
                </p>
                
              
                <p className="profile-email">
                ESmail: {props.item.user.email}
                </p>
                
                <p className="profile-tel">
                 Telephone: {props.item.telephone}
                </p>
               
               
              
                  
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayOneModal;
