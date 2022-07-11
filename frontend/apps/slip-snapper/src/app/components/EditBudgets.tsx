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
  IonList,
  IonToggle
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

  const [foodInterval, setFoodInterval] = useState(false);
  const [fashionInterval, setFashionInterval] = useState(false);
  const [electronicsInterval, setElectronicsInterval] = useState(false);
  const [householdInterval, setHouseholdInterval] = useState(false);
  const [otherInterval, setOtherInterval] = useState(false);

  //true for weekly
  //false for monthly
  const budgetIntervals = [
    { name: 'Food', isChecked: foodInterval, id: "foodInterval" },
    { name: 'Fashion', isChecked: fashionInterval, id: "fashionInterval" },
    { name: 'Electronics', isChecked: electronicsInterval, id: "electronicsInterval" },
    { name: 'Household', isChecked: householdInterval, id: "houseInterval" },
    { name: 'Other', isChecked: otherInterval, id: "otherInterval" }
  ];

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
                hideData(categoryStates);
              }}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel>Food</IonLabel>
              <IonItem>
                <IonLabel>{foodInterval ? "Weekly" : "Monthly"}</IonLabel>
                <IonToggle checked={foodInterval} onClick={() => setFoodInterval(!foodInterval)} color='secondary'></IonToggle>
                <IonCheckbox slot="end" checked={food} onIonChange={e => setFood(e.detail.checked)} />
              </IonItem>
            </IonItem>

            <IonItem>
              <IonLabel>Fashion</IonLabel>
              <IonItem>
                <IonLabel>{fashionInterval ? "Weekly" : "Monthly"}</IonLabel>
                <IonToggle checked={fashionInterval} onClick={() => setFashionInterval(!fashionInterval)} color='secondary'></IonToggle>
                <IonCheckbox slot="end" checked={fashion} onIonChange={e => setFashion(e.detail.checked)} />
              </IonItem>
            </IonItem>

            <IonItem>
              <IonLabel>Electronics</IonLabel>
              <IonItem>
                <IonLabel>{electronicsInterval ? "Weekly" : "Monthly"}</IonLabel>
                <IonToggle checked={electronicsInterval} onClick={() => setElectronicsInterval(!electronicsInterval)} color='secondary'></IonToggle>
                <IonCheckbox slot="end" checked={electronics} onIonChange={e => setElectronics(e.detail.checked)} />
              </IonItem>
            </IonItem>

            <IonItem>
              <IonLabel>Household</IonLabel>
              <IonItem>
                <IonLabel>{householdInterval ? "Weekly" : "Monthly"}</IonLabel>
                <IonToggle checked={householdInterval} onClick={() => setHouseholdInterval(!householdInterval)} color='secondary'></IonToggle>
                <IonCheckbox slot="end" checked={household} onIonChange={e => setHousehold(e.detail.checked)} />
              </IonItem>
            </IonItem>

            <IonItem>
              <IonLabel>Other</IonLabel>
              <IonItem>
                <IonLabel>{otherInterval ? "Weekly" : "Monthly"}</IonLabel>
                <IonToggle checked={otherInterval} onClick={() => setOtherInterval(!otherInterval)} color='secondary'></IonToggle>
                <IonCheckbox slot="end" checked={other} onIonChange={e => setOther(e.detail.checked)} />
              </IonItem>
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


