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
} from '@ionic/react';
import React from 'react';
import TakePictureButton from '../components/TakePictureButton';
import { NavButtons } from '../components/NavButtons';
import ReportItem from '../components/ReportItem';
import ReportTotal from '../components/ReportTotal';
import { generateReportA } from "../../api/apiCall"


const Home: React.FC = () => {
  const mockReports = [{ reportNumber: "Report #8", date: "10/05/20" }, { reportNumber: "Report #9", date: "10/05/21" },
  { reportNumber: "Report #10", date: "10/05/22" }, { reportNumber: "Report #11", date: "10/05/23" }]

  const mockTotals = [{ timePeriod: "Daily", total: "R200.02" }, { timePeriod: "Weekly", total: "R800.02" },
  { timePeriod: "Monthly", total: "R1000.50" }]




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

        <IonTitle>Expenditure Totals</IonTitle>
        {mockTotals.map((totals, index) => {
          return (
            <ReportTotal key={index} reportData={[totals.timePeriod, totals.total]} />
          )
        })
        }
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
