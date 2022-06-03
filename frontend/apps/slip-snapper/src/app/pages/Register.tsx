import React, { useState } from 'react';
import {  IonPage,  IonItem, IonLabel, IonButton, IonCard, IonInput} from '@ionic/react';
import '../theme/LoginRegister.css';
const Register: React.FC = () => {
  const [nameInput,setNameInput ] = useState<string>();
  const [surnameInput, setSurnameInput] = useState<string>();
  const [userInput, setUserInput] = useState<string>();
  const [passwordInput, setPasswordInput] = useState<string>();

  return (
    <IonPage>
      <div className="header">
        <div className="inner-header flexbox">
          <IonCard color="tertiary" class="logincard">
            <h1>Slip Snapper</h1>
            <svg
              className="logo"
              baseProfile="tiny"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="40px"
              height="40px"
              viewBox="0 0 17 17"
              version="1.1"
            >
              <path
                fill="#fff"
                d="M2 0v16.902l2.028-2.481 1.503 1.88 1.501-1.875 1.499 1.875 1.5-1.875 1.5 1.875 
              1.499-1.875 1.97 2.46v-16.886h-13zM14 14.036l-0.97-1.211-1.499 1.875-1.5-1.875-1.5 1.875-1.499-1.875-1.501 
              1.875-1.495-1.87-1.036 1.268v-13.098h11v13.036zM10.997 4h-6v-1h6v1zM8.997 8h-4v-1h4v1zM11.978 6h-7v-1h7v1zM5 10h7v1h-7v-1z"
              />
            </svg>

            <IonItem color="tertiary" class="loginitems">
              <IonLabel position="floating">Name</IonLabel>
              <IonInput
                type="text"
                value={nameInput}
                onIonChange={(e) => setNameInput(e.detail.value!)}
                required
              ></IonInput>
            </IonItem>

            <IonItem color="tertiary" class="loginitems">
              <IonLabel position="floating">Surname</IonLabel>
              <IonInput
                type="text"
                value={surnameInput}
                onIonChange={(e) => setSurnameInput(e.detail.value!)}
                required
              ></IonInput>
            </IonItem>

            <IonItem color="tertiary" class="loginitems">
              <IonLabel position="floating">Username</IonLabel>
              <IonInput
                type="text"
                value={userInput}
                onIonChange={(e) => setUserInput(e.detail.value!)}
                required
              ></IonInput>
            </IonItem>

            <IonItem color="tertiary" class="loginitems">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                value={passwordInput}
                onIonChange={(e) => setPasswordInput(e.detail.value!)}
                required
              ></IonInput>
            </IonItem>

            <IonItem color="tertiary" text-align="center" class="loginitems">
              <IonButton
                class="LRButtons"
                color="secondary"
                size="large"
                routerLink={'/home'}
              >
                Register
              </IonButton>
            </IonItem>
          </IonCard>
        </div>

        <div>
          <svg
            className="motionwaves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
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

      <div className="content flexbox"></div>
    </IonPage>
  );

  function register(
    name: string,
    surname: string,
    user: string,
    password: string
  ) {
    const fullName = name + ' ' + surname;
    user = 'Jane Doe';
    fetch('http://localhost:55555/api/user/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user,
        userName: fullName,
        pass: password,
      }),
    }).then((res) => res.json());
  }
};



export default Register;