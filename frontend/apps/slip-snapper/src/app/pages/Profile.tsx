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
} from '@ionic/react';
import React, { useState } from 'react';
import { NavButtons } from '../components/NavButtons';
import { EditBudgets } from '../components/EditBudgets';
import '../theme/profile.css';
import '../theme/toasts.css';
import { setBudgetA, getBudgetA, getStatsA } from "../../api/apiCall"
import Budget from '../components/Budget';


const favourite = { store: "N/A", total: 0 }
const mostSpentCategory = { itemCategory: "N/A", total: 0 }
const mostSpentStore = { store: "N/A", total: 0 }
const weekMonthSpent = { lastWeek: 0, thisWeek: 0, lastMonth: 0, thisMonth: 0 }
const Profile: React.FC = () => {
  const [logoutAlert, setLogoutAlert] = useState(false);
  const [budgetAlert, setBudgetAlert] = useState(false);
  const val = { weekly: 0, monthly: 0 };

  let totalWeeklySpent = 300;
  let totalMonthlySpent = 500;
  getBudgetA(1)
    .then((res) => res.json())
    .then(
      (json) => {
        val.weekly = json.weekly;
        val.monthly = json.monthly;
        totalWeeklySpent = json.weeklyTotal;
        totalMonthlySpent = json.monthlyTotal;
      })

  getStatsA(1)
    .then((res) => res.json())
    .then(
      (json) => {
        mostSpentCategory.itemCategory = json.category.name;
        mostSpentCategory.total = json.category.amount;
        mostSpentStore.store = json.mostExpensive.name;
        mostSpentStore.total = json.mostExpensive.amount;
        weekMonthSpent.lastWeek = json.lastWeek.previous;
        weekMonthSpent.thisWeek = json.lastWeek.current;
        weekMonthSpent.lastMonth = json.lastMonth.previous;
        weekMonthSpent.thisMonth = json.lastMonth.current;
        favourite.store = json.favouriteStore.name;
        favourite.total = json.favouriteStore.total;

        setUserStatistics()

      })

  const [weeklyBudgetValue, setWeeklyBudget] = useState<string>("Weekly Budget: R" + val.weekly);
  const [monthlyBudgetValue, setMonthlyBudget] = useState<string>("Monthly Budget: R" + val.monthly);
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
            <IonItem onClick={() => setBudgetAlert(true)} id="weekly-budget" className="center-items" color="tertiary">
              <IonInput readonly value={weeklyBudgetValue}></IonInput>
              <IonProgressBar id='weeklyProgressBar' class='progressBar' ></IonProgressBar><br />
            </IonItem>
            <IonItem onClick={() => setBudgetAlert(true)} id="monthly-budget" className="center-items" color="tertiary">
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
        <div className="wrapper">
          <IonCard className="card weekly" color="primary">
            <IonCardHeader>
              <IonItem className="headings" color="primary">
                <IonCardTitle>Weekly Expenditure</IonCardTitle>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonCardSubtitle> <IonTextarea title="thisWeek" id='thisWeek' readonly ></IonTextarea></IonCardSubtitle>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonCardSubtitle> <IonTextarea title="lastWeek" id='lastWeek' readonly ></IonTextarea></IonCardSubtitle>
              </IonItem>
            </IonCardHeader>
            <IonItem color="primary">
              <IonButton fill="solid" slot="end" color="secondary">
                Compare Reports
              </IonButton>
            </IonItem>
          </IonCard>

          <IonCard className="card monthly" color="primary">
            <IonCardHeader>
              <IonItem className="headings" color="primary">
                <IonCardTitle>Monthly Expenditure</IonCardTitle>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonCardSubtitle><IonTextarea title="thisMonth" id='thisMonth' readonly ></IonTextarea></IonCardSubtitle>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonCardSubtitle><IonTextarea title="lastMonth" id='lastMonth' readonly ></IonTextarea></IonCardSubtitle>
              </IonItem>
            </IonCardHeader>
            <IonItem color="primary">
              <IonButton fill="solid" slot="end" color="secondary">
                Compare Reports
              </IonButton>
            </IonItem>
          </IonCard>


          <IonCard className="card most-purchased" color="primary">
            <IonCardHeader>
              <IonItem className="headings" color="primary">
                <IonCardTitle>Favourite Item Category</IonCardTitle>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonTextarea title="categoryName" id='categoryName' readonly ></IonTextarea>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonTextarea title="categoryTotal" id='categoryTotal' readonly></IonTextarea>
              </IonItem>
            </IonCardHeader>
          </IonCard>

          <IonCard className="card most-spent" color="primary">
            <IonCardHeader>
              <IonItem className="headings" color="primary">
                <IonCardTitle>Most Spent At Store</IonCardTitle>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonCardSubtitle> <IonTextarea title="storeName" id='storeName' readonly ></IonTextarea></IonCardSubtitle>
              </IonItem>
              <IonItem className="center-items" color="tertiary">
                <IonCardSubtitle> <IonTextarea title="storeTotal" id='storeTotal' readonly ></IonTextarea></IonCardSubtitle>
              </IonItem>
            </IonCardHeader>
          </IonCard>

        </div>

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

  function setUserStatistics() {
    document.getElementById("favoriteStore")?.setAttribute("value", "Store Name: " + favourite.store)
    document.getElementById("favoriteTotal")?.setAttribute("value", "Total: R" + favourite.total.toFixed(2).toString())
    document.getElementById("categoryName")?.setAttribute("value", "Item Category: " + mostSpentCategory.itemCategory)
    document.getElementById("categoryTotal")?.setAttribute("value", "Total: R" + mostSpentCategory.total.toFixed(2).toString())
    document.getElementById("storeName")?.setAttribute("value", "Store Name: " + mostSpentStore.store)
    document.getElementById("storeTotal")?.setAttribute("value", "Total: R" + mostSpentStore.total.toFixed(2).toString())
    document.getElementById("lastWeek")?.setAttribute("value", "Total Spent Last Week: R" + weekMonthSpent.lastWeek.toFixed(2).toString())
    document.getElementById("thisWeek")?.setAttribute("value", "Total Spent This Week: R" + weekMonthSpent.thisWeek.toFixed(2).toString())
    document.getElementById("lastMonth")?.setAttribute("value", "Total Spent Last Month: R" + weekMonthSpent.lastMonth.toFixed(2).toString())
    document.getElementById("thisMonth")?.setAttribute("value", "Total Spent This Month: R" + weekMonthSpent.thisMonth.toFixed(2).toString())
  }
};
export default Profile;