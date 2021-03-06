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
  IonCardSubtitle,
  IonCol,
  useIonToast,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { NavButtons } from '../components/NavButtons';
import '../theme/viewReports.css';
import {
  generateReportA,
  getAllUserReports,
  getUserReport,
  removeReport,
} from '../../api/apiCall';

export const mockTotals = [
  { timePeriod: 'Daily', total: 'R200.02', title: 'generateDR', call: 'Daily' },
  {
    timePeriod: 'Weekly',
    total: 'R800.02',
    title: 'generateWR',
    call: 'Weekly',
  },
  {
    timePeriod: 'Monthly',
    total: 'R1000.50',
    title: 'generateMR',
    call: 'Monthly',
  },
];

// day week month
const ViewReports: React.FC = () => {
  const [r, setR] = useState<any[]>([{}]);
  const [deleteAlert, setDeleteAlert] = useState({
    state: false,
    name: '',
    Id: 0,
  });
  const [present, dismiss] = useIonToast();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user')!);
    if (user == null) {
      user = { id: 24 };
    }
    getAllUserReports(user.id).then((apiResponse) => {
      console.log(typeof apiResponse.data);
      if (typeof apiResponse.data !== 'string') {
        setR(apiResponse.data.reports);
      }
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
              <IonCol className="item-col" key={index}>
                <IonCard color="primary">
                  <IonCardHeader>
                    <IonCardTitle>{totals.timePeriod}</IonCardTitle>
                  </IonCardHeader>
                  <IonItem color="tertiary">
                    <IonButton
                      fill="solid"
                      title={totals.title}
                      slot="end"
                      color="secondary"
                      onClick={() => {
                        generateReport(totals.call);
                      }}
                    >
                      Generate Report
                    </IonButton>
                  </IonItem>
                </IonCard>
              </IonCol>
            );
          })}
        </IonRow>
        <IonItem>
          <IonTitle>All Reports</IonTitle>
        </IonItem>
        <IonCard color="primary" className="all-reports">
          <IonCardHeader>
            <IonCardTitle>Reports:</IonCardTitle>
          </IonCardHeader>
          {r.map((report, index) => {
            return (
              <IonItem key={index} color="tertiary">
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
                  onClick={() =>
                    setDeleteAlert({
                      state: true,
                      name: report.reportName,
                      Id: report.reportId,
                    })
                  }
                  fill="solid"
                  slot="end"
                  color="medium"
                >
                  Delete
                </IonButton>
                <IonAlert
                  isOpen={deleteAlert.state}
                  onDidDismiss={() =>
                    setDeleteAlert({ state: false, name: '', Id: 0 })
                  }
                  header="Confirm Delete"
                  message="Are you sure you want to delete this report?"
                  buttons={[
                    'Cancel',
                    {
                      text: 'Delete',
                      cssClass: 'toasts',
                      handler: () => {
                        deleteReport(
                          deleteAlert.name,
                          deleteAlert.Id.toString()
                        );
                        setDeleteAlert({ state: false, name: '', Id: 0 });
                      },
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
    let user = JSON.parse(localStorage.getItem('user')!);
    if (user == null) {
      user = { username: 'demoUser' };
    }
    getUserReport(user.username, data).then((apiResponse) => {
      if (apiResponse.data.report.data !== undefined) {
        const arr = new Uint8Array(apiResponse.data.report.data);
        const blob = new Blob([arr], { type: 'application/pdf' });
        const docUrl = URL.createObjectURL(blob);
        window.open(docUrl);
      }
    });
  }

  async function deleteReport(fileName: string, reportId: string) {
    let userS = JSON.parse(localStorage.getItem('user')!);
    if (userS == null) {
      userS = { username: 'demoUser' };
    }
    await removeReport(userS.username, fileName, reportId).then(
      (apiResponse) => {
        present('Deleted ' + deleteAlert.name, 1200);
      }
    );

    getAllUserReports(userS.id).then((apiResponse) => {
      setR(apiResponse.data.reports);
    });
  }

  async function generateReport(period: string) {
    let userS = JSON.parse(localStorage.getItem('user')!);
    if (userS == null) {
      userS = { id: 24, username: 'demoUser' };
    }

    await generateReportA(userS.username, userS.id, period).then(
      (apiResponse) => {
        if (apiResponse.data.message === 'Report Generated and uploaded') {
          present('Generated ' + period + ' Report', 1200);
        } else {
          present('Error generating report, Try again.', 1200);
        }
      }
    );

    getAllUserReports(userS.id).then((apiResponse) => {
      setR(apiResponse.data.reports);
    });
  }
};

export default ViewReports;
