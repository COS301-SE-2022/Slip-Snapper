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
  IonList,
  IonIcon,
  IonText,
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
    const user = JSON.parse(localStorage.getItem('user')!)
    getBudgetA(1)
      .then(
        apiResponse => {
          val.weekly = apiResponse.data.weekly;
          val.monthly = apiResponse.data.monthly;
          totalWeeklySpent = apiResponse.data.weeklyTotal;
          totalMonthlySpent = apiResponse.data.monthlyTotal;
          setWeeklyBudget(val.weekly)
          setMonthlyBudget(val.monthly)
        })
  }, []);
  const [weeklyBudgetValue, setWeeklyBudget] = useState<number>(val.weekly);
  const [monthlyBudgetValue, setMonthlyBudget] = useState<number>(val.monthly);
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
                <IonText>Name: Christian Devraj </IonText>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonText>My Business: Isabella's Decor and Gifts</IonText>
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
                <IonIcon data-testid="weekly-budget-icon" className="edit-budget" src={create} onClick={() => setBudgetAlert(true)}/>
                <IonText>Weekly: R{weeklyBudgetValue}</IonText>
                <IonProgressBar id='weeklyProgressBar' class='progressBar' slot="end"></IonProgressBar><br />
              </IonItem>
              <IonItem id="monthly-budget" className="center-items" color="tertiary">
                <IonIcon data-testid="monthly-budget-icon" className="edit-budget" src={create} onClick={() => setBudgetAlert(true)}/>
                <IonText>Monthly: R{monthlyBudgetValue}</IonText>
                <IonProgressBar id='monthlyProgressBar' class='progressBar' slot="end"></IonProgressBar><br />
              </IonItem>
            </IonCardHeader>
            <IonAlert
              isOpen={budgetAlert}
              data-testid="budget-alert"
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
                <IonText data-testid='favoriteStore'></IonText>
              </IonItem>
            </IonCardHeader>

            <IonCardHeader>
              <IonItem className="headings" color="primary">
                <IonCardTitle>Recent Receipts</IonCardTitle>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonText>28 May 2022: R110.99</IonText>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonText>23 May 2022: R99.49</IonText>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonText>22 May 2022: R139.49</IonText>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonText>20 May 2022: R350.99</IonText>
              </IonItem>
            </IonCardHeader>

            
            <IonItem color="primary">
              <IonButton fill="solid" slot="end" color="secondary">
                More
              </IonButton>
            </IonItem>
          </IonCard>
        </div>
        <UserStats />
        <IonButton className="logout-button" onClick={() => setLogoutAlert(true)} expand="block" color='secondary'>Logout</IonButton>
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

        {/* <IonAlert
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
        /> */}
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
      setWeeklyBudget(weeklyBudget)
    }
    if (!isNaN(monthlyBudget)) {
      setMonthlyBudget(monthlyBudget)
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