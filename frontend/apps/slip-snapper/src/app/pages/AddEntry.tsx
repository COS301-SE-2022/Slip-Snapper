import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonItem, IonButton, IonCard, IonFooter, IonGrid, IonCardHeader, IonCardTitle, IonCol, IonInput, IonLabel, IonRow } from '@ionic/react';
import React, { useState } from 'react';
import '../theme/addEntry.css';
import { NavButtons } from '../components/NavButtons';


const AddEntry: React.FC = () => {
    const [items, setItems] = useState([{ name: "Eggs", quantity: "3", price: "20", type: "Food" },
    { name: "Mayo", quantity: "4", price: "20", type: "Food" }]);
    // renderItems(items)
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

                <IonCard color="primary">
                    <IonCardHeader>
                        <IonCardTitle>Receipt Title
                            <IonItem className='addEntry' color="tertiary">
                                <IonInput contentEditable="true" ></IonInput>
                            </IonItem>
                        </IonCardTitle>

                    </IonCardHeader>
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
                        <RenderItems input={items} />
                    <IonItem color="primary">
                        <IonButton routerLink={"/home"} fill="solid" slot="end" color="secondary">Cancel</IonButton>
                        <IonButton routerLink={"/home"} fill="solid" slot="end" color="secondary">Confirm</IonButton>
                    </IonItem>
                </IonCard>
            </IonContent>
            <IonFooter>
                <IonToolbar color="primary">
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );

     function RenderItems(props:any) {
        // console.log(items)
         const test : number[] = [1, 2, 3];
        return (
            <div>
                {test.map((item, index) => {
                    // console.log(items[index].name)
                    return (

                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonLabel>Item #{index + 1}</IonLabel>
                                </IonCol>

                                <IonCol>
                                    <IonItem color="tertiary">
                                        <IonInput contentEditable="true" ></IonInput>
                                        {/* id={id + "/name"} */}
                                    </IonItem>
                                </IonCol>

                                <IonCol>
                                    <IonItem color="tertiary">
                                    </IonItem>
                                </IonCol>

                                <IonCol>
                                    <IonItem color="tertiary">
                                    </IonItem>
                                </IonCol>

                                <IonCol>
                                    <IonItem color="tertiary">
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    )

                })}
                </div>
            
        )
           

    };



}

export default AddEntry;