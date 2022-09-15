import { IonAlert, IonButton, IonCard, IonInput, IonItem, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import '../theme/login-register.css';
import { loginA } from "../../api/apiCall"
import { useHistory } from 'react-router-dom';
import { Chip } from '@mui/material';

const Login: React.FC = () => {

  const [usernameInput, setUsernameInput] = useState<string>();
  const [passwordInput, setPasswordInput] = useState<string>();
  const [errorAlert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory()

  return (
    <div>

      <div className="header">

        <div className="inner-header flexbox">

          <IonCard color="tertiary" class="LRCard">

            <img src="../../assets/icon/512px-tp-white.svg" width="200px" height="200px" alt="Slip Snapper Logo"/>
            
            <div>
              <Chip label={"Login"} sx={{ fontSize: 22, bgcolor: '#47505c', color: 'black' }}/>
            </div>

            <IonItem color="tertiary" class="LRItems">
              <IonLabel position="floating">Username</IonLabel>
              <IonInput title="usernameInput" type="text" value={usernameInput} onIonChange={e => setUsernameInput(e.detail.value!)} required></IonInput>
            </IonItem>

            <IonItem color="tertiary" class="LRItems">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput title="passwordInput" type="password" value={passwordInput} onIonChange={e => setPasswordInput(e.detail.value!)} required></IonInput>
            </IonItem>

            <IonItem color="tertiary" text-align="center" class="LRItems">
              <IonButton type="submit" class="LRButtons" color="secondary" size="large" onClick={() => { login() }}>Login</IonButton>
            </IonItem>

            <IonItem color="tertiary" class="LRItems">
              <div className='register-link'>
                <p style={{color:"#b5bab7"}}>Don't have an account? &nbsp;<a href={"/register"}>Register</a></p>
              </div>
              <div className='forgot-pass' slot="end">
                <a href={"/forgotpass"}>Forgot Password</a>
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
          <svg className="motionwaves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(235,235,235,0.7" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(235,235,235,0.5)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(235,235,235,0.3)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#ebebeb" />
            </g>
          </svg>
        </div>

      </div>
      <IonButton className="successRedirect" id="successRedirect" routerLink={"/home"}></IonButton>
      <div className='footer'>
          COPYRIGHT © UNIVERSITY OF PRETORIA 2022. ALL RIGHTS RESERVED.
      </div>

    </div>
  );

  function login() {

    if (usernameInput === undefined || usernameInput === "" || usernameInput === "*") {
      setErrorMessage("Please fill in all fields.")
      setAlert(true)
    }
    else if (passwordInput === undefined || passwordInput === "" || passwordInput === "*") {
      setErrorMessage("Please fill in all fields.")
      setAlert(true)
    }

    /**
    * Check if Login details are valid
    */
    else {
      loginA(usernameInput, passwordInput)
        .then(apiResponse => {
          if (apiResponse.data.message === "Invalid Username") {
            setErrorMessage("Username not found.")
            setAlert(true)
          }
          else if (apiResponse.data.message === "Invalid Password") {
            setErrorMessage("Incorrect Password.")
            setAlert(true)
          }
          else {
            //Change user local storage item
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(apiResponse.data.userData))
            localStorage.removeItem('token')
            localStorage.setItem('token', JSON.stringify(apiResponse.data.token))

            history.push("/home")
            window.location.reload();
          }
        })
    }
  }

};

export default Login;