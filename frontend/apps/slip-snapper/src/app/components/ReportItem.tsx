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
    let user = JSON.parse(localStorage.getItem('user')!)
    if(user==null){
        user = {id: 24}
    }
    getUserReport(user.id, data)
        .then(apiResponse => {
            if (apiResponse.data.report.data !== undefined) {
                const arr = new Uint8Array(apiResponse.data.report.data);
                const blob = new Blob([arr], { type: 'application/pdf' });
                const docUrl = URL.createObjectURL(blob);
                window.open(docUrl);
            }
        });
}
export default ReportItem;