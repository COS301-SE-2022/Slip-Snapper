import {
    IonButton,
    IonItem
} from "@ionic/react";

type Props = {
    dateTime: string
}
function ViewReportItem({ dateTime }: Props) {
    return (
        <IonItem color="tertiary">
            {dateTime}
            <IonButton color="secondary" slot="end" class="viewButton" >
                View
            </IonButton>
            <IonButton fill="solid" slot="end" color="medium">
                Delete
            </IonButton>
        </IonItem>
    );

}
export default ViewReportItem;