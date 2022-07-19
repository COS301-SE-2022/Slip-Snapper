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
import AWS from 'aws-sdk';

export const mockTotals = [
  { timePeriod: 'Daily', total: 'R200.02', title: 'generateDR' },
  { timePeriod: 'Weekly', total: 'R800.02', title: 'generateWR' },
  { timePeriod: 'Monthly', total: 'R1000.50', title: 'generateMR' },
];

export const mockReports = [
  { reportName: 'Report #1', reportData: '' },
  { reportName: 'Report #2', reportData: '' },
  { reportName: 'Report #3', reportData: '' },
];

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
              <ReportTotal
                key={index}
                reportData={[totals.timePeriod, totals.total, totals.title]}
              />
            );
          })}
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
                <IonButton
                  onClick={() => view(report.reportData)}
                  color="success"
                  slot="end"
                  class="viewButton"
                >
                  View
                </IonButton>
                <IonButton
                  onClick={() => deleteReport('ChrisDev/Bug_Busters_SRS.pdf')}
                  fill="solid"
                  slot="end"
                  color="secondary"
                >
                  Delete
                </IonButton>
              </IonItem>
            );
          })}
        </IonCard>
      </IonContent>
    </IonPage>
  );

  function view(data: any) {
    if (data.Body !== undefined) {
      const blob = new Blob([data.Body], { type: 'application/pdf' });
      const docUrl = URL.createObjectURL(blob);
      window.open(docUrl);
    }
  }
  function deleteReport(path: string) {
    return;
  }
};
export default ViewReports;
