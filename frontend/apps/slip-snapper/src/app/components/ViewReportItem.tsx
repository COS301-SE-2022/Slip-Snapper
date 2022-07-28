import {
    IonButton,
    IonItem,
    useIonToast
} from "@ionic/react";
import { getAllUserReports, getUserReport, removeReport } from "../../api/apiCall";

type Props = {
    report: any
}


function ViewReportItem({ report }: Props) {
    const [present, dismiss] = useIonToast();
    return (
        <IonItem color="tertiary">
            {report.reportName}
            <IonButton onClick={() => view(report.reportName)} color="secondary" slot="end" class="viewButton" >
                View
            </IonButton>
            <IonButton onClick={() => deleteReport(report.reportName,report.reportId.toString())} fill="solid" slot="end" color="medium">
                Delete
            </IonButton>
        </IonItem>
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
         window.location.reload();

    }
}
export default ViewReportItem;