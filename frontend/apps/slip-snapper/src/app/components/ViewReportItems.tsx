import {
    IonButton,
    IonItem
} from "@ionic/react";

type Props = {
    dateTime: string
}
function ViewReportItems({ dateTime }: Props) {
    return (
        <IonItem>
            {dateTime}
            <IonButton class="viewButton" fill="outline" slot="end">
                View
            </IonButton>
            <IonButton fill="outline" slot="end" color="secondary">
                Delete
            </IonButton>
        </IonItem>

    );

}
export default ViewReportItems;