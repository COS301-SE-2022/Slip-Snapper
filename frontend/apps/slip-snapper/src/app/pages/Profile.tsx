import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonAlert,
  IonProgressBar,
  IonIcon,
  IonText,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { NavButtons } from '../components/NavButtons';
import { EditBudgets } from '../components/EditBudgets';
import '../theme/profile.css';
import '../theme/toasts.css';
import { setBudgetA, getProfileData } from "../../api/apiCall"
import Budget from '../components/Budget';
import { UserStats } from '../components/UserStats';
import { create } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { float } from 'aws-sdk/clients/lightsail';

const Profile: React.FC = () => {
  const [logoutAlert, setLogoutAlert] = useState(false);
  const [weeklyBudgetAlert, setWeeklyBudgetAlert] = useState(false);
  const [monthlyBudgetAlert, setMonthlyBudgetAlert] = useState(false);
  const [userDetails, setUserDetails] = useState({firstname: "", lastname: ""});
  const val = { weekly: 0, monthly: 0 };
  const history = useHistory();

  let totalWeeklySpent: number, totalMonthlySpent: number
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user')!)
    if(user==null){
        user = {id: 24}
    }
    setUserDetails(user)
    getProfileData(user.id)
      .then(
        apiResponse => {
          if(typeof(apiResponse.data) !== "string"){
            //Budget amounts
            val.weekly = apiResponse.data.weekly;
            val.monthly = apiResponse.data.monthly;

            //Expenditures
            totalWeeklySpent = apiResponse.data.weeklyTotal;
            totalMonthlySpent = apiResponse.data.monthlyTotal;
            console.log(totalWeeklySpent)

            isExceeded(val.weekly,val.monthly);

            setWeeklyBudget(val.weekly)
            setMonthlyBudget(val.monthly)
            setProfile(apiResponse.data)
          }
        })
  }, []);
  const [weeklyBudgetValue, setWeeklyBudget] = useState<number>(val.weekly);
  const [monthlyBudgetValue, setMonthlyBudget] = useState<number>(val.monthly);
  const [profile, setProfile] = useState({favouriteStore:{name:"",receipts:[{id:0,total:0}]},weeklyTotal:0, monthlyTotal:0});
  let weeklyBudget: number, monthlyBudget: number
  return(
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="end">
            <NavButtons />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <div className="wrapper">
          <IonCard className="card profile" color="primary">
            <IonCardHeader>
              <IonItem className="headings" color="primary">
                <IonCardTitle>User details</IonCardTitle>
              </IonItem>
              <IonItem className="center-items username" color="tertiary">
                <IonText>Name: {userDetails.firstname} {userDetails.lastname}</IonText>
              </IonItem>
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img className="profilePhoto" src="..\assets\mock-images\profile-picture-sample.jpg" alt="profile-picture" />
            </IonCardHeader>
          </IonCard>

          <IonCard className="card budget" color="primary">
            <IonCardHeader>
              <IonItem className="headings" color="primary">
                <IonCardTitle>Personal Budget</IonCardTitle>
              </IonItem>
              <IonItem id="weekly-budget" className="center-items" color="tertiary">
                <IonIcon data-testid="weekly-budget-icon" className="edit-budget" src={create} onClick={() => setWeeklyBudgetAlert(true)}/>
                <IonText>Weekly: R{weeklyBudgetValue}</IonText>
                <IonProgressBar id='weeklyProgressBar' class='progressBar' slot="end"></IonProgressBar><br />
              </IonItem>
              <IonItem id="monthly-budget" className="center-items" color="tertiary">
                <IonIcon data-testid="monthly-budget-icon" className="edit-budget" src={create} onClick={() => setMonthlyBudgetAlert(true)}/>
                <IonText>Monthly: R{monthlyBudgetValue}</IonText>
                <IonProgressBar id='monthlyProgressBar' class='progressBar' slot="end"></IonProgressBar><br />
              </IonItem>
            </IonCardHeader>

            {/* Weekly Budget */}
            <IonAlert
              isOpen={weeklyBudgetAlert}
              data-testid="weekly-budget-alert"
              onDidDismiss={() => setWeeklyBudgetAlert(false)}
              header={'Change Budget'}
              inputs={[
                {
                  name: 'weeklyBudget',
                  type: 'text',
                  placeholder: 'Insert Weekly Budget'
                }]}

              buttons={[
                {
                  text: 'Cancel'
                },
                {
                  role: 'applyWeeklyBudget',
                  text: 'Apply',
                  handler: (alertData) => {
                    applyToBudget(alertData.weeklyBudget, "");
                    isExceeded(weeklyBudget, monthlyBudget)
                    
                  }
                }
              ]}></IonAlert>
              
              {/* Monthly Budget */}
              <IonAlert
              isOpen={monthlyBudgetAlert}
              data-testid="monthly-budget-alert"
              onDidDismiss={() => setMonthlyBudgetAlert(false)}
              header={'Change Budget'}
              inputs={[
                {
                  id: "monthlyBudget",
                  name: 'monthlyBudget',
                  type: 'text',
                  placeholder: 'Insert Monthly Budget'
                }]}

              buttons={[
                {
                  text: 'Cancel'
                },
                {
                  role: 'applyMonthlyBudget',
                  text: 'Apply',
                  handler: (alertData) => {
                    applyToBudget("", alertData.monthlyBudget);
                    console.log(monthlyBudgetValue)
                    isExceeded(weeklyBudget, monthlyBudget)
                  }
                }
              ]}></IonAlert>

            <IonCardHeader>
              <IonItem className="headings" color="primary">
                <IonCardTitle>Category Budgets</IonCardTitle>
              </IonItem>
              <Budget />
              <EditBudgets />
            </IonCardHeader>
          </IonCard>
          
          <IonCard className="card favourite" color="primary">
            <IonCardHeader>
              <IonItem className="headings" color="primary">
                <IonCardTitle>Most Frequent Store</IonCardTitle>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonText data-testid='favoriteStore'>{profile.favouriteStore.name}</IonText>
              </IonItem>
            </IonCardHeader>

            <IonCardHeader>
              <IonItem className="headings" color="primary">
                <IonCardTitle>Recent Receipts</IonCardTitle>
              </IonItem>
              {profile.favouriteStore.receipts.map((item: any, index: number) => {
                return(
                  <IonItem key={index} className="center-items" color="tertiary">
                    <IonText>Receipt #{item.id}: R{item.total}</IonText>
                  </IonItem>
                )
              })}
            </IonCardHeader>
          </IonCard>
        </div>
        <UserStats />
        <IonButton className="logout-button" onClick={() => setLogoutAlert(true)} expand="block" color='medium'>Logout</IonButton>
        <IonAlert
          isOpen={logoutAlert}
          onDidDismiss={() => setLogoutAlert(false)}
          header="Confirm Logout"
          message="Are you sure you want to logout?"
          buttons={[
            'Cancel',
            {
              text: 'Logout',
              cssClass: 'toasts',
              handler: () => {
                Logout();
              }
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );

  function Logout() {
    history.push("/login")
    window.location.reload()
  }

  function applyToBudget(newWeeklyBudget: string, newMonthlyBudget: string) {
    let user = JSON.parse(localStorage.getItem('user')!)
    if(user==null){
        user = {id: 24}
    }
    weeklyBudget = parseFloat(newWeeklyBudget)
    monthlyBudget = parseFloat(newMonthlyBudget)
    if (!isNaN(weeklyBudget)) {
      setWeeklyBudget(weeklyBudget)

    }
    if (!isNaN(monthlyBudget)) {
      setMonthlyBudget(monthlyBudget)
    }

    setBudgetA(user.id, weeklyBudget, monthlyBudget)
    
  }

  function isExceeded(wB:float,mB:float) {
    const withinWeeklyBudget = totalWeeklySpent / wB
    const withinMonthlyBudget = totalMonthlySpent / mB

    console.log("WSpent = " + totalWeeklySpent)
    console.log("MSpent = "+totalMonthlySpent)
    console.log("WBudget = " + wB)
    console.log("MBudget = " + mB)



    if (totalWeeklySpent >= wB && !isNaN(wB)) {
      document.getElementById("weeklyProgressBar")?.setAttribute("color", "danger")
    }
    else if (totalWeeklySpent >= wB / 2 && !isNaN(wB)) {
      document.getElementById("weeklyProgressBar")?.setAttribute("color", "warning")
    }
    else if (!isNaN(wB)) {
      document.getElementById("weeklyProgressBar")?.setAttribute("color", "success")
    }

    if (totalMonthlySpent >= mB && !isNaN(mB)) {
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "danger")
    }
    else if (totalMonthlySpent >= mB / 2 && !isNaN(mB)) {
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "warning")
    }
    else if (!isNaN(mB)) {
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "success")
    }

    document.getElementById("weeklyProgressBar")?.setAttribute("value", withinWeeklyBudget.toString())
    document.getElementById("monthlyProgressBar")?.setAttribute("value", withinMonthlyBudget.toString())

    if (wB === 0) {
      document.getElementById("weeklyProgressBar")?.setAttribute("value", "0")
      document.getElementById("weeklyProgressBar")?.setAttribute("color", "success")
    }

    if (mB === 0) {
      document.getElementById("monthlyProgressBar")?.setAttribute("value", "0")
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "success")
    }

  }
};
export default Profile;