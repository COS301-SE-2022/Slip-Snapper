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
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { NavButtons } from '../components/NavButtons';
import { EditBudgets } from '../components/EditBudgets';
import '../theme/profile.css';
import '../theme/toasts.css';
import { setBudgetA, getProfileData, getStatsA } from "../../api/apiCall"
import Budget from '../components/Budget';
import { UserStats } from '../components/UserStats';
import { create } from 'ionicons/icons';
import { helpCircleOutline } from 'ionicons/icons';
import { Popover } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { float } from 'aws-sdk/clients/lightsail';
import {destroySession} from "../../api/Session"

const Profile: React.FC = () => {
  const [logoutAlert, setLogoutAlert] = useState(false);
  const [weeklyBudgetAlert, setWeeklyBudgetAlert] = useState(false);
  const [monthlyBudgetAlert, setMonthlyBudgetAlert] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username:"",
    firstname: "",
    lastname: "",
    email: "",
  });
  const [expenditure, setExpenditure] = useState({ weekly: 0, monthly: 0 });
  const val = { weekly: 0, monthly: 0 };
  const [userStats, setUserStats] = useState({
    category: {
      amount: 0,
      name: ""
    },
    lastMonth: {
      current: 0,
      previous: 0
    },
    lastWeek: {
      current: 0,
      previous: 0
    },
    mostExpensive: {
      name: "",
      amount: 0
    }
  });
  const history = useHistory();
  const [present, dismiss] = useIonToast();

  useEffect(() => {
    getProfileData()
      .then(
        apiResponse => {
          if (typeof (apiResponse.data) !== "string") {
            destroySession(apiResponse);
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
            setUserDetails(apiResponse.data.user.user)
          }
        })

    getStatsA()
      .then(
        apiResponse => {
          if (typeof (apiResponse.data) !== "string") {
            setUserStats(apiResponse.data)
          }
        })
  }, []);
  const [weeklyBudgetValue, setWeeklyBudget] = useState<number>(val.weekly);
  const [monthlyBudgetValue, setMonthlyBudget] = useState<number>(val.monthly);
  const [profile, setProfile] = useState({ favouriteStore: { name: "", receipts: [{ id: 0, total: 0 }] }, weeklyTotal: 0, monthlyTotal: 0 });
  let weeklyBudget: number, monthlyBudget: number

  const [mostFrequent, setMostFrequent] = useState(null);
  const openMostFrequent = (event:any) => { setMostFrequent(event.currentTarget); };
  const closeMostFrequent = () => { setMostFrequent(null); };

  const [mostExpensive, setMostExpensive] = useState(null);
  const openMostExpensive = (event: any) => { setMostExpensive(event.currentTarget); };
  const closeMostExpensive = () => { setMostExpensive(null); };



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

              <div>
                  <IonItem className="center-items" color="tertiary">
                    <IonText>Username: </IonText>
                    <IonText slot='end'>{userDetails.username}</IonText>
                  </IonItem>

                  <IonItem className="center-items" color="tertiary">
                    <IonText>Full Name: </IonText>
                    <IonText slot='end'>{userDetails.firstname + " " + userDetails.lastname}</IonText>
                  </IonItem>

                  <IonItem className="center-items" color="tertiary">
                    <IonText>Email Address</IonText>
                    <IonText slot='end'>{userDetails.email}</IonText>
                  </IonItem>
              </div>
              
              <IonItem className="headings" color="primary">
                <IonCardTitle>Personal Budget</IonCardTitle>
              </IonItem>

              <div>
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
              </div>

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
                <IonIcon src={helpCircleOutline} onClick={openMostFrequent} className="info-icon"/>
                        <Popover
                            open={Boolean(mostFrequent)}
                            onClose={closeMostFrequent}
                            anchorEl={mostFrequent}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                              }}
                        >
                            <p className="popover-text">The store that you have purchased products at most frequently this month.</p>
                        </Popover>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonText data-testid='favoriteStore'>{profile.favouriteStore.name}</IonText>
              </IonItem>
            </IonCardHeader>

            <IonCardHeader>
              <IonItem lines='none' className="headings" color="primary">
                <IonCardTitle>Most Expensive Recent Purchase</IonCardTitle>
                <IonIcon src={helpCircleOutline} onClick={openMostExpensive} className="info-icon" />
                <Popover
                  open={Boolean(mostExpensive)}
                  onClose={closeMostExpensive}
                  anchorEl={mostExpensive}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <p className="popover-text">The most expensive purchase that you have made this month.</p>
                </Popover>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonText data-testid='storeName'>Item: {userStats.mostExpensive.name}</IonText>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonText data-testid='storeTotal'>Amount: R{userStats.mostExpensive.amount.toFixed(2)}</IonText>
              </IonItem>
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
    localStorage.removeItem('user')
    sessionStorage.removeItem('token')
    window.location.reload()
  }

  function applyToBudget(budgetType: string, newBudget: string) {
    
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

        setBudgetA(weeklyBudget, NaN)

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

        setBudgetA( NaN, monthlyBudget)
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