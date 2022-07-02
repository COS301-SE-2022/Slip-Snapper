import {
    IonButton,
    IonButtons,
    IonItem,
    IonLabel,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCheckbox,
    IonList
  } from "@ionic/react";
  import React, { useState } from 'react';

  export const EditBudgets = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [food, setFood] = useState(false);
    const [fashion, setFashion] = useState(false);
    const [electronics, setElectronics] = useState(false);
    const [household, setHousehold] = useState(false);
    const [other, setOther] = useState(false);

    const categoryStates = [
        { val: 'Food', isChecked: food },
        { val: 'Fashion', isChecked: fashion },
        { val: 'Electronics', isChecked: electronics },
        { val: 'Household', isChecked: household },
        { val: 'Other', isChecked: other }
      ];
  
    return (
        <IonItem color="primary">
            <IonButton fill="solid" color="secondary" onClick={() => setIsOpen(true)}>
                <IonLabel>Edit Budgets</IonLabel>
            </IonButton>
            <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
                <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Edit Budgets</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Confirm</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                    <IonLabel>Food</IonLabel>
                    <IonCheckbox slot="end" checked={food} onIonChange={e => setFood(e.detail.checked)}/>
                    </IonItem>

                    <IonItem>
                    <IonLabel>Fashion</IonLabel>
                    <IonCheckbox slot="end" checked={fashion} onIonChange={e => setFashion(e.detail.checked)}/>
                    </IonItem>

                    <IonItem>
                    <IonLabel>Electronics</IonLabel>
                    <IonCheckbox slot="end" checked={electronics} onIonChange={e => setElectronics(e.detail.checked)}/>
                    </IonItem>

                    <IonItem>
                    <IonLabel>Household</IonLabel>
                    <IonCheckbox slot="end" checked={household} onIonChange={e => setHousehold(e.detail.checked)}/>
                    </IonItem>

                    <IonItem>
                    <IonLabel>Other</IonLabel>
                    <IonCheckbox slot="end" checked={other} onIonChange={e => setOther(e.detail.checked)}/>
                    </IonItem>
                </IonList>
            </IonContent>
            </IonModal>
        </IonItem>
    );
  };

  