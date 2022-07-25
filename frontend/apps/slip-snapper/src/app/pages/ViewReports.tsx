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
import {
  getAllUserReports,
  getUserReport,
  removeReport,
} from '../../api/apiCall';

export const mockTotals = [
  { timePeriod: 'Daily', total: 'R200.02', title: 'generateDR', call: 'Daily' },
  { timePeriod: 'Weekly', total: 'R800.02', title: 'generateWR', call: 'Weekly' },
  {
    timePeriod: 'Monthly',
    total: 'R1000.50',
    title: 'generateMR',
    call: 'Monthly',
  },
];

// day week month
const ViewReports: React.FC = () => {
  const [r, setR] = useState<any[]>([]);
  useEffect(() => {
    getAllUserReports(1)
      .then(apiResponse => {
        setR(apiResponse.data.reports);
      });
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
        <IonItem>
          <IonTitle>Expenditure Totals</IonTitle>
        </IonItem>
        <IonRow>
          {mockTotals.map((totals, index) => {
            return (
              <ReportTotal
                key={index}
                reportData={[
                  totals.timePeriod,
                  totals.total,
                  totals.title,
                  totals.call,
                ]}
              />
            );
          })}
        </IonRow>
        <IonItem>
          <IonTitle>All Reports</IonTitle>
        </IonItem>
        <IonCard color="primary">
          <IonCardHeader>
            <IonCardTitle>Reports:</IonCardTitle>           
          </IonCardHeader>
          {r.map((report, index) => {
            return (
              <IonItem color="tertiary">
                {report.reportName}
                <IonButton
                  onClick={() => view(report.reportName)}
                  color="success"
                  slot="end"
                  class="viewButton"
                >
                  View
                </IonButton>
                <IonButton
                  onClick={() => deleteReport(1, report.reportName, report.reportId)}
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
    const user = JSON.parse(localStorage.getItem('user')!)
    getUserReport(1, data)
      .then(apiResponse => {
        if (apiResponse.data.report.data !== undefined) {
          const arr = new Uint8Array(apiResponse.data.report.data);
          const blob = new Blob([arr], { type: 'application/pdf' });
          const docUrl = URL.createObjectURL(blob);
          window.open(docUrl);
        }
      });
  }
 async function deleteReport(user: number, fileName: string, reportId: string) {
    const userS = JSON.parse(localStorage.getItem('user')!)
    await removeReport(user,fileName, reportId)
      .then(apiResponse => {
        console.log(apiResponse.data.message);
      });
    
    getAllUserReports(1)
      .then(apiResponse => {
        setR(apiResponse.data.reports);
      });
  }


 
};
export default ViewReports;
