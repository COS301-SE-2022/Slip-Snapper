import {
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonItem
} from "@ionic/react";
import { generateReportA } from "../../api/apiCall"
import '../theme/reportTotal.css'

type Props = {
    reportData : string[]
}
function ReportTotal({ reportData }: Props) {
    return (
        <IonCol className='item-col'>
            <IonCard color="primary">
                <IonCardHeader>
                    <IonCardTitle>{reportData[0]}</IonCardTitle>
                    <IonCardSubtitle>{reportData[1]}</IonCardSubtitle>
                </IonCardHeader>
                <IonItem color="tertiary">
                    <IonButton
                        fill="solid"
                        title= {reportData[2]}
                        slot="end"
                        color="secondary"
                        onClick={() => {generateReport(reportData[3])}}
                    >
                        Generate Report
                    </IonButton>
                </IonItem>
            </IonCard>
        </IonCol>
    );
}
export default ReportTotal;

function generateReport(type: string) {
    const url = 'http://localhost:55555/api/report/generate?userId=1&period=' + type + '&userName=1';
    generateReportA(url)
        .then(apiResponse => apiResponse.data);
}
