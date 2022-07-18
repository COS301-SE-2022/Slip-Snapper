import {
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonItem
} from "@ionic/react";
import S3BucketFunctions from "../../AWS/S3Bucket"
import '../theme/reportItem.css'


type Props = {
    reportData: string[]
}
function ReportItem({ reportData }: Props) {
    const bucket = new S3BucketFunctions();

    return (

        <IonCol className="item-col">
            <IonCard color="primary">
                <IonCardHeader>
                    <IonCardSubtitle>{reportData[0]}</IonCardSubtitle>
                    <IonCardTitle>{reportData[1]}</IonCardTitle>
                </IonCardHeader>
                <IonItem color="tertiary">
                    <IonButton onClick={() => { bucket.getFile("ChrisDev/temp.pdf"); }} fill="solid" slot="end" color="secondary">
                        View
                    </IonButton>
                </IonItem>
            </IonCard>
        </IonCol>
    );

}
export default ReportItem;