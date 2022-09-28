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
  IonCol,
  useIonToast,
  IonSearchbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonDatetime,
  IonModal,
  IonToggle,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { isPlatform } from '@ionic/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@ionic-native/file-opener';
import { NavButtons } from '../components/NavButtons';
import '../theme/viewReports.css';
import {
  generateSpreadSheet,
  generateReportA,
  getAllUserReports,
  getUserReport,
  removeReport,
} from '../../api/apiCall';
import { destroySession } from "../../api/Session"
import { calendarOutline, filterOutline } from 'ionicons/icons';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

// day week month
const ViewReports: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [dateToggle, setDateToggle] = useState(false);
  const [timeFrameToggle, setTimeFrameToggle] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);



  const [deleteAlert, setDeleteAlert] = useState({
    state: false,
    name: '',
    Id: 0,
  });
  const [present, dismiss] = useIonToast();

  useEffect(() => {
    const loading = document.createElement('ion-loading');
    loading.spinner = "crescent";
    loading.cssClass = "loading";
    loading.mode = "ios";
    document.body.appendChild(loading);
    loading.present();

    getAllUserReports().then((apiResponse) => {
      if (typeof apiResponse.data !== 'string') {
        destroySession(apiResponse);
        setReports(apiResponse.data.reports);
        checkEmptyReports(apiResponse.data.reports)
        orderReports(reports)
        
        loading.dismiss();
        loading.remove();
      }else{
        loading.dismiss();
        loading.remove();
      }
    }).catch(err =>{
      loading.dismiss();
      loading.remove();
    }
    );
  }, []);
  orderReports(reports)


  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");

  const resetDate = () => {
    setFilterDateFrom("")
    setFilterDateTo("")
  };

  const resetTimeFrames = () => {
    setTimeFrames(['Daily', 'Weekly', 'Monthly'])
  };

  const [timeFrames, setTimeFrames] = useState(() => ['Daily', 'Weekly', 'Monthly']);

  const currentTimeFrames = (e: any, newTimeFrames: React.SetStateAction<string[]>) => {
    setTimeFrames(newTimeFrames);
  };

  setNewNames(reports)

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
          <IonTitle>Create Reports</IonTitle>
        </IonItem>
        <IonRow>
          <IonCol className="generate-item-col" >
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>Daily Report</IonCardTitle>
              </IonCardHeader>
              <IonItem color="tertiary">
                <IonButton
                  className='excel-desktop'
                  fill="solid"
                  color="secondary"
                  onClick={() => {
                    getSpread("Daily");
                  }}
                >
                  Generate XLSX
                </IonButton>

                <IonButton
                  fill="solid"
                  title='generateDR'
                  slot="end"
                  color="secondary"
                  onClick={() => {
                    generateReport('Daily');
                  }}
                >
                  Generate PDF
                </IonButton>
              </IonItem>
            </IonCard>
          </IonCol>

          <IonCol className="generate-item-col" >
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>Weekly Report</IonCardTitle>
              </IonCardHeader>
              <IonItem color="tertiary">
                <IonButton
                  className='excel-desktop'
                  fill="solid"
                  color="secondary"
                  onClick={() => {
                    getSpread("Weekly");
                  }}
                >
                  Generate XLSX
                </IonButton>

                <IonButton
                  fill="solid"
                  title='generateWR'
                  slot="end"
                  color="secondary"
                  onClick={() => {
                    generateReport('Weekly');
                  }}
                >
                  Generate PDF
                </IonButton>
              </IonItem>
            </IonCard>
          </IonCol>

          <IonCol className="generate-item-col" >
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>Monthly Report</IonCardTitle>
              </IonCardHeader>
              <IonItem color="tertiary">
                <IonButton
                  className='excel-desktop'
                  fill="solid"
                  color="secondary"
                  onClick={() => {
                    getSpread("Monthly");
                  }}
                >
                  Generate XLSX
                </IonButton>

                <IonButton
                  fill="solid"
                  title='generateMR'
                  slot="end"
                  color="secondary"
                  onClick={() => {
                    generateReport('Monthly');
                  }}
                >
                  Generate PDF
                </IonButton>
              </IonItem>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonItem>
          <IonTitle>All Reports</IonTitle>
        </IonItem>


        <IonCard color="primary" className="receipts-table">
          <IonCardHeader className='search-bar-header'>
            <IonItem color='primary'>
              <IonSearchbar className='search-bar-receipts' color="tertiary" id='searchBar' onIonChange={filter} />
              <IonFab horizontal="end">
                <IonFabButton onClick={() => setIsOpenSearch(true)} color="secondary" size="small">
                  <IonIcon src={filterOutline} />
                </IonFabButton>
              </IonFab>
            </IonItem>
          </IonCardHeader>
          {reports?.map((report, index) => {
            return (
              <IonItem key={index} color="tertiary" id={'reportItem' + index}>
                {report.otherName}
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

          <IonItem className='emptyReports' id='emptyReports' color="tertiary">Your PDF reports will be displayed here.</IonItem>
        </IonCard>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Oops..."
          message={"Please enter a valid date interval."}
          buttons={['Ok']}
        />

        <IonModal onDidPresent={() => { toggleDates(dateToggle); toggleTimeFrames(timeFrameToggle) }} isOpen={isOpenSearch} onDidDismiss={() => { setIsOpenSearch(false); filter() }}>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Search Filter</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => {
                  returnToDefault()
                }}>set to default</IonButton>
                <IonButton onClick={() => {
                  setIsOpenSearch(false); filter();
                }}>Apply</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonItem>
              <IonLabel>Date Filter</IonLabel>
              <IonToggle color='secondary' onIonChange={e => toggleDates(!dateToggle)} checked={dateToggle} onClick={() => setDateToggle(!dateToggle)} />
            </IonItem>

            <div id='date-div' className='date-div' color="primary" >
              <IonItem>
                <IonLabel>From:
                  <IonItem className='date-item' color="tertiary">
                    <IonDatetime onIonChange={e => setFilterDateFrom(e.detail.value!)} value={filterDateFrom} displayFormat='DD/MM/YYYY' id={"fromDate"} />
                    <IonIcon icon={calendarOutline} slot="end" />
                  </IonItem>
                </IonLabel>

                <IonLabel>To:
                  <IonItem className='date-item' color="tertiary">
                    <IonDatetime onIonChange={e => setFilterDateTo(e.detail.value!)} value={filterDateTo} displayFormat='DD/MM/YYYY' id={"toDate"} />
                    <IonIcon icon={calendarOutline} slot="end" />
                  </IonItem>
                </IonLabel>
              </IonItem>
            </div>

            <IonItem>
              <IonLabel>Time Frame Filter</IonLabel>
              <IonToggle color='secondary' onIonChange={e => toggleTimeFrames(!timeFrameToggle)} checked={timeFrameToggle} onClick={() => setTimeFrameToggle(!timeFrameToggle)} />
            </IonItem>

            <div id='time-frame-div' className='time-frame-div' color="primary">
              <ToggleButtonGroup value={timeFrames} onChange={currentTimeFrames} aria-label="text formatting">
                <ToggleButton color="primary" id="daily-toggle" value="Daily">
                  Daily
                </ToggleButton>
                <ToggleButton color="primary" id="weekly-toggle" value="Weekly">
                  Weekly
                </ToggleButton>
                <ToggleButton color="primary" id="monthly-toggle" value="Monthly">
                  Monthly
                </ToggleButton>
              </ToggleButtonGroup>
            </div>

          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );

  function view(data: any) {
    let user = JSON.parse(localStorage.getItem('user')!);
    if (user == null) {
      user = { username: 'demoUser' };
    }
    const loading = document.createElement('ion-loading');
    loading.spinner = "crescent";
    loading.cssClass = "loading";
    loading.mode = "ios";
    document.body.appendChild(loading);
    loading.present();

    getUserReport(user.username, data).then((apiResponse) => {
      if (apiResponse.data.report.data !== undefined) {
        const arr = new Uint8Array(apiResponse.data.report.data);
        const blob = new Blob([arr], { type: 'application/pdf' });
        const docUrl = URL.createObjectURL(blob);

        if ((isPlatform('desktop') && !isPlatform("cordova")) || isPlatform('mobileweb')) {
          window.open(docUrl);
          loading.dismiss();
          loading.remove();
        } else {
          const reader = new FileReader();

          reader.addEventListener(
            'load',
            () => {
              if (reader.result) {
                const result = reader.result as string;
                const pdfData = result.split(',')[1];
                downloadPDF(pdfData);
                loading.dismiss();
                loading.remove();
              }
            },
            false
          );

          reader.readAsDataURL(blob);
        }
      }else{
        loading.dismiss();
        loading.remove();
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
    const loading = document.createElement('ion-loading');
    loading.spinner = "crescent";
    loading.cssClass = "loading";
    loading.mode = "ios";
    document.body.appendChild(loading);
    loading.present();

    await removeReport(userS.username, fileName, reportId).then(
      (apiResponse) => {
        present('Deleted ' + deleteAlert.name, 1200);
        loading.dismiss();
        loading.remove();
      }
    );

    getAllUserReports().then((apiResponse) => {
      setReports(apiResponse.data.reports);
      checkEmptyReports(apiResponse.data.reports)
    });
  }

  async function generateReport(period: string) {
    let userS = JSON.parse(localStorage.getItem('user')!);
    if (userS == null) {
      userS = { username: 'demoUser' };
    }
    const loading = document.createElement('ion-loading');
    loading.spinner = "crescent";
    loading.cssClass = "loading";
    loading.mode = "ios";
    document.body.appendChild(loading);
    loading.present();

    await generateReportA(userS.username, period, getReportNumber() + 1).then(
      (apiResponse) => {
        if (typeof (apiResponse.data) !== "string") {
          if (apiResponse.data.message === 'Report Generated and uploaded') {
            present('Generated ' + period + ' Report', 1200);
            loading.dismiss();
            loading.remove();
          } else {
            present('Error generating report, Try again.', 1200);
            loading.dismiss();
            loading.remove();
          }
        } else {
          present("Unable to process request.", 1200)
          loading.dismiss();
          loading.remove();
        }
      }
    ).catch(err => {
      present("Unable to process request.", 1200)
      loading.dismiss();
      loading.remove();
    });

    getAllUserReports().then((apiResponse) => {
      setReports(apiResponse.data.reports);
      checkEmptyReports(apiResponse.data.reports)
    });
  }

  function getReportNumber() {
    let maxReportNum: number
    maxReportNum = 0
    for (let i = 0; i < reports?.length; i++) {
      if (reports[i].reportNumber > maxReportNum) {
        maxReportNum = reports[i].reportNumber;
      }
    }
    return maxReportNum

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

  async function getSpread(period: any) {
    await generateSpreadSheet(period).then((apiResponseData) => {
      if (apiResponseData.data.type !== "text/html") {
        const sheet = new Blob([apiResponseData.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const sheetUrl = URL.createObjectURL(sheet);
        const sheetDownload = document.createElement("a");
        sheetDownload.setAttribute("href", sheetUrl);
        sheetDownload.setAttribute("download", "report.xlsx");
        document.body.appendChild(sheetDownload);
        sheetDownload.click();

        sheetDownload.remove();
      } else {
        present("Unable to process request.", 1200)
      }
    }).catch(() => {
      present("Unable to process request.", 1200)
    });
  }

  function filter() {

    for (let i = 0; i < reports?.length; i++) {
      const temp = document.getElementById("reportItem" + i)
      if (temp !== null)
        temp.style.display = "block";
    }

    const searchValue = document.getElementById("searchBar")?.getElementsByTagName("input")[0].value
    if (searchValue !== "") {
      searchFilter(searchValue)
    }

    if (dateToggle && checkDates())
      if (document.getElementById("fromDate")?.getElementsByTagName("input")[0].value !== "" || document.getElementById("toDate")?.getElementsByTagName("input")[0].value !== "") {
        dateFilter()
      }

    if (timeFrameToggle) {
      timeFrameFilter()
    }
  }

  function searchFilter(searchText: string | undefined) {

    if (searchText !== undefined) {
      for (let i = 0; i < reports?.length; i++) {
        if (!reports[i].otherName.toLowerCase().includes(searchText.toLowerCase())) {
          const temp = document.getElementById("reportItem" + i)
          if (temp !== null)
            temp.style.display = "none";
        }
      }
    }
  }

  function timeFrameFilter() {

    for (let j = 0; j < reports?.length; j++) {
      let foundFlag = false;
      for (let i = 0; i < timeFrames?.length; i++) {
        if (reports[j].otherName.includes(timeFrames[i])) {
          foundFlag=true
        }
      }

      if (foundFlag===false)
      {
        const temp = document.getElementById("reportItem" + j)
        if (temp !== null)
          temp.style.display = "none";
      }
    }
  }

  function toggleDates(state: any) {
    const temp = document.getElementById('date-div')
    if (state) {
      if (temp !== null)
        temp.style.display = "block";
    }

    if (!state) {
      if (temp !== null)
        temp.style.display = "none";
    }
  }

  function toggleTimeFrames(state: any) {
    const temp = document.getElementById('time-frame-div')
    if (state) {
      if (temp !== null)
        temp.style.display = "block";
    }

    if (!state) {
      if (temp !== null)
        temp.style.display = "none";
    }
  }

  function dateFilter() {
    const fromDate = filterDateFrom.split('T')[0].replace(/-/gi, "/")
    const toDate = filterDateTo.split('T')[0].replace(/-/gi, "/")

    if (fromDate !== "" && fromDate !== undefined) {
      for (let i = 0; i < reports?.length; i++) {
        if (fromDate > reports[i].reportDate) {
          const temp = document.getElementById("reportItem" + i)
          if (temp !== null)
            temp.style.display = "none";
        }
      }
    }

    if (toDate !== "" && toDate !== undefined) {
      for (let i = 0; i < reports?.length; i++) {
        if (toDate < reports[i].reportDate) {
          const temp = document.getElementById("reportItem" + i)
          if (temp !== null)
            temp.style.display = "none";
        }
      }
    }
  }

  function checkDates() {
    const fromDate = filterDateFrom.split('T')[0].replace(/-/gi, "/")
    const toDate = filterDateTo.split('T')[0].replace(/-/gi, "/")

    if (toDate !== "" && fromDate !== "" && toDate !== undefined && fromDate !== undefined && toDate < fromDate) {
      setFilterDateFrom("")
      setFilterDateTo("")
      setShowAlert(true)
      return false
    }

    return true;
  }
  function orderReports(reports: any) {
    let temp: any;

    for (let i = 0; i < reports?.length; i++) {
      for (let j = 1; j < (reports?.length - i); j++) {
        if (reports[j - 1].reportId < reports[j].reportId) {
          temp = reports[j - 1]
          reports[j - 1] = reports[j]
          reports[j] = temp;
        }
      }
    }
  }
  function returnToDefault() {
    resetDate()
    resetTimeFrames()
    setDateToggle(false)
    setTimeFrameToggle(false)
  }

  function checkEmptyReports(reports: any) {

    if (reports?.length === 0) {
      const temp = document.getElementById('emptyReports')
      if (temp !== null)
        temp.style.display = "block";
    }

    else {
      const temp = document.getElementById('emptyReports')
      if (temp !== null)
        temp.style.display = "none";
    }
  }
};

export default ViewReports;
