import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonItem,
} from '@ionic/react';
import { isPlatform } from '@ionic/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FileOpener } from '@ionic-native/file-opener';
import { getUserReport } from '../../api/apiCall';
import '../theme/reportItem.css';

type Props = {
  reportData: string[];
};
function ReportItem({ reportData }: Props) {
  return (
    <IonCol className="recent-item-col">
      <IonCard color="primary">
        <IonCardHeader>
          <IonCardSubtitle>Report {reportData[0]} :</IonCardSubtitle>
          <IonCardTitle>{reportData[1]}</IonCardTitle>
        </IonCardHeader>
        <IonItem color="tertiary">
          <IonButton
            onClick={() => view(reportData[1])}
            fill="solid"
            slot="end"
            color="secondary"
          >
            View
          </IonButton>
        </IonItem>
      </IonCard>
    </IonCol>
  );
}
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
export default ReportItem;
