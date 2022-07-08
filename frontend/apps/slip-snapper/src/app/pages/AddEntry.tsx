import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonItem, IonButton, IonCard, IonFooter, IonGrid, IonCardHeader, IonCardTitle, IonCol, IonInput, IonLabel, IonRow, IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import '../theme/addEntry.css';
import { NavButtons } from '../components/NavButtons';
import { add } from 'ionicons/icons'; 


const AddEntry: React.FC = () => {
    const [items, setItems] = useState([{ name: "", quantity: "", price: "", type: "" },
    { name: "", quantity: "", price: "", type: "" }]);

    const[counter,setCounter]=useState([1])

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
                    <RenderItems/>
                  
                    <div className='slipTotal'>
                    
                    </div>
                    <IonItem color="primary">
                        <IonButton onClick={addItem} slot="start" color="secondary"><IonIcon src={add}></IonIcon></IonButton>
                        <IonButton routerLink={"/home"} fill="solid" slot="end" color="secondary">Cancel</IonButton>
                        <IonButton onClick={()=>{console.log(items); getData()}} fill="solid" slot="end" color="secondary">Confirm</IonButton>
                    </IonItem>
                   
                </IonCard>
            </IonContent>
            <IonFooter>
                <IonToolbar color="primary">
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );

    function RenderItems() {
        return (
            <div>
                {items.map((item: any, index: number) => {
                    return (
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonLabel>Item #{index + 1}</IonLabel>
                                </IonCol>

                                <IonCol>
                                    <IonItem color="tertiary">
                                        <IonInput key={index + "/name"} id={index + "/name"} value={item.name} ></IonInput>
                                    </IonItem>
                                </IonCol>

                                <IonCol>
                                    <IonItem color="tertiary">
                                        <IonInput key={index + "/quantity"} id={index + "/quantity"} value={item.quantity}  ></IonInput>

                                    </IonItem>
                                </IonCol>

                                <IonCol>
                                    <IonItem color="tertiary">
                                        <IonInput key={index + "/price"} id={index + "/price"} value={item.price} ></IonInput>

                                    </IonItem>
                                </IonCol>

                                <IonCol>
                                    <IonItem color="tertiary">
                                        <IonInput key={index + "/type"} id={index + "/type"} value={item.type} ></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonButton size='small' fill="outline" color="secondary" onClick={() => removeItem(index)}>Remove</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    )
                })}
            </div>
        )

    };

    function addItem() {
        getData()
        setItems([...items, { name: "", quantity: "", price: "", type: "" }])
    }
    function removeItem(index:number) {
        getData()
        const data = [...items];
        data.splice(index, 1)
        setItems(data)
        console.log(items)
    }
    
    function getData() {
        for (let i = 0; i < items.length; i++) {
            const n =document.getElementById(i + "/name")?.getElementsByTagName("input")[0].value
            const q = document.getElementById(i + "/quantity")?.getElementsByTagName("input")[0].value
            const p = document.getElementById(i + "/price")?.getElementsByTagName("input")[0].value
            const t = document.getElementById(i + "/type")?.getElementsByTagName("input")[0].value
            
            if (n !== undefined) {
                items[i].name = n
            } if (q !== undefined) {
                items[i].quantity = q
            } if (p !== undefined) {
                items[i].price = p
            } if (t !== undefined) {
                items[i].type = t
            }
        }
    }
}

export default AddEntry;