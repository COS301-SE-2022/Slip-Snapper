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
  IonCol,
  IonItem,
  IonRow,
} from '@ionic/react';
import React from 'react';
import { NavButtons } from '../components/NavButtons';
import ViewReportItems from '../components/ViewReportItems';
import '../theme/viewReports.css';

const mockThisWeeksReports = [{ dateTime: "27th May 2022 - 3:32pm" }, { dateTime: "27th May 2022 - 4:00pm" }, { dateTime: "27th May 2022 - 5:00pm" },]

const ViewReports: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>View Reports</IonTitle>
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
                <IonCardTitle>Todays Report:</IonCardTitle>
              </IonCardHeader>
              <IonItem>Items Bought: 12</IonItem>
              <IonItem>Total Expenditure: R899.99 </IonItem>
              <IonItem>
                <IonButton class="viewButton" fill="outline" slot="end">
                  View
                </IonButton>
              </IonItem>
            </IonCard>
          </IonCol>

          <IonCol>
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>This Week's Reports:</IonCardTitle>
              </IonCardHeader>

              {mockThisWeeksReports.map((item, index) => {
                return (
                  <ViewReportItems key={index} dateTime={item.dateTime} />
                )
              })
              }
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default ViewReports;
