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
  IonText,
  IonIcon,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { isPlatform } from '@ionic/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@ionic-native/file-opener';
import TakePictureButton from '../components/TakePictureButton';
import { NavButtons } from '../components/NavButtons';
import ReportItem from '../components/ReportItem';
import Graph from '../components/Graph';
import { alertCircleOutline } from 'ionicons/icons';
import { getGraphStats, getRecentReports, getThisWeeksReports, getTodayStats, getUserReport, removeReport } from "../../api/apiCall"
import '../theme/home.css';
import { destroySession } from "../../api/Session"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { async } from 'rxjs/internal/scheduler/async';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home: React.FC = () => {
  const [thisWeeksReports, setThisWeeksReports] = useState<any[]>([]);
  const [todayItems, setTodayItem] = useState({
    message:"",
    totalItems:0,
    totalSpent:0,
    weekItemCount:0,
    weekTotal:0
  });
  // const [todayTotal, setTodayTotal] = useState(0);
  const [present, dismiss] = useIonToast();
  const [reports, setR] = useState<any[]>([]);

  const [graphData, setGraphData] = useState<any[]>([])
  useEffect(() => {

    getRecentReports()
      .then(apiResponse => {
        if (typeof (apiResponse.data) !== "string") {
          destroySession(apiResponse);
          setR(apiResponse.data.reports);
        }
      }).catch();

    getThisWeeksReports()
      .then(apiResponse => {
        if (typeof (apiResponse.data) !== "string") {
          setThisWeeksReports(apiResponse.data.reports)
        }
      }).catch();

     getTodayStats()
      .then(async apiResponse => {
        if (typeof (apiResponse.data) !== "string") {
            await setTodayItem(apiResponse.data)
        }
      }).catch();
    getGraphStats()
      .then(apiResponse => {
        if (typeof (apiResponse.data) !== "string") {
          setGraphData(apiResponse.data.data)
        }
      }).catch();
  }, []);
  setNewNames(reports)
  setNewNames(thisWeeksReports)
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
          <IonTitle className='home-card-title'>Recent Reports</IonTitle>
        </IonItem>

          {reports?.length === 0 || reports?.length === undefined ?
            <div className="error-wrapper">
              <IonCardHeader className='home-error-message'>
                <IonIcon src={alertCircleOutline} size="large"/>
                <IonCardTitle>You currently have no recent reports.</IonCardTitle>
              </IonCardHeader>
            </div>
          :
            <div className='reports-wrapper'>{
              reports.map((reps, index) => {
                return (
                  <ReportItem key={index} reportData={[reps?.reportNumber, reps?.reportName, reps?.otherName]}/>
                )
              })}
            </div>
          }

        <IonItem>
          <IonTitle className='home-card-title'>Expense Summary</IonTitle>
        </IonItem>
        <div className='expense-wrapper'>
            <IonCard color="primary" className='expense-cards'>
              <IonCardHeader>
                <IonCardTitle className='home-card-title'>Today's Expenditure:</IonCardTitle>
              </IonCardHeader>
              <IonItem color="tertiary">Items Bought: {todayItems.totalItems}</IonItem>
              <IonItem color="tertiary" lines='none'>Total Expenditure: R {todayItems.totalSpent?.toFixed(2)}</IonItem>
            </IonCard>


            <IonCard color="primary" className='expense-cards'>
              <IonCardHeader>
                <IonCardTitle className='home-card-title'>This Week's Expenditure:</IonCardTitle>
              </IonCardHeader>
              <IonItem color="tertiary">Items Bought: {todayItems.weekItemCount}</IonItem>
              <IonItem color="tertiary" lines='none'>Total Expenditure: R {todayItems.weekTotal}</IonItem>
            </IonCard>

        </div>

        <IonItem>
          <IonTitle className='home-card-title'>Frequent Purchase Analysis</IonTitle>
        </IonItem>

          {graphData?.length === 0 || graphData?.length === undefined ? 
            <div className="error-wrapper">
              <IonCardHeader className='home-error-message'>
                <IonIcon src={alertCircleOutline} size="large"/>
                <IonCardTitle>There is currently no data for graphs to be generated.</IonCardTitle>
              </IonCardHeader>
            </div>
          :
            <div className="graph-wrapper">
              {graphData.map((item, index) => {
                return (
                  <IonCard color='primary' key={index} className='graph-card'>
                    <Graph graphData={item}></Graph>
                  </IonCard>
                )})
              }
            </div>
          }

        <div className='footer-home' />

      </IonContent>
      <IonFooter>
        <TakePictureButton />
      </IonFooter>
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

        if (!isPlatform('android') && !isPlatform('ios')) {
          window.open(docUrl);
        } else {
          //view for mobile, might need name
          const reader = new FileReader();

          reader.addEventListener(
            'load',
            () => {
              if (reader.result) {
                const result = reader.result as string;
                const pdfData = result.split(',')[1];
                downloadPDF(pdfData);
              }
            },
            false
          );

          reader.readAsDataURL(blob);
        }
      }
    });
  }

  function downloadPDF(pdfBase64: string) {
    try {
      Filesystem.writeFile({
        path: 'report.pdf',
        data: pdfBase64,
        directory: Directory.External,
      }).then((writeFileResult) => {
        Filesystem.getUri({
          directory: Directory.External,
          path: 'report.pdf',
        }).then(
          (getUriResult) => {
            const path = getUriResult.uri;
            FileOpener.open(path, 'application/pdf').then(() =>
              console.log('File is opened')
            );
          },
          (error) => {
            console.log(error);
          }
        );
      });
    } catch (error) {
      console.error('Unable to write file', error);
    }
  }

  async function deleteReport(fileName: string, reportId: string) {
    let userS = JSON.parse(localStorage.getItem('user')!);
    if (userS == null) {
      userS = { username: 'demoUser' };
    }
    await removeReport(userS.username, fileName, reportId).then(
      (apiResponse) => {
        present('Deleted ' + fileName, 1200);
      }
    );

    getRecentReports()
      .then(apiResponse => {
        setR(apiResponse.data.reports);

      });

    getThisWeeksReports()
      .then(apiResponse => {
        setThisWeeksReports(apiResponse.data.reports)
      });

  }

  async function setNewNames(reports: any) {
    if (reports !== undefined) {
      for (let i = 0; i < reports.length; i++) {
        if (typeof reports[i].otherName === 'string') {
          reports[i].otherName = reports[i].otherName.replace(/-/g, '/');
          reports[i].otherName = reports[i].otherName.replace('_', ' ');
          reports[i].otherName = reports[i].otherName.replace('_', ' #');
        }
      }
    }
    return reports;
  }

};

export default Home;
