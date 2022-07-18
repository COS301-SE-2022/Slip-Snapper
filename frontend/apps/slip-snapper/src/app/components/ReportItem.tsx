import {
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonItem
} from "@ionic/react";
import '../theme/reportItem.css'
type Props = {
    reportData: string[]
}
function ReportItem({ reportData }: Props) {
    return (
        <IonCol className="item-col">
            <IonCard color="primary">
                <IonCardHeader>
                    <IonCardSubtitle>{reportData[0]}</IonCardSubtitle>
                    <IonCardTitle>{reportData[1]}</IonCardTitle>
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