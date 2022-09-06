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
  useIonToast,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import TakePictureButton from '../components/TakePictureButton';
import { NavButtons } from '../components/NavButtons';
import ReportItem from '../components/ReportItem';
import { getAllUserReports, getRecentReports, getThisWeeksReports, getTodayStats, getUserReport, removeReport } from "../../api/apiCall"
import '../theme/home.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Config for Graph_1
 */
export const graphSettings_1 = {
  responsive: true,
  barThickness:43,
  borderWidth:2,
  hoverBackgroundColor: '#5d6c83',
  
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Apple Prices Across various Store Locations',
    },
  },
};

export const graphData_1 = {
  labels: ['Checkers', 'Shoprite', 'Pick n Pay', 'Woolworths', 'Clicks'],
  datasets: [
    {
      label: 'Apples',
      data: [20, 10,15,26,14],
      backgroundColor: '#27A592',
      width:8,
    },
    {
      label: 'Occurrences',
      data: [5, 4, 2, 5, 10],
      backgroundColor: '#292592',
      width: 8,
      hidden: true,
    }
  ],
};

/**
 * Config for Graph_2
 */

const Home: React.FC = () => {
  const [thisWeeksReports, setThisWeeksReports] = useState<any[]>([])
  const [todayItems, setTodayItem] = useState(0)
  const [todayTotal, setTodayTotal] = useState(0)
  const [present, dismiss] = useIonToast();
  const [reports, setR] = useState([{reportId:"0", reportName:"No reports Available"}]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user')!)
    if(user==null){
        user = {id: 24}
    }
    getRecentReports(user.id)
      .then(apiResponse => {
        if(typeof(apiResponse.data) !== "string"){
          setR(apiResponse.data.reports);
        }
      });

    getThisWeeksReports(user.id)
      .then(apiResponse => {
        if(typeof(apiResponse.data) !== "string"){
          setThisWeeksReports(apiResponse.data.reports)
        }
      });

    getTodayStats(user.id)
      .then(apiResponse => {
        if(typeof(apiResponse.data) !== "string"){
          setTodayItem(apiResponse.data.totalItems)
          setTodayTotal(Number(apiResponse.data.totalSpent))
        }
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
          {reports.map((reps, index) => {
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
              <IonItem color="tertiary">Total Expenditure: R {todayTotal.toFixed(2)}</IonItem>
              <IonItem color="tertiary">
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
                  <IonItem key={index} color="tertiary">
                    {item.reportName}
                    <IonButton onClick={() => {view(item.reportName)}} color="secondary" slot="end" class="viewButton" >
                      View
                    </IonButton>
                    <IonButton onClick={() => deleteReport(item.reportName, item.reportId.toString())} fill="solid" slot="end" color="medium">
                      Delete
                    </IonButton>
                  </IonItem>
                )
              })
              }
            </IonCard>
          </IonCol>

          <IonCol>
            <Bar options={graphSettings_1} data={graphData_1} />
          </IonCol>
          <IonCol>
            <Bar options={graphSettings_1} data={graphData_1} />
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

  function view(data: any) {
    let user = JSON.parse(localStorage.getItem('user')!)
    if (user == null) {
      user = { username: 'demoUser' }
    }
    getUserReport(user.username, data)
      .then(apiResponse => {
        if (apiResponse.data.report.data !== undefined) {
          const arr = new Uint8Array(apiResponse.data.report.data);
          const blob = new Blob([arr], { type: 'application/pdf' });
          const docUrl = URL.createObjectURL(blob);
          window.open(docUrl);
        }
      });
  }

  async function deleteReport(fileName: string, reportId: string) {
    let userS = JSON.parse(localStorage.getItem('user')!)
    if (userS == null) {
      userS = { username: "demoUser" }
    }
    await removeReport(userS.username, fileName, reportId)
      .then(apiResponse => {
        present('Deleted ' + fileName, 1200);
      });

    let user = JSON.parse(localStorage.getItem('user')!)
    if (user == null) {
      user = { id: 24 }
    }

    getRecentReports(user.id)
      .then(apiResponse => {
        setR(apiResponse.data.reports);
      });

    getThisWeeksReports(user.id)
      .then(apiResponse => {
        setThisWeeksReports(apiResponse.data.reports)
      });



  }
};

export default Home;