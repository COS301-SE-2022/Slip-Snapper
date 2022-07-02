import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonButton,
  IonRow,
  IonCol,
  IonFooter,
} from '@ionic/react';
import React from 'react';
import TakePictureButton from '../components/TakePictureButton';
import { NavButtons } from '../components/NavButtons';
import ReportItem from '../components/ReportItem';
import { generateReportA } from "../../api/apiCall"

const Home: React.FC = () => {
  const mockData = [{ reportNumber: "Report #8", Date: "10/05/20" }, { reportNumber: "Report #9", Date: "10/05/21" },
  { reportNumber: "Report #10", Date: "10/05/22" }, { reportNumber: "Report #11", Date: "10/05/23" }]
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
          {mockData.map((t) => {
            return (
              <ReportItem reportData={t} />
            )
          })
          }

        </IonRow>


        <IonTitle>Expenditure Totals</IonTitle>

        <IonCard color="primary">
          <IonCardHeader>
            <IonCardTitle>Daily Total</IonCardTitle>
            <IonCardSubtitle>R137.69</IonCardSubtitle>
          </IonCardHeader>
          <IonItem>
            <IonButton
              fill="outline"
              title="generateDR"
              slot="end"
              color="secondary"
              onClick={() => generateReport('day')}
            >
              Generate Report
            </IonButton>
          </IonItem>
        </IonCard>

        <IonCard color="primary">
          <IonCardHeader>
            <IonCardTitle>Weekly Total</IonCardTitle>
            <IonCardSubtitle>R912.21</IonCardSubtitle>
          </IonCardHeader>
          <IonItem>
            <IonButton
              fill="outline"
              title="generateWR"
              slot="end"
              color="secondary"
              onClick={() => generateReport('week')}
            >
              Generate Report
            </IonButton>
          </IonItem>
        </IonCard>

        <IonCard color="primary">
          <IonCardHeader>
            <IonCardTitle>Monthly Total</IonCardTitle>
            <IonCardSubtitle>R4013.01</IonCardSubtitle>
          </IonCardHeader>
          <IonItem>
            <IonButton
              fill="outline"
              title="generateMR"
              slot="end"
              color="secondary"
              onClick={() => generateReport('month')}
            >
              Generate Report
            </IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
      <IonFooter>
        <TakePictureButton />
      </IonFooter>
      <IonFooter>
        <IonToolbar color="primary"></IonToolbar>
      </IonFooter>
    </IonPage>
  );

  function generateReport(type: string) {
    const url = 'http://localhost:55555/api/report/generate?userId=1&period=' + type;

    generateReportA(url)
      .then((res) => res.json());
  }
};

export default Home;
