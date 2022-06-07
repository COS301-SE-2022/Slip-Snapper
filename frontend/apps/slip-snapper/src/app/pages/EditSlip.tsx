import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonButton,
  IonFooter,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import React, { useState } from 'react';

const EditSlip: React.FC = () => {
  const [items, setItems] = useState([{ id: 0, itemName: 'Chocolate', price: 'R100', quantity: 3, type: "Food", date: "21/05/22", location: "Kauai" },
  { id: 1, itemName: 'Chips', price: 'R300', quantity: 1, type: "Food", date: "21/05/22", location: "Kauai" }]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Edit Slip</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonCard color="primary">
          <IonCardHeader>
            <IonCardTitle>Receipt Title</IonCardTitle>
            <IonItem color="primary">
              <img src="..\assets\mock-receipts\IMG_5593.jpg" alt="" width="40%"></img>
            </IonItem>
          </IonCardHeader>

        </IonCard>

        <IonCard color="primary">
          <IonCardHeader>
            <IonCardTitle>Edit Details</IonCardTitle>
          </IonCardHeader>

          <IonGrid>
            <IonRow>
              <IonCol></IonCol>

              <IonCol>
                <IonLabel>Item Name</IonLabel>
              </IonCol>

              <IonCol>
                <IonLabel>Quantity</IonLabel>
              </IonCol>

              <IonCol>
                <IonLabel>Price</IonLabel>
              </IonCol>

              <IonCol>
                <IonLabel>Type</IonLabel>
              </IonCol>

            </IonRow>
          </IonGrid>
          {items.map(item => {

            return (

              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonLabel>Item #{item.id + 1}</IonLabel>
                  </IonCol>

                  <IonCol>
                    <IonItem color="tertiary">
                      <IonInput id={item.id + "/name"} value={item.itemName} contentEditable="true" ></IonInput>
                    </IonItem>
                  </IonCol>

                  <IonCol>
                    <IonItem color="tertiary">
                      <IonInput id={item.id + "/quantity"} value={item.quantity} contentEditable="true" required></IonInput>
                    </IonItem>
                  </IonCol>

                  <IonCol>
                    <IonItem color="tertiary">
                      <IonInput id={item.id + "/price"} value={item.price} contentEditable="true" required></IonInput>
                    </IonItem>
                  </IonCol>

                  <IonCol>
                    <IonItem color="tertiary">
                      <IonInput id={item.id + "/type"} value={item.type} contentEditable="true" required></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            )
          })}
          <IonItem color="primary">
            <IonButton onClick={getItems} routerLink={"/home"} fill="solid" slot="start" color="secondary">Confirm</IonButton>
            <IonButton routerLink={"/home"} fill="outline" slot="end" color="secondary">Cancel</IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
      <IonFooter>
        <IonToolbar color="primary">
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );

  function getItems() {
    for (let i = 0; i < items.length; i++) {
      const newItemName = document.getElementById(i + "/name")?.getElementsByTagName("input")[0].value
      const newQuantity = document.getElementById(i + "/quantity")?.getElementsByTagName("input")[0].value
      const newPrice = document.getElementById(i + "/price")?.getElementsByTagName("input")[0].value
      const newType = document.getElementById(i + "/type")?.getElementsByTagName("input")[0].value

      if(newItemName!==undefined)
      {
        items[i].itemName = newItemName
      }if (newQuantity !== undefined) {
        items[i].quantity = parseInt(newQuantity)
      }if (newPrice !== undefined) {
        items[i].itemName = newPrice
      }if (newType !== undefined) {
        items[i].itemName = newType
      }
    }
  }
 
};

export default EditSlip;
