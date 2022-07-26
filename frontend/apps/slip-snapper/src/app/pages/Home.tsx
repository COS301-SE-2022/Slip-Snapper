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
import React, { useEffect, useState } from 'react';
import TakePictureButton from '../components/TakePictureButton';
import { NavButtons } from '../components/NavButtons';
import ReportItem from '../components/ReportItem';
import { generateReportA, getRecentReports } from "../../api/apiCall"
import '../theme/home.css';
import ViewReportItem from '../components/ViewReportItem';

const Home: React.FC = () => {
  const mockThisWeeksReports = [{ dateTime: "27th May 2022 - 3:32pm" }, { dateTime: "27th May 2022 - 4:00pm" }, { dateTime: "27th May 2022 - 5:00pm" },]
  const [r, setR] = useState<any[]>([]);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user')!)
    if(user==null){
        user = {id: 24}
    }
    getRecentReports(user.id)
      .then(apiResponse => {
        setR(apiResponse.data.reports);
      });
  }, []);
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
        <IonItem>
          <IonTitle>Recent Reports</IonTitle>
        </IonItem>

        <IonRow>
          {r.map((reps, index) => {
            return (
              <ReportItem key={index} reportData={[reps.reportId, reps.reportName]} />
            )
          })
          }
        </IonRow>

        <IonItem>
          <IonTitle>Report Summary</IonTitle>
        </IonItem>
        <IonRow>
          <IonCol>
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>Todays Report:</IonCardTitle>
              </IonCardHeader>
              <IonItem color="tertiary">Items Bought: 12</IonItem>
              <IonItem color="tertiary">Total Expenditure: R899.99 </IonItem>
              <IonItem color="tertiary">
                <IonButton color="secondary" fill="solid" slot="end">
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