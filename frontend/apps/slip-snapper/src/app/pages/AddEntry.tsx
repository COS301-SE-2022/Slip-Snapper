import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons } from '@ionic/react';
import React from 'react';
import { NavButtons } from '../components/NavButtons';

const AddEntry: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Add Entries</IonTitle>
                    <IonButtons slot="end">
                        <NavButtons />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            </IonContent>
        </IonPage>
    );
};

export default AddEntry;