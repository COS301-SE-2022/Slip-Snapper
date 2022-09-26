import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonText,
} from '@ionic/react';
import { isPlatform } from '@ionic/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FileOpener } from '@ionic-native/file-opener';
import { getUserReport } from '../../api/apiCall';
import '../theme/reportItem.css';

type Props = {
    reportData: string[];
}
function ReportItem({ reportData }: Props) {
    return (
            <IonCard color="primary" className='report-cards'>
                <IonCardHeader>
                    <IonCardTitle className='report-card-title'>Report {reportData[0]}:</IonCardTitle>
                    <IonText>{reportData[2]}</IonText>
                </IonCardHeader>
                <IonItem color="tertiary" lines='none'>
                    <IonButton onClick={() => view(reportData[1])} fill="solid" slot="end" color="secondary">
                        View
                    </IonButton>
                </IonItem>
            </IonCard>
    );
}
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
export default ReportItem;
