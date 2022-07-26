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
import { getRecentReports, getThisWeeksReports, getTodayStats } from "../../api/apiCall"
import '../theme/home.css';
import ViewReportItem from '../components/ViewReportItem';

const Home: React.FC = () => {
  const [thisWeeksReports,setThisWeeksReports] = useState([])
  const [todayItems, setTodayItem] = useState(0)
  const [todayTotal, setTodayTotal] = useState(0)
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

    getThisWeeksReports(user.id)
      .then(apiResponse => {
        setThisWeeksReports(apiResponse.data.reports)
      });

    getTodayStats(user.id)
      .then(apiResponse => {
        setTodayItem(apiResponse.data.totalItems)
        setTodayTotal(apiResponse.data.totalSpent._sum.total)
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
                <IonCardTitle>Today's Expenditure:</IonCardTitle>
              </IonCardHeader>
              <IonItem color="tertiary">Items Bought: {todayItems}</IonItem>
              <IonItem color="tertiary">Total Expenditure: R{todayTotal} </IonItem>
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
              {thisWeeksReports.map((item, index) => {
                return (
                  <ViewReportItem key={index} report={item} />
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