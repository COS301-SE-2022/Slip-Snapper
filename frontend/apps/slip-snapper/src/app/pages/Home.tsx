import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonRow,
  IonFooter,
  IonCol,
  IonCard,
  IonButton,
  IonCardHeader,
  IonCardTitle,
  IonItem,
} from '@ionic/react';
import React from 'react';
import TakePictureButton from '../components/TakePictureButton';
import { NavButtons } from '../components/NavButtons';
import ReportItem from '../components/ReportItem';
import { generateReportA } from "../../api/apiCall"
import '../theme/home.css';
import ViewReportItem from '../components/ViewReportItem';

const Home: React.FC = () => {
  const mockReports = [{ reportNumber: "Report #8", date: "10/05/20" }, { reportNumber: "Report #9", date: "10/05/21" },
  { reportNumber: "Report #10", date: "10/05/22" }, { reportNumber: "Report #11", date: "10/05/23" }]

  const mockThisWeeksReports = [{ dateTime: "27th May 2022 - 3:32pm" }, { dateTime: "27th May 2022 - 4:00pm" }, { dateTime: "27th May 2022 - 5:00pm" },]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Slip Snapper</IonTitle>
          <IonButtons slot="end">
            <NavButtons />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonTitle>Recent Reports</IonTitle>

        <IonRow>
          {mockReports.map((reps, index) => {
            return (
              <ReportItem key={index} reportData={[reps.reportNumber, reps.date]} />
            )
          })
          }
        </IonRow>

        <IonTitle>Report Summary</IonTitle>
        <IonRow>
          <IonCol>
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>Todays Report:</IonCardTitle>
              </IonCardHeader>
              <IonItem color="tertiary">Items Bought: 12</IonItem>
              <IonItem color="tertiary">Total Expenditure: R899.99 </IonItem>
              <IonItem color="tertiary">
                <IonButton color="success" fill="solid" slot="end">
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
                  <ViewReportItem key={index} dateTime={item.dateTime} />
                )
              })
              }
            </IonCard>
          </IonCol>
        </IonRow>

      </IonContent>
      <IonFooter>
        <TakePictureButton />
      </IonFooter>
      <IonFooter>
        <IonToolbar color="primary"></IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;