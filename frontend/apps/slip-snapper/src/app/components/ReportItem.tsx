import {
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonItem
} from "@ionic/react";

function ReportItem()
{
    return (
        <IonCol>
            <IonCard color="primary">
                <IonCardHeader>
                    <IonCardSubtitle></IonCardSubtitle>
                    <IonCardTitle>Report #11</IonCardTitle>
                </IonCardHeader>
                <IonItem color="tertiary">
                    <IonButton fill="solid" slot="end" color="secondary">
                        View
                    </IonButton>
                </IonItem>
            </IonCard>
        </IonCol>
    );

}
export default ReportItem;