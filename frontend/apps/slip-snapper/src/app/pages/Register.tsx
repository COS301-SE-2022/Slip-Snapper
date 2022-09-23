import React, { useState } from 'react';
import { IonItem, IonLabel, IonButton, IonCard, IonInput, IonAlert, IonContent, IonPopover } from '@ionic/react';
import '../theme/login-register.css';
import { signupA } from "../../api/apiCall"
import { Chip, Popover } from '@mui/material';


const Register: React.FC = () => {
  const [emailInput, setEmailInput] = useState<string>();
  const [userInput, setUserInput] = useState<string>();
  const [firstNameInput, setFirstNameInput] = useState<string>();
  const [lastNameInput, setLastNameInput] = useState<string>();
  const [passwordInput, setPasswordInput] = useState<string>();
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>();
  const [errorAlert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordPop, setPasswordPop] = useState(null);
  const openPasswordPop = (event: any) => { setPasswordPop(event.currentTarget); };
  const closePasswordPop = () => { setPasswordPop(null); };


  const [confirmPop, setConfirmPop] = useState(null);
  const openConfirmPop = (event: any) => { setConfirmPop(event.currentTarget); };
  const closeConfirmPop = () => { setConfirmPop(null); };



  return (
    <div>
      <div className="header">
        <div className="inner-header flexbox">
          <IonCard color="tertiary" class="LRCard">
            <img src="../../assets/icon/512px-tp-white.svg" width="200px" height="200px" alt="Slip Snapper Logo" />

            <div>
              <Chip label={"Register"} sx={{ fontSize: 22, bgcolor: '#333C4A', color: 'white' }} />
            </div>

            <IonItem color="tertiary" class="LRItems">
              <IonLabel position="floating">Username</IonLabel>
              <IonInput
                title="Input Username"
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
                    title="Input First Name"
                    type="text"
                    value={firstNameInput}
                    onIonChange={(e) => setFirstNameInput(e.detail.value!)}
                    required
                  ></IonInput>
                </IonItem>

                <IonItem color="tertiary" className="fl-name">
                  <IonLabel position="floating">Last Name</IonLabel>
                  <IonInput
                    title="Input Last Name"
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
                title="Input Email"
                type="text"
                value={emailInput}
                onIonChange={(e) => setEmailInput(e.detail.value!)}
                clearOnEdit
              ></IonInput>
            </IonItem>

            <IonItem color="tertiary" class="LRItems">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                title="Input Password"
                onClick={(e) => { openPasswordPop(e);validatePassword(passwordInput) }}
                type="password"
                value={passwordInput}
                onIonChange={(e) => { setPasswordInput(e.detail.value!); validatePassword(e.detail.value!) }}
                required
              ></IonInput>
            </IonItem>

            <Popover
              open={Boolean(passwordPop)}
              onClose={closePasswordPop}
              anchorEl={passwordPop}
              disableAutoFocus={true}
              disableEnforceFocus={true}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <p id='min'>Minimum of 8 characters.</p>
              <p id='low'>At least 1 lowercase character.</p>
              <p id='up'>At least 1 uppercase character.</p>
              <p id='num'>At least 1 number.</p>
              <p id='spec'>At least 1 special character such as @$!%*?&</p>
            </Popover>


            <IonItem color="tertiary" class="LRItems">
              <IonLabel position="floating">Confirm Password</IonLabel>
              <IonInput
                onClick={(e) => { openConfirmPop(e); }}
                title="Input Confirmation"
                type="password"
                value={confirmPasswordInput}
                onIonChange={(e) => {setConfirmPasswordInput(e.detail.value!);validateConfirm(e.detail.value!)}}
                required
              ></IonInput>
            </IonItem>

            <Popover
              open={Boolean(confirmPop)}
              onClose={closeConfirmPop}
              anchorEl={confirmPop}
              disableAutoFocus={true}
              disableEnforceFocus={true}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <p id='match'>Passwords Match.</p>
            </Popover>

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
                <p style={{ color: "#b5bab7" }}>Already have an account? &nbsp;<a href={"/login"}>Login</a></p>
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

    const emailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const strongPasswordChecker = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;


    if (emailInput === undefined || emailInput === "") {
      setErrorMessage("Please fill in all fields.")
      setAlert(true)
    } else if (userInput === undefined || userInput === "") {
      setErrorMessage("Please fill in all fields.")
      setAlert(true)
    } else if (passwordInput === undefined || passwordInput === "") {
      setErrorMessage("Please fill in all fields.")
      setAlert(true)
    } else if (firstNameInput === undefined || firstNameInput === "") {
      setErrorMessage("Please fill in all fields.")
      setAlert(true)
    } else if (lastNameInput === undefined || lastNameInput === "") {
      setErrorMessage("Please fill in all fields.")
      setAlert(true)
    } else if (confirmPasswordInput === undefined || confirmPasswordInput === "") {
      setErrorMessage("Please fill in all fields.")
      setAlert(true)
    }
    else if (emailInput !== undefined && !emailInput.match(emailformat))
    {
      setErrorMessage("Please input a valid Email address.")
      setAlert(true)
    }
    else if (!validatePassword(passwordInput))
    {
      setErrorMessage("Password does not meet the criteria.")
      setAlert(true)
    }
    else if (passwordInput !== undefined && !strongPasswordChecker.test(passwordInput)) {
      setErrorMessage("Password may not be secure, please try another one.")
      setAlert(true)
    }
    else if (confirmPasswordInput !== passwordInput) {
      setErrorMessage("Passwords do not match.")
      setAlert(true)
    }
  
    else {
        signupA(firstNameInput, lastNameInput, userInput, passwordInput, emailInput)
          .then(apiResponse => {
            if(typeof(apiResponse.data) !== "string"){
              if(apiResponse.data.message !== "Error Creating User"){
                localStorage.removeItem('user')
                localStorage.setItem('user', JSON.stringify(apiResponse.data.userData))
                sessionStorage.setItem('token', JSON.stringify(apiResponse.data.token))

                const button = document.getElementById("successRedirect")
                if (button) {
                  button.click();
                }
              }else{
                setErrorMessage("Unable to create user, please try again.")
                setAlert(true)
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

  function validatePassword(password: string|undefined) {
    const min = document.getElementById("min")
    if (min !== null)
      min.style.color = "red"
    const up = document.getElementById("up")
    if (up !== null)
      up.style.color = "red"
    const low = document.getElementById("low")
    if (low !== null)
      low.style.color = "red"
    const num = document.getElementById("num")
    if (num !== null)
      num.style.color = "red"
    const spec = document.getElementById("spec")
    if (spec !== null)
      spec.style.color = "red"

    let correctPasswordFlag = true;

    if (password!==undefined&&password?.length > 7) {
      if (min !== null)
        min.style.color = "green"
    }

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharacter = /[@$!%*?&]/;

    if (password !== undefined &&lowercaseRegex.test(password)) {
      if (low !== null)
        low.style.color = "green"
    } else { correctPasswordFlag = false }

    if (password !== undefined &&uppercaseRegex.test(password))
    {
      if (up !== null)
        up.style.color = "green"
    } else { correctPasswordFlag = false }

    if (password !== undefined &&numberRegex.test(password)) {
      if (num !== null)
        num.style.color = "green"
    } else { correctPasswordFlag = false }

    if (password !== undefined &&specialCharacter.test(password)) {
      if (spec !== null)
        spec.style.color = "green"
    } else { correctPasswordFlag = false }

    return correctPasswordFlag
  }

  function validateConfirm(confirmed: string | undefined)
  {
    const match = document.getElementById("match")
    if (match !== null)
      match.style.color = "red"

    if(passwordInput===confirmed)
    {
      if(match !== null)
        match.style.color = "green" 
    }
  }
};

export default Register;


