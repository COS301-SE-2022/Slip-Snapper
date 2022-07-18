import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonItem, IonButton, IonCard, IonFooter, IonGrid, IonCardHeader, IonCardTitle, IonCol, IonInput, IonLabel, IonRow, IonIcon, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import '../theme/editSlip.css';
import { NavButtons } from '../components/NavButtons';
import { add } from 'ionicons/icons'; 
import { addItemsA } from '../../api/apiCall';



const EditSlip: React.FC = () => {
    const data = JSON.parse(localStorage.getItem('value')!);
    let photo;
    async function a(){
    photo = JSON.parse(localStorage.getItem('photo')!);
    }
    a();

    const [items, setItems] = useState(data.text[2]);
    const [showAlert, setShowAlert] = useState(false);
    
    const handleCostsChange = (event: any) => {

        const _tempCosts = [...items];
        let temp = event.target.id
        temp = temp.substring(0, 1)
        _tempCosts[temp].price = event.target.value
        getData();
        setItems(_tempCosts);
    };
    const getTotalCosts = () => {
        return items.reduce((total: number, item: { price: any; }) => {
            return total + Number(item.price);
        }, 0);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Edit Slip</IonTitle>
                    <IonButtons slot="end">
                        <NavButtons />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

          <IonCard color="primary">
          <IonCardHeader>
            <IonItem color="primary">
              <img src={photo} alt="" width="40%"></img>
            </IonItem>
          </IonCardHeader>
        </IonCard>

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
                  
                    <div className='slipTotal'>
                    
                    </div>
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
                        <IonGrid>
                            <IonRow>
                                <IonCol className='itemlabels'>
                                    <IonLabel>Item #{index + 1}</IonLabel>
                                </IonCol>

                                <IonCol>
                                    <IonItem color="tertiary" className='inputs'>
                                        <IonInput key={index + "/item"} id={index + "/item"} value={item.item}></IonInput>
                                    </IonItem>
                                </IonCol>

                                <IonCol>
                                    <IonItem color="tertiary" className='inputs'>
                                        <IonInput key={index + "/quantity"} id={index + "/quantity"} value={item.quantity}  ></IonInput>

                                    </IonItem>
                                </IonCol>

                                <IonCol>
                                    <IonItem color="tertiary" className='inputs'>
                                        <IonInput onIonChange={handleCostsChange}
                                         key={index + "/price"} id={index + "/price"} value={item.price} ></IonInput>

                                    </IonItem>
                                </IonCol>

                                <IonCol>
                                    <IonItem color="tertiary" className='inputs'>
                                        <IonInput key={index + "/type"} id={index + "/type"} value={item.type} ></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonButton size='small' fill="outline" color="secondary" onClick={() => removeItem(index)}>Remove</IonButton>
                                    <IonAlert
                                    isOpen={showAlert}
                                    onDidDismiss={() => setShowAlert(false)}
                                    header="Oops..."
                                    message="A receipt needs to have at least one item."
                                    buttons={['Ok']}
                                />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    )
                })}
                <div className='slipTotal'>
                    <div className='totalHeader'>Total:</div>
                    <IonItem color="tertiary" className='total'>
                        {getTotalCosts()}
                    </IonItem>
                </div>
            </div>
        )

    };

    function addItem() {
        getData()
        setItems([...items, { item: "", quantity: "", price: "", type: "" }]) // custom
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
            const n =document.getElementById(i + "/item")?.getElementsByTagName("input")[0].value
            const q = document.getElementById(i + "/quantity")?.getElementsByTagName("input")[0].value
            const p = document.getElementById(i + "/price")?.getElementsByTagName("input")[0].value
            const t = document.getElementById(i + "/type")?.getElementsByTagName("input")[0].value
            
            if (n !== undefined) {
                items[i].item = n
            } if (q !== undefined) {
                items[i].quantity = q
            } if (p !== undefined) {
                items[i].price = p
            } if (t !== undefined) {
                items[i].type = t
            }
        }

      addItemsA(1,data,items)
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
}

export default EditSlip;