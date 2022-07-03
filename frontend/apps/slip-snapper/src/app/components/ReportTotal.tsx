import {
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem
} from "@ionic/react";
import { generateReportA } from "../../api/apiCall"

type Props = {
    reportData : string[]
}
function ReportTotal({ reportData }: Props) {
    return (
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
                    onClick={() => generateReport('day')}
                >
                    Generate Report
                </IonButton>
            </IonItem>
        </IonCard>
    );
}
export default ReportTotal;

function generateReport(type: string) {
    const url = 'http://localhost:55555/api/report/generate?userId=1&period=' + type;

    generateReportA(url)
        .then((res) => res.json());
}
