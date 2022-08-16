import React, { useState } from 'react';
import {  IonPage,  IonItem, IonLabel, IonButton, IonCard, IonInput, IonAlert} from '@ionic/react';
import '../theme/login-register.css';
import { signupA } from "../../api/apiCall"


const Register: React.FC = () => {
  const [nameInput,setNameInput ] = useState<string>();
  const [surnameInput, setSurnameInput] = useState<string>();
  const [userInput, setUserInput] = useState<string>();
  const [passwordInput, setPasswordInput] = useState<string>();
  const [errorAlert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

 
  return (
    <div>
      <div className="header">
        <div className="inner-header flexbox">
          <IonCard color="tertiary" class="LRCard">
          <img src="../../assets/icon/512px-tp-white.svg" width="200px" height="200px" alt="Slip Snapper Logo"/>

            <IonItem color="tertiary" class="LRItems">
              <IonLabel position="floating">Name</IonLabel>
              <IonInput
                title="name_Input"
                value={nameInput}
                onIonChange={(e) => setNameInput(e.detail.value!)}
                required
                
              ></IonInput>
            </IonItem>

            <IonItem color="tertiary" class="LRItems">
              <IonLabel position="floating">Surname</IonLabel>
              <IonInput
                title="surname_Input"
                type="text"
                value={surnameInput}
                onIonChange={(e) => setSurnameInput(e.detail.value!)}
                clearOnEdit
              ></IonInput>
            </IonItem>

            <IonItem color="tertiary" class="LRItems">
              <IonLabel position="floating">Username</IonLabel>
              <IonInput
                title="username_Input"
                type="text"
                value={userInput}
                onIonChange={(e) => setUserInput(e.detail.value!)}
                required
              ></IonInput>
            </IonItem>

            <IonItem color="tertiary" class="LRItems">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                title="password_Input"
                type="password"
                value={passwordInput}
                onIonChange={(e) => setPasswordInput(e.detail.value!)}
                required
              ></IonInput>
            </IonItem>

            <IonItem color="tertiary" text-align="center" class="LRItems">
              <IonButton
                class="LRButtons"
                color="secondary"
                size="large"
                onClick={() => { register() }}
              >
                Register
              </IonButton>
              <IonButton className="successRedirect" id="successRedirect" routerLink={"/home"}></IonButton>
            </IonItem>
            <IonAlert
              isOpen={errorAlert}
              onDidDismiss={() => setAlert(false)}
              header="Invalid Input"
              subHeader={errorMessage}
              buttons={['OK']}
            />
          </IonCard>
        </div>

        <div>
          <svg
            className="motionwaves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(235,235,235,0.7"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(235,235,235,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(235,235,235,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#ebebeb" />
            </g>
          </svg>
        </div>
      </div>

      <div className='footer'>
          COPYRIGHT © UNIVERSITY OF PRETORIA 2022. ALL RIGHTS RESERVED.
      </div>
    </div>
  );

  function register() {

    if (nameInput === undefined || nameInput === "" ) {
      setErrorMessage("Please fill in all fields!")
      setAlert(true)
    }
    if (surnameInput === undefined || surnameInput === "") {
      setErrorMessage("Please fill in all fields!")
      setAlert(true)
    }
    if (userInput === undefined || userInput === "" ) {
      setErrorMessage("Please fill in all fields!")
      setAlert(true)
    }
    if (passwordInput === undefined || passwordInput === "" ) {
      setErrorMessage("Please fill in all fields!")
      setAlert(true)
    }
    else{
      signupA(userInput, nameInput, surnameInput, passwordInput)
        .then(apiResponse => {
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(apiResponse.data.userData))
            localStorage.removeItem('token')
            localStorage.setItem('token', JSON.stringify(apiResponse.data.token))
        });

      const button = document.getElementById("successRedirect")
      if (button) {
        button.click();
      }

    }
  }



};

export default Register;


