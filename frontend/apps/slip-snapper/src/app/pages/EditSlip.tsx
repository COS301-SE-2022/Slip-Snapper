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
    IonInput
  } from '@ionic/react';
  import React, { useState } from 'react';

  const EditSlip: React.FC = () => {
    const [items, setItems] = useState([{ id: 0, number: 'Item 1', itemName:'Chocolate' ,price:'R100' },
   { id: 1, number: 'Item 2', itemName:'Cheese'  ,price:'R150' },{ id: 2, number: 'Item 3', itemName:'Chips',price:'R300' }]);
    
     
   
    const [nameInput,setNameInput ] = useState<string>();
   

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
                    <img src="..\assets\mock-receipts\IMG_5593.jpg" width="40%"></img>
                </IonItem>
            </IonCardHeader>

        </IonCard>

        <IonCard color="primary">
            <IonCardHeader>
            <IonCardTitle>Edit Details</IonCardTitle>
            </IonCardHeader>
             {items.map(item => {
               
          return (
            
            <IonItem key={item.id}>
              <IonLabel>{item.number+" Name"}</IonLabel>
               <IonInput
                placeholder='Hello'
                value={nameInput}
                onIonChange={(e) => setNameInput(e.detail.value!)}
                clearOnEdit
                contentEditable="true"
                required
              ></IonInput>

            </IonItem>

            
          )
        })}

            <IonItem color="primary">
            <IonButton fill="solid" slot="end" color="secondary">Confirm</IonButton>
            </IonItem>
        </IonCard>
  
        </IonContent>
  
        <IonFooter>
          <IonToolbar color="primary">
          </IonToolbar>
        </IonFooter>
      </IonPage>
    );
  
  };
  
  export default EditSlip;
  