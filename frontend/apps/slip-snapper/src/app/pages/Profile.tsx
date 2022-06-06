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
  IonLabel,
  IonList,
  IonCol,
  IonRow,
  IonAlert,
  IonImg,
  IonThumbnail,
} from '@ionic/react';
import React, { useState } from 'react';
import { NavButtons } from '../components/NavButtons';
import '../theme/profile.css';

const Profile: React.FC = () => {
  const [logoutAlert, setLogoutAlert] = useState(false);
  const [budgetAlert, setBudgetAlert] = useState(false);
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
        <IonRow>
          <IonCol>
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>User details</IonCardTitle>
                <IonCardSubtitle>Name: Christian Devraj </IonCardSubtitle>
                <IonCardSubtitle>
                  My Business: Isabella's Decor and Gifts
                </IonCardSubtitle>

                <IonCardSubtitle>
                  <IonItem class="profilePhoto">
                    <IonThumbnail slot="start">
                      <IonImg src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                    </IonThumbnail>
                  </IonItem>
                </IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>

          <IonCol>
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>Personal Budget</IonCardTitle>
              </IonCardHeader>
              <IonItem>Daily Budget: R200</IonItem>
              <IonItem>Weekly Budget: R1500</IonItem>
              <IonItem>
                <IonButton onClick={() => setBudgetAlert(true)} fill="outline" slot="end" color="secondary">
                  Adjust Budget
                </IonButton>
                 <IonAlert
          isOpen={budgetAlert}
          onDidDismiss={() => setBudgetAlert(false)}
         
          header={'Change Budget'}
         
          inputs={[
            {
              name: 'dailyBudget',
              type: 'text',
              placeholder: 'Insert Daily Budget'
              
            },
            {
              name: 'weeklyBudget',
              type: 'text',
              placeholder: 'Insert Weekly Budget'
            },]}

          buttons={[
          {
            text:'Cancel'
          },
          {
            text:'Apply',
            
          },
            
          ]}
        ></IonAlert>
              </IonItem>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonCard color="primary">
          <IonCardHeader>
            <IonCardTitle>
              Favorite Store (Most frequent this month)
            </IonCardTitle>
            <IonCardSubtitle>Name: Woolworths</IonCardSubtitle>

            <IonCardSubtitle>Total: R2593.99</IonCardSubtitle>
          </IonCardHeader>

          <IonList>
            <IonItem>
              <IonLabel>...</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>20 May 2022: R110.99</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>22 May 2022: R99.49</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>23 May 2022: R139.49</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>28 May 2022: R350.99</IonLabel>
            </IonItem>
          </IonList>
          <IonItem>
            <IonButton fill="outline" slot="end" color="secondary">
              View
            </IonButton>
          </IonItem>
        </IonCard>

        <IonRow>
          <IonCol>
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>Most purchased item category</IonCardTitle>
                <IonCardSubtitle>Category: Food</IonCardSubtitle>
                <IonCardSubtitle>Total: R310.99</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>Most spent at a store</IonCardTitle>
                <IonCardSubtitle>Store: Sportsmans Warehouse</IonCardSubtitle>
                <IonCardSubtitle>Total: R5899.99</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>Expenditure compared to last week</IonCardTitle>
                <IonCardSubtitle>Last Week's Total: R1390.34</IonCardSubtitle>
                <IonCardSubtitle>This Week's Total: R900.54</IonCardSubtitle>
              </IonCardHeader>
              <IonItem>
                <IonButton fill="outline" slot="end" color="secondary">
                  Compare Reports
                </IonButton>
              </IonItem>
            </IonCard>
          </IonCol>

          <IonCol>
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>Expenditure compared to last month</IonCardTitle>
                <IonCardSubtitle>Last Month's Total: R10399.34</IonCardSubtitle>
                <IonCardSubtitle>This Month's Total: R12030.59</IonCardSubtitle>
              </IonCardHeader>
              <IonItem>
                <IonButton fill="outline" slot="end" color="secondary">
                  Compare Reports
                </IonButton>
              </IonItem>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonButton onClick={() => setLogoutAlert(true)} expand="block">
          Logout
        </IonButton>
        <IonAlert
          isOpen={logoutAlert}
          onDidDismiss={() => setLogoutAlert(false)}
          header={'Are you sure you want to logout?'}
          buttons={[
            'Cancel',
            {
              text: 'Logout',
              cssClass: 'my-custom-class',
                handler: () => {
                 Logout();
          }
            },
          ]}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

function Logout() {
  throw new Error('Function not implemented.');
}

