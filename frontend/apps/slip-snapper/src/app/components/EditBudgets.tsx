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
    { name: 'Food', isChecked: food, id: "foodBudget" },
    { name: 'Fashion', isChecked: fashion, id: "fashionBudget" },
    { name: 'Electronics', isChecked: electronics, id: "electronicsBudget" },
    { name: 'Household', isChecked: household, id: "houseBudget" },
    { name: 'Other', isChecked: other, id: "otherBudget" }
  ];
  hideData(categoryStates)

  return (
    <IonItem color="primary">
      <IonButton fill="solid" color="secondary" onClick={() => setIsOpen(true)}>
        <IonLabel>Add/Remove</IonLabel>
      </IonButton>
      <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Add/Remove Budgets</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => {
                setIsOpen(false);
                hideData(categoryStates)
              }}>Confirm</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel>Food</IonLabel>
              <IonCheckbox slot="end" checked={food} onIonChange={e => setFood(e.detail.checked)} />
            </IonItem>

            <IonItem>
              <IonLabel>Fashion</IonLabel>
              <IonCheckbox slot="end" checked={fashion} onIonChange={e => setFashion(e.detail.checked)} />
            </IonItem>

            <IonItem>
              <IonLabel>Electronics</IonLabel>
              <IonCheckbox slot="end" checked={electronics} onIonChange={e => setElectronics(e.detail.checked)} />
            </IonItem>

            <IonItem>
              <IonLabel>Household</IonLabel>
              <IonCheckbox slot="end" checked={household} onIonChange={e => setHousehold(e.detail.checked)} />
            </IonItem>

            <IonItem>
              <IonLabel>Other</IonLabel>
              <IonCheckbox slot="end" checked={other} onIonChange={e => setOther(e.detail.checked)} />
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
    </IonItem>
  );
};


export function hideData(categoryStates:any) {
  for (let i = 0; i < categoryStates.length; i++) {
    const temp = document.getElementById(categoryStates[i].id)
    if (categoryStates[i].isChecked === true) {

      if (temp !== null)
        temp.style.display = ""
    }
    else {
      if (temp !== null)
        temp.style.display = "none"
    }

  }
}


