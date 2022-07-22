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
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonAlert,
  IonInput,
  IonProgressBar,
  IonTextarea,
  IonList,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { NavButtons } from '../components/NavButtons';
import { EditBudgets } from '../components/EditBudgets';
import '../theme/profile.css';
import '../theme/toasts.css';
import { setBudgetA, getBudgetA} from "../../api/apiCall"
import Budget from '../components/Budget';
import { UserStats } from '../components/UserStats';
import { create } from 'ionicons/icons';

const Profile: React.FC = () => {
  const [logoutAlert, setLogoutAlert] = useState(false);
  const [budgetAlert, setBudgetAlert] = useState(false);
  const val = { weekly: 0, monthly: 0 };

  let totalWeeklySpent = 300;
  let totalMonthlySpent = 500;
  useEffect(() => {
    getBudgetA(1)
      .then(
        apiResponse => {
          val.weekly = apiResponse.data.weekly;
          val.monthly = apiResponse.data.monthly;
          totalWeeklySpent = apiResponse.data.weeklyTotal;
          totalMonthlySpent = apiResponse.data.monthlyTotal;
          setWeeklyBudget("Weekly Budget: R" + val.weekly)
          setMonthlyBudget("Monthly Budget: R" + val.monthly)
        })
  }, []);
  const [weeklyBudgetValue, setWeeklyBudget] = useState<string>("Weekly Budget: R" + val.weekly);
  const [monthlyBudgetValue, setMonthlyBudget] = useState<string>("Monthly Budget: R" + val.monthly);
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
              <IonItem className="center-items" color="tertiary">
                <IonCardSubtitle>Name: Christian Devraj </IonCardSubtitle>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonCardSubtitle>My Business: Isabella's Decor and Gifts</IonCardSubtitle>
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
            </IonCardHeader>
            <IonItem onClick={() => setBudgetAlert(true)} id="weekly-budget" className="dynamic-items" color="tertiary">
              <IonIcon className="edit-budget" src={create}/>
              <IonInput readonly value={weeklyBudgetValue}></IonInput>
              <IonProgressBar id='weeklyProgressBar' class='progressBar' ></IonProgressBar><br />
            </IonItem>
            <IonItem onClick={() => setBudgetAlert(true)} id="monthly-budget" className="dynamic-items" color="tertiary">
              <IonIcon className="edit-budget" src={create}/>
              <IonInput readonly value={monthlyBudgetValue}></IonInput>
              <IonProgressBar id='monthlyProgressBar' class='progressBar' ></IonProgressBar><br />
            </IonItem>
            <IonAlert
              isOpen={budgetAlert}
              onDidDismiss={() => setBudgetAlert(false)}
              header={'Change Budget'}
              inputs={[
                {
                  name: 'weeklyBudget',
                  type: 'text',
                  placeholder: 'Insert Weekly Budget'
                },
                {
                  id: "monthlyBudget",
                  name: 'monthlyBudget',
                  type: 'text',
                  placeholder: 'Insert Monthly Budget'
                },]}

              buttons={[
                {
                  text: 'Cancel'
                },
                {
                  role: 'applyBudget',
                  text: 'Apply',
                  handler: (alertData) => {
                    applyToBudget(alertData.weeklyBudget, alertData.monthlyBudget);
                    isExceeded()
                  }
                }
              ]}></IonAlert>

            <IonItem className="headings" color="primary">
              <IonCardTitle>Category Budgets</IonCardTitle>
            </IonItem>
            <Budget />
            <EditBudgets />
          </IonCard>
          
          <IonCard className="card favourite" color="primary">
            <IonCardHeader>
              <IonItem className="headings" color="primary">
                <IonCardTitle>Favorite Store</IonCardTitle>
              </IonItem>
              <IonItem className="headings" color="primary">
                <IonCardTitle>(Most frequent this month)</IonCardTitle>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonCardSubtitle><IonTextarea title="favoriteStore" id='favoriteStore' readonly ></IonTextarea></IonCardSubtitle>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonCardSubtitle><IonTextarea title="favoriteTotal" id='favoriteTotal' readonly ></IonTextarea></IonCardSubtitle>
              </IonItem>
            </IonCardHeader>
            <IonList className="list">
              <IonItem className="center-items" color="tertiary">
                <IonLabel>28 May 2022: R110.99</IonLabel>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonLabel>23 May 2022: R99.49</IonLabel>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonLabel>22 May 2022: R139.49</IonLabel>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonLabel>20 May 2022: R350.99</IonLabel>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonLabel>...</IonLabel>
              </IonItem>
            </IonList>
            <IonItem color="primary">
              <IonButton fill="solid" slot="end" color="secondary">
                View
              </IonButton>
            </IonItem>
          </IonCard>
        </div>
        <UserStats />
        <IonButton className="logout-button" onClick={() => setLogoutAlert(true)} expand="block" color='secondary'>Logout</IonButton>

        <IonAlert
          id="logout-alert"
          isOpen={logoutAlert}
          onDidDismiss={() => setLogoutAlert(false)}
          header={'Are you sure you want to logout?'}
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
        ></IonAlert>
      </IonContent>
    </IonPage>
  );

  function Logout() {
    throw new Error('Function not implemented.');
  }

  function applyToBudget(newWeeklyBudget: string, newMonthlyBudget: string) {
    weeklyBudget = parseFloat(newWeeklyBudget)
    monthlyBudget = parseFloat(newMonthlyBudget)
    if (!isNaN(weeklyBudget)) {
      setWeeklyBudget("Weekly Budget: R" + weeklyBudget.toString())
    }
    if (!isNaN(monthlyBudget)) {
      setMonthlyBudget("Monthly Budget:R " + monthlyBudget.toString())
    }

    setBudgetA(1, weeklyBudget, monthlyBudget)
  }

  function isExceeded() {
    const withinWeeklyBudget = totalWeeklySpent / weeklyBudget
    const withinMonthlyBudget = totalMonthlySpent / monthlyBudget

    if (totalWeeklySpent >= weeklyBudget && !isNaN(weeklyBudget)) {
      document.getElementById("weeklyProgressBar")?.setAttribute("color", "danger")
    }
    else if (totalWeeklySpent >= weeklyBudget / 2 && !isNaN(weeklyBudget)) {
      document.getElementById("weeklyProgressBar")?.setAttribute("color", "warning")
    }
    else if (!isNaN(weeklyBudget)) {
      document.getElementById("weeklyProgressBar")?.setAttribute("color", "success")
    }

    if (totalMonthlySpent >= monthlyBudget && !isNaN(monthlyBudget)) {
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "danger")
    }
    else if (totalMonthlySpent >= monthlyBudget / 2 && !isNaN(monthlyBudget)) {
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "warning")
    }
    else if (!isNaN(monthlyBudget)) {
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "success")
    }

    document.getElementById("weeklyProgressBar")?.setAttribute("value", withinWeeklyBudget.toString())
    document.getElementById("monthlyProgressBar")?.setAttribute("value", withinMonthlyBudget.toString())

    if (weeklyBudget === 0) {
      document.getElementById("weeklyProgressBar")?.setAttribute("value", "0")
      document.getElementById("weeklyProgressBar")?.setAttribute("color", "success")
    }

    if (monthlyBudget === 0) {
      document.getElementById("monthlyProgressBar")?.setAttribute("value", "0")
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "success")
    }

  }
};
export default Profile;