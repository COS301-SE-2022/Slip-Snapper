import {
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonItem
} from "@ionic/react";
import { getUserReport } from "../../api/apiCall";
import '../theme/reportItem.css'
type Props = {
    reportData: string[]
}
function ReportItem({ reportData }: Props) {
    return (
        <IonCol className="item-col">
            <IonCard color="primary">
                <IonCardHeader>
                    <IonCardSubtitle>Report {reportData[0]} :</IonCardSubtitle>
                    <IonCardTitle>{reportData[1]}</IonCardTitle>
                </IonCardHeader>
                <IonItem color="tertiary">
                    <IonButton onClick={() => view(reportData[1])} fill="solid" slot="end" color="secondary">
                        View
                    </IonButton>
                </IonItem>
            </IonCard>
        </IonCol>
    );

}
function view(data: any) {
    console.log(data)
    getUserReport(1, data)
        .then((res) => res.json())
        .then((json) => {
            if (json.report.data !== undefined) {
                const arr = new Uint8Array(json.report.data);
                const blob = new Blob([arr], { type: 'application/pdf' });
                const docUrl = URL.createObjectURL(blob);
                window.open(docUrl);
            }
        });
}
export default ReportItem;