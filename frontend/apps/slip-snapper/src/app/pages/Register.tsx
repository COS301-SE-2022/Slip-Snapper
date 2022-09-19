import React, { useState } from 'react';
import {  IonItem, IonLabel, IonButton, IonCard, IonInput, IonAlert } from '@ionic/react';
import '../theme/login-register.css';
import { signupA } from "../../api/apiCall"
import { Chip } from '@mui/material';


const Register: React.FC = () => {
  const [emailInput, setEmailInput] = useState<string>();
  const [userInput, setUserInput] = useState<string>();
  const [firstNameInput, setFirstNameInput] = useState<string>();
  const [lastNameInput, setLastNameInput] = useState<string>();
  const [passwordInput, setPasswordInput] = useState<string>();
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>();
  const [errorAlert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

 
  return (
    <div>
      <div className="header">
        <div className="inner-header flexbox">
          <IonCard color="tertiary" class="LRCard">
            <img src="../../assets/icon/512px-tp-white.svg" width="200px" height="200px" alt="Slip Snapper Logo"/>

            <div>
              <Chip label={"Register"} sx={{ fontSize: 22, bgcolor: '#333C4A', color: 'white' }}/>
            </div>

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

            <div className='center-items'>
              <IonItem color="tertiary" className="full-name" lines="none">
                <IonItem color="tertiary" className="fl-name">
                  <IonLabel position="floating">First Name</IonLabel>
                  <IonInput
                      title="firstname_Input"
                      type="text"
                      value={firstNameInput}
                      onIonChange={(e) => setFirstNameInput(e.detail.value!)}
                      required
                    ></IonInput>
                </IonItem>

                <IonItem color="tertiary" className="fl-name">
                  <IonLabel position="floating">Last Name</IonLabel>
                  <IonInput
                    title="lastname_Input"
                    type="text"
                    value={lastNameInput}
                    onIonChange={(e) => setLastNameInput(e.detail.value!)}
                    required
                  ></IonInput>
                </IonItem>
              </IonItem>
            </div>

            <IonItem color="tertiary" class="LRItems">
              <IonLabel position="floating">Email Address</IonLabel>
              <IonInput
                title="email_Input"
                type="text"
                value={emailInput}
                onIonChange={(e) => setEmailInput(e.detail.value!)}
                clearOnEdit
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

            <IonItem color="tertiary" class="LRItems">
              <IonLabel position="floating">Confirm Password</IonLabel>
              <IonInput
                title="confirmPassword_Input"
                type="password"
                value={confirmPasswordInput}
                onIonChange={(e) => setConfirmPasswordInput(e.detail.value!)}
                required
              ></IonInput>
            </IonItem>

            <IonItem color="tertiary" text-align="center" class="LRItems" lines="none">
              <IonButton
                class="LRButtons"
                color="secondary"
                size="large"
                onClick={() => { register() }}
              >
                Submit
              </IonButton>
              <IonButton className="successRedirect" id="successRedirect" routerLink={"/home"}></IonButton>
            </IonItem>

            <IonItem color="tertiary" class="LRItems" lines="none">
              <div className='register-link'>
                <p style={{color:"#b5bab7"}}>Already have an account? &nbsp;<a href={"/login"}>Login</a></p>
              </div>
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

    if (emailInput === undefined || emailInput === "") {
      setErrorMessage("Please fill in all fields.")
      setAlert(true)
    }
    if (userInput === undefined || userInput === "" ) {
      setErrorMessage("Please fill in all fields.")
      setAlert(true)
    }
    if (passwordInput === undefined || passwordInput === "" ) {
      setErrorMessage("Please fill in all fields.")
      setAlert(true)
    }
    else{
      signupA(userInput, emailInput, passwordInput)
        .then(apiResponse => {
          if(typeof(apiResponse.data) !== "string"){
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(apiResponse.data.userData))
            sessionStorage.setItem('token', JSON.stringify(apiResponse.data.token))

            const button = document.getElementById("successRedirect")
            if (button) {
              button.click();
            }
          }else{
            setErrorMessage("500 Internal Service Error.")
            setAlert(true)
          } 
        }).catch(err => {
          setErrorMessage("500 Internal Service Error.")
          setAlert(true)
        });
    }
  }



};

export default Register;


