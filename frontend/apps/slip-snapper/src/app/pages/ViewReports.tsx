import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonRow,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
} from '@ionic/react';
import React from 'react';
import { NavButtons } from '../components/NavButtons';
import ReportTotal from '../components/ReportTotal';
import '../theme/viewReports.css';

export const mockTotals = [{ timePeriod: "Daily", total: "R200.02", title: "generateDR" }, { timePeriod: "Weekly", total: "R800.02", title: "generateWR" },
{ timePeriod: "Monthly", total: "R1000.50", title: "generateMR" }]

export const mockReports = [{ reportName: "Report #1", reportData: "" }, { reportName: "Report #2", reportData: "" },
{ reportName: "Report #3", reportData: "" }]

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

        <IonTitle>Expenditure Totals</IonTitle>
        <IonRow>
          {mockTotals.map((totals, index) => {
            return (
              <ReportTotal key={index} reportData={[totals.timePeriod, totals.total, totals.title]} />
            )
          })
          }
        </IonRow>

        <IonTitle>All Reports</IonTitle>

        <IonCard color="primary">
          <IonCardHeader>
            <IonCardTitle>Todays Report:</IonCardTitle>
          </IonCardHeader>
          {mockReports.map((report, index) => {
            return (
              <IonItem color="tertiary">
                {report.reportName}
                <IonButton color="success" slot="end" class="viewButton" >
                  View
                </IonButton>
                <IonButton fill="solid" slot="end" color="secondary">
                  Delete
                </IonButton>
              </IonItem>
            )
          })
          }
        </IonCard>
      </IonContent>
    </IonPage>


  );
};

export default ViewReports;

