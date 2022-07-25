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
  IonAlert,
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
  const [deleteAlert, setDeleteAlert] = useState(false);
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
                  color="secondary"
                  slot="end"
                  class="viewButton"
                >
                  View
                </IonButton>
                <IonButton
                  onClick={() => setDeleteAlert(true)}
                  fill="solid"
                  slot="end"
                  color="medium"
                >
                  Delete
                </IonButton>
                <IonAlert
                  isOpen={deleteAlert}
                  onDidDismiss={() => setDeleteAlert(false)}
                  header="Confirm Delete"
                  message="Are you sure you want to delete this report?"
                  buttons={[
                    'Cancel',
                    {
                      text: 'Delete',
                      cssClass: 'toasts',
                      handler: () => {
                        deleteReport(1, report.reportName, report.reportId);
                        setDeleteAlert(false);
                      }
                    },
                  ]}
                />
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
