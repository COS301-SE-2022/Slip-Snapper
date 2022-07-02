import {
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonItem
} from "@ionic/react";

function ReportItem({ reportData }: any) {
    return (
        <IonCol>
            <IonCard color="primary">
                <IonCardHeader>
                    <IonCardSubtitle>{reportData.Date}</IonCardSubtitle>
                    <IonCardTitle>{reportData.reportNumber}</IonCardTitle>
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