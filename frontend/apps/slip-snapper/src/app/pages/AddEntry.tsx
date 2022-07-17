import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonItem, IonButton, IonCard, IonFooter, IonGrid, IonCardHeader, IonCardTitle, IonCol, IonInput, IonLabel, IonRow, IonIcon, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import '../theme/addEntry.css';
import { NavButtons } from '../components/NavButtons';
import { add } from 'ionicons/icons'; 


const AddEntry: React.FC = () => {
    const [items, setItems] = useState([{ name: "", quantity: "", price: "", type: "" }]);
    const [showAlert, setShowAlert] = useState(false);
    const [total, setTotal] = useState(0);

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
                            <IonCol>

                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <RenderItems/>
                    <RenderTotal/>
                    <ActionButtons/>
                   
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
                        <IonGrid key={index}>
                            <IonRow key={index}>
                                <IonCol className='itemlabels'>
                                    <IonLabel key={index}>Item #{index + 1}</IonLabel>
                                </IonCol>

                                <IonCol>
                                    <IonItem color="tertiary" className='inputs'>
                                        <IonInput key={index + "/name"} id={index + "/name"} value={item.name}></IonInput>
                                    </IonItem>
                                </IonCol>

                                <IonCol>
                                    <IonItem color="tertiary" className='inputs'>
                                        <IonInput key={index + "/quantity"} id={index + "/quantity"} value={item.quantity}  ></IonInput>

                                    </IonItem>
                                </IonCol>

                                <IonCol>
                                    <IonItem  color="tertiary" className='inputs'>
                                        <IonInput onIonInput={() => { calcTotal(); } }
                                             key={index + "/price"} id={index + "/price"} value={item.price} ></IonInput>
                                    </IonItem>
                                </IonCol>

                                <IonCol>
                                    <IonItem color="tertiary" className='inputs'>
                                        <IonInput key={index + "/type"} id={index + "/type"} value={item.type} ></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonButton key={index + "/remove"} size='small' fill="outline" color="secondary" onClick={() => removeItem(index)}>Remove</IonButton>
                                    <IonAlert
                                    isOpen={showAlert}
                                    onDidDismiss={() => setShowAlert(false)}
                                    header="Oops..."
                                    message="A receipt needs to have at least one item."
                                    buttons={['Ok']}
                                    key={index + "/alert"}
                                />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    )
                })}
            </div>
        )

    };

    function RenderTotal()
    {
        return(
             <div className='slipTotal'>
                    <div className='totalHeader'>Total:</div>
                    <IonItem color="tertiary" className='total'>
                        {total}
                    </IonItem>
            </div>      
        )

    }

    function addItem() {
        getData()
        setItems([...items, { name: "", quantity: "", price: "", type: "" }])
    }
    function removeItem(index:number) {
        getData()
        const data = [...items];
        if(data.length === 1){
            setShowAlert(true);
        }
        else{
            data.splice(index, 1)
            setItems(data)
        }  
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

    function ActionButtons() {      
        return (
        <IonItem color="primary">
            <IonButton onClick={addItem} slot="start" color="secondary"><IonIcon src={add}></IonIcon></IonButton>
            <IonButton fill="solid" slot="end" color="secondary" routerLink={'/home'}>Cancel</IonButton>
            <IonButton onClick={()=>{getData(); console.log(items)}} fill="solid" slot="end" color="secondary">Submit</IonButton>
        </IonItem>
        );
      }

    function calcTotal(): React.FormEventHandler<HTMLIonInputElement> | undefined {
        let total = 0;
        for (let i = 0; i < items.length; i++) 
            {
                const n = document.getElementById(i + "/price")?.getElementsByTagName("input")[0].value
                // document.getElementById(i)?.setAttribute()
                if(n!==undefined)
                {
                    total = total + +n
                }
            }
        console.log(total)
        // RenderTotal()
        // getData()
        // setTotal(total)
      
       return undefined;
    }
}

export default AddEntry;
