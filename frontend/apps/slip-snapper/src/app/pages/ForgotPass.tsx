import { IonAlert, IonButton, IonCard, IonInput, IonItem, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import '../theme/login-register.css';
import { useHistory } from 'react-router-dom';
import { Chip } from '@mui/material';

const ForgotPass: React.FC = () => {

  const [emailInput, setEmailInput] = useState<string>();
  const [errorAlert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div>

      <div className="header">

        <div className="inner-header flexbox">

          <IonCard color="tertiary" class="LRCard">

            <img src="../../assets/icon/512px-tp-white.svg" width="200px" height="200px" alt="Slip Snapper Logo"/>

            <div>
              <Chip label={"Forgot Password?"} sx={{ fontSize: 22, bgcolor: '#47505c', color: 'black', margin: 2 }}/>
            </div>

            <div>
                Please make sure that you have confirmed your email address before continuing.
                <hr/>
                You will receive a link to reset your password.
            </div>

            <IonItem color="tertiary" class="LRItems">
              <IonLabel position="floating">Email Address</IonLabel>
              <IonInput title="forgotPassInput" type="text" value={emailInput} onIonChange={e => setEmailInput(e.detail.value!)} required></IonInput>
            </IonItem>

            <IonItem color="tertiary" text-align="center" class="LRItems">
              <IonButton type="submit" class="LRButtons" color="secondary" size="large" onClick={() => { forgotPassword() }}>Submit</IonButton>
            </IonItem>

            <IonItem color="tertiary" class="LRItems">
              <div className='register-link'>
                <p style={{color:"#b5bab7"}}>Go back to <a href={"/login"}>login</a></p>
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

  function forgotPassword() {
    if (emailInput === undefined || emailInput === "" || emailInput === "*") {
        setErrorMessage("Please fill in all fields.")
        setAlert(true)
      }
    
    console.log("forgot");
  }

};

export default ForgotPass;