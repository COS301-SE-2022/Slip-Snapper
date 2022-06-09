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
import { addItemsA } from '../../api/apiCall';

const EditSlip: React.FC = () => {
  const data = JSON.parse(localStorage.getItem('value')!);
  let photo;
  async function a(){
    photo = JSON.parse(localStorage.getItem('photo')!);
  }
  a();

  let id = 0;
  const [items] = useState(data.text[2]);
 
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
              <img src={photo} alt="" width="40%"></img>
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
         
          {items.map((item: { quantity: string; item: string; price: string; type: string; }) => {
           
            id = id + 1
            return (

              <IonGrid>
                <IonRow>
                   <IonCol>
                    <IonLabel>Item #{id}</IonLabel>
                  </IonCol>

                  <IonCol>
                    <IonItem color="tertiary">
                      <IonInput id={id + "/name"} value={item.item} contentEditable="true" ></IonInput>
                    </IonItem>
                  </IonCol>

                  <IonCol>
                    <IonItem color="tertiary">
                      <IonInput id={id + "/quantity"} value={item.quantity} contentEditable="true" required></IonInput>
                    </IonItem>
                  </IonCol>

                  <IonCol>
                    <IonItem color="tertiary">
                      <IonInput id={id + "/price"} value={item.price} contentEditable="true" required></IonInput>
                    </IonItem>
                  </IonCol>

                  <IonCol>
                    <IonItem color="tertiary">
                      <IonInput id={id + "/type"} value={item.type} contentEditable="true" required></IonInput>
                    </IonItem>
                  </IonCol> 
                </IonRow>
              </IonGrid>
            )
           
          })}
          <IonItem color="primary">
            <IonButton routerLink={"/home"} fill="outline" slot="end" color="secondary">Cancel</IonButton>
            <IonButton onClick={getItems} routerLink={"/home"} fill="solid" slot="end" color="secondary">Confirm</IonButton>
           
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
    for (let i = 0; i < data.text[2].length; i++) {
      const newItemName = document.getElementById(i+1 + "/name")?.getElementsByTagName("input")[0].value
      const newQuantity = document.getElementById(i+1 + "/quantity")?.getElementsByTagName("input")[0].value
      const newPrice = document.getElementById(i+1 + "/price")?.getElementsByTagName("input")[0].value
      const newType = document.getElementById(i+1 + "/type")?.getElementsByTagName("input")[0].value

      if(newItemName!==undefined){
        items[i].item = newItemName
      }if (newQuantity !== undefined) {
        items[i].quantity = newQuantity
      }if (newPrice !== undefined) {
        items[i].price = newPrice
      }if (newType !== undefined) {
        items[i].type = newType
      }
    }

    addItemsA(1,data,items)
  }
};

export default EditSlip;
