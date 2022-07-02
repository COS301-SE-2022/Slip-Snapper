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

  const checkboxList = [
    { val: 'Food', isChecked: false },
    { val: 'Fashion', isChecked: false },
    { val: 'Electronics', isChecked: false },
    { val: 'Household', isChecked: false },
    { val: 'Other', isChecked: false }
  ];

  export const EditBudgets = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
        <IonItem color="primary">
            <IonButton fill="solid" color="secondary" onClick={() => setIsOpen(true)}>
                <IonLabel>Edit Budgets</IonLabel>
            </IonButton>
            <IonModal isOpen={isOpen}>
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
                {checkboxList.map(({ val, isChecked }, i) => (
                    <IonItem key={i}>
                    <IonLabel>{val}</IonLabel>
                    <IonCheckbox slot="end" value={val} checked={isChecked}/>
                    </IonItem>
                ))}
                </IonList>
            </IonContent>
            </IonModal>
        </IonItem>
    );
  };

  