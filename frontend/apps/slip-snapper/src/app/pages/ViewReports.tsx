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
import '../theme/viewReports.css';

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
              <IonItem>
                27th May 2022 - 3:32pm
                <IonButton class="viewButton" fill="outline" slot="end">
                  View
                </IonButton>
                <IonButton fill="outline" slot="end" color="secondary">
                  Delete
                </IonButton>
              </IonItem>
              <IonItem>
                28th May 2022 - 4:50pm
                <IonButton class="viewButton" fill="outline" slot="end">
                  View
                </IonButton>
                <IonButton fill="outline" slot="end" color="secondary">
                  Delete
                </IonButton>
              </IonItem>
              <IonItem>
                29th May 2022 - 09:33
                <IonButton class="viewButton" fill="outline" slot="end">
                  View
                </IonButton>
                <IonButton fill="outline" slot="end" color="secondary">
                  Delete
                </IonButton>
              </IonItem>
              <IonItem>
                29th May 2022 - 19:00
                <IonButton class="viewButton" fill="outline" slot="end">
                  View
                </IonButton>
                <IonButton fill="outline" slot="end" color="secondary">
                  Delete
                </IonButton>
              </IonItem>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default ViewReports;
