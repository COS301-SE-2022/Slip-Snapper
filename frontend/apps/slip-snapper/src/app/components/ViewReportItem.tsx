import {
    IonButton,
    IonItem
} from "@ionic/react";
import { getUserReport } from "../../api/apiCall";

type Props = {
    report: any
}
function ViewReportItem({ report }: Props) {
    return (
        <IonItem color="tertiary">
            {report.reportName}
            <IonButton onClick={() => view(report.reportName)} color="secondary" slot="end" class="viewButton" >
                View
            </IonButton>
            <IonButton fill="solid" slot="end" color="medium">
                Delete
            </IonButton>
        </IonItem>
    );

    function view(data: any) {
        let user = JSON.parse(localStorage.getItem('user')!)
        if (user == null) {
            user = { id: 24 }
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
}
export default ViewReportItem;