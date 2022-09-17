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
  useIonToast,
  IonGrid,
  IonCol,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { NavButtons } from '../components/NavButtons';
import { EditBudgets } from '../components/EditBudgets';
import { ProfileImage } from '../components/ProfileImage';
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

  const [userDetails, setUserDetails] = useState({ username: "" });
  const [expenditure, setExpenditure] = useState({ weekly: 0, monthly: 0 });
  const val = { weekly: 0, monthly: 0 };
  const history = useHistory();
  
  const [present, dismiss] = useIonToast();

  // let totalWeeklySpent: number, totalMonthlySpent: number
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user')!)
    if (user == null) {
      user = { id: 24 }
    }
    setUserDetails(user)
    getProfileData(user.id)
      .then(
        apiResponse => {
          if (typeof (apiResponse.data) !== "string") {
            //Budget amounts
            val.weekly = apiResponse.data.weekly;
            val.monthly = apiResponse.data.monthly;

            //Expenditures
            expenditure.weekly = apiResponse.data.weeklyTotal;
            expenditure.monthly = apiResponse.data.monthlyTotal;

            isExceeded(val.weekly, val.monthly);

            setWeeklyBudget(val.weekly)
            setMonthlyBudget(val.monthly)
            setProfile(apiResponse.data)
          }
        })
  }, []);
  const [weeklyBudgetValue, setWeeklyBudget] = useState<number>(val.weekly);
  const [monthlyBudgetValue, setMonthlyBudget] = useState<number>(val.monthly);
  const [profile, setProfile] = useState({ favouriteStore: { name: "", receipts: [{ id: 0, total: 0 }] }, weeklyTotal: 0, monthlyTotal: 0 });
  let weeklyBudget: number, monthlyBudget: number
  return (
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

              <IonGrid>
                <div className="wrapper">
                  <IonCol className='profile-elem'>
                        <ProfileImage/>
                      </IonCol>
                  <IonCol className='profile-elem'>
                    <IonItem className="center-items username" color="tertiary">
                      <IonText>{userDetails.username}</IonText>
                    </IonItem>
                  </IonCol>
                </div>
              </IonGrid>

              <IonCardHeader>
              <IonItem className="headings" color="primary">
                <IonCardTitle>Personal Budget</IonCardTitle>
              </IonItem>
              <IonItem id="weekly-budget" className="center-items" color="tertiary">
                <IonIcon data-testid="weekly-budget-icon" className="edit-budget" src={create} onClick={() => setWeeklyBudgetAlert(true)} />
                  <IonText>Weekly: R{weeklyBudgetValue.toFixed(2)}</IonText>
                <IonProgressBar id='weeklyProgressBar' class='progressBar' slot="end"></IonProgressBar><br />
              </IonItem>
              <IonItem id="monthly-budget" className="center-items" color="tertiary">
                <IonIcon data-testid="monthly-budget-icon" className="edit-budget" src={create} onClick={() => setMonthlyBudgetAlert(true)} />
                  <IonText>Monthly: R{monthlyBudgetValue.toFixed(2)}</IonText>
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
                    applyToBudget("weekly",alertData.weeklyBudget);
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
                    applyToBudget("monthly", alertData.monthlyBudget);
                  }
                }
              ]}></IonAlert>
            </IonCardHeader>
          </IonCard>

          <IonCard className="card budget" color="primary">
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
              {profile?.favouriteStore.receipts.map((item: any, index: number) => {
                return (
                  <IonItem key={index} className="center-items" color="tertiary">
                    <IonText>Receipt #{item.slipNumber}: R{item.total.toFixed(2)}</IonText>
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
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.reload()
  }

  function applyToBudget(budgetType: string, newBudget: string) {
    let user = JSON.parse(localStorage.getItem('user')!)
    if (user == null) {
      user = { id: 24 }
    }

    if(budgetType==="weekly")
    {
      weeklyBudget = parseFloat(newBudget)

      if (isNaN(weeklyBudget) || weeklyBudget < 0) {
        present("Invalid weekly budget set", 1200)
      }

      else {
        setWeeklyBudget(weeklyBudget)
        isExceeded(weeklyBudget, monthlyBudget)
        present("New weekly budget applied", 1200)

        setBudgetA(user.id, weeklyBudget, NaN)

      }

    }

    if (budgetType === "monthly")
    {
      monthlyBudget = parseFloat(newBudget)

      if (isNaN(monthlyBudget) || monthlyBudget < 0) {
        present("Invalid Monthly budget set", 1200)
      }

      else {
        setMonthlyBudget(monthlyBudget)
        isExceeded(weeklyBudget, monthlyBudget)
        present("New monthly budget applied", 1200)

        setBudgetA(user.id, NaN, monthlyBudget)
      }
    }
  }

  function isExceeded(weekly_Budget: float, monthly_Budget: float) {
    const withinWeeklyBudget = expenditure.weekly / weekly_Budget
    const withinMonthlyBudget = expenditure.monthly / monthly_Budget

    if (expenditure.weekly >= weekly_Budget && !isNaN(weekly_Budget)) {
      document.getElementById("weeklyProgressBar")?.setAttribute("color", "danger")
    }
    else if (expenditure.weekly >= weekly_Budget / 2 && !isNaN(weekly_Budget)) {
      document.getElementById("weeklyProgressBar")?.setAttribute("color", "warning")
    }
    else if (!isNaN(weekly_Budget)) {
      document.getElementById("weeklyProgressBar")?.setAttribute("color", "success")
    }

    if (expenditure.monthly >= monthly_Budget && !isNaN(monthly_Budget)) {
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "danger")
    }
    else if (expenditure.monthly >= monthly_Budget / 2 && !isNaN(monthly_Budget)) {
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "warning")
    }
    else if (!isNaN(monthly_Budget)) {
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "success")
    }

    document.getElementById("weeklyProgressBar")?.setAttribute("value", withinWeeklyBudget.toString())
    document.getElementById("monthlyProgressBar")?.setAttribute("value", withinMonthlyBudget.toString())

    if (monthly_Budget <= 0) {
      document.getElementById("weeklyProgressBar")?.setAttribute("value", "0")
      document.getElementById("weeklyProgressBar")?.setAttribute("color", "success")
    }

    if (monthly_Budget <= 0) {
      document.getElementById("monthlyProgressBar")?.setAttribute("value", "0")
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "success")
    }

  }
};
export default Profile;