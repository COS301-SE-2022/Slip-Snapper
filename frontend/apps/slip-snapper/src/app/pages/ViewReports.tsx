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
import React, { useEffect, useState } from 'react';
import { NavButtons } from '../components/NavButtons';
import ReportTotal from '../components/ReportTotal';
import '../theme/viewReports.css';
import { getAllUserReports, getUserReport } from "../../api/apiCall"

export const mockTotals = [
  { timePeriod: 'Daily', total: 'R200.02', title: 'generateDR' },
  { timePeriod: 'Weekly', total: 'R800.02', title: 'generateWR' },
  { timePeriod: 'Monthly', total: 'R1000.50', title: 'generateMR' },
];

const ViewReports: React.FC = () => {
  const [r, setR] = useState([])
  useEffect(() => {
    getAllUserReports(1)
      .then((res: { json: () => any; }) => res.json())
      .then(
        (json: { reports: any; }) => {
          setR(json.reports)
        })
  }, []);
  
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
          {r.map((report, index) => {
            return (
              <IonItem color="tertiary">
                {report}
                <IonButton
                  onClick={() => view(report)}
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
    console.log(data)
    getUserReport(1, data)
      .then((res) => res.json())
      .then(
        (json) => {
          if (json.report.data !== undefined) {
            const arr = new Uint8Array(json.report.data)
            const blob = new Blob([arr], { type: "application/pdf" });
            const docUrl = URL.createObjectURL(blob);
            window.open(docUrl)
          }
        })
  }
  function deleteReport(path: string) {
    return;
  }
};
export default ViewReports;
