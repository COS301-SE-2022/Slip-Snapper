import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonRow,
} from '@ionic/react';
import React from 'react';
import { NavButtons } from '../components/NavButtons';
import ReportTotal from '../components/ReportTotal';
import '../theme/viewReports.css';

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
                <ReportTotal key={index} reportData={[totals.timePeriod, totals.total , totals.title]} />
              )
            })
            }
          </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default ViewReports;
export const mockTotals = [{ timePeriod: "Daily", total: "R200.02", title: "generateDR" }, { timePeriod: "Weekly", total: "R800.02", title: "generateWR" },
{ timePeriod: "Monthly", total: "R1000.50", title: "generateMR" }]
