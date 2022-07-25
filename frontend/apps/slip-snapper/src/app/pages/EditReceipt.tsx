import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonItem, IonButton, IonCard, IonFooter, IonGrid, IonCardHeader, IonCardTitle, IonCol, IonInput, IonLabel, IonRow, IonIcon, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import '../theme/addEntry.css';
import { NavButtons } from '../components/NavButtons';
import { add } from 'ionicons/icons';



const EditReciept: React.FC = () => {

    const slipContents = JSON.parse(localStorage.getItem('editSlip')!);
    const [editRecieptItems, setEditRecieptItems] = useState(slipContents.items);
    const [showAlert, setShowAlert] = useState(false);

    const handleCostsChange = (event: any) => {

        const _tempCosts = [...editRecieptItems];
        let temp = event.target.id
        temp = temp.substring(0, 1)
        _tempCosts[temp].price = event.target.value
        getData();
        setEditRecieptItems(_tempCosts);
    };
    const getTotalCosts = () => {
        return editRecieptItems.reduce((total: number, item: { price: string; }) => {
            return total + parseFloat(item.price);
        }, 0);
    };

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
                        <IonCardTitle>Store Name/Location:
                            <IonItem className='addEntry' color="tertiary">
                                <IonInput value={slipContents.location} onClick={() => setNormalColour("Store_Name")} id={"Store_Name"} contentEditable="true"></IonInput>
                            </IonItem>
                        </IonCardTitle>
                        <IonCardTitle>Date:
                            <IonItem className='addEntry' color="tertiary">
                                <IonInput value={slipContents.transactionDate} onClick={() => setNormalColour("Store_Name")} id={"date"} contentEditable="true"></IonInput>
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

                    {editRecieptItems.map((item: any, index: number) => {
                        return (
                            <IonGrid key={index} >
                                <IonRow>
                                    <IonCol className='itemlabels'>
                                        <IonLabel>Item #{index + 1}</IonLabel>
                                    </IonCol>

                                    <IonCol>
                                        <IonItem data-testid={index + "/item"} color="tertiary" className='inputs'>
                                            <IonInput onClick={() => setNormalColour(index + "/item")} id={index + "/item"} value={item.data.item}></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol>
                                        <IonItem color="tertiary" className='inputs'>
                                            <IonInput type='number' onClick={() => setNormalColour(index + "/quantity")}
                                                id={index + "/quantity"} value={item.itemQuantity}  ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol>
                                        <IonItem color="tertiary" className='inputs'>
                                            <IonInput onClick={() => setNormalColour(index + "/price")} onIonChange={handleCostsChange}
                                                id={index + "/price"} value={item.itemPrice} ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol>
                                        <IonItem color="tertiary" className='inputs'>
                                            <IonInput onClick={() => setNormalColour(index + "/type")} id={index + "/type"} value={item.data.itemType} ></IonInput>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol >
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
                    <IonItem color="tertiary" className='slipTotal'>
                        <div className='totalHeader'>Total:</div>
                        <IonItem color="tertiary" className='total'>
                            {getTotalCosts()}
                        </IonItem>
                    </IonItem>
                    <IonItem color="primary">
                        <IonButton onClick={addItem} slot="start" color="secondary"><IonIcon src={add}></IonIcon></IonButton>
                        <IonButton id='cancelButton' fill="solid" slot="end" color="secondary" routerLink={'/home'}>Cancel</IonButton>
                        <IonButton onClick={() => { getData(); validateData(); }} fill="solid" slot="end" color="secondary">Submit</IonButton>
                    </IonItem>
                </IonCard>
            </IonContent>
            <IonFooter>
                <IonToolbar color="primary">
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );

    function addItem() {
        getData()
        setEditRecieptItems([...editRecieptItems, { item: "", quantity: 1, price: "0.00", type: "" }])
    }
    function removeItem(index: number) {
        getData()
        const data = [...editRecieptItems];
        if (data.length === 1) {
            setShowAlert(true);
        }
        else {
            data.splice(index, 1)
            setEditRecieptItems(data)
        }
    }

    function getData() {
        for (let i = 0; i < editRecieptItems.length; i++) {
            const n = document.getElementById(i + "/item")?.getElementsByTagName("input")[0].value
            const q = document.getElementById(i + "/quantity")?.getElementsByTagName("input")[0].value
            const p = document.getElementById(i + "/price")?.getElementsByTagName("input")[0].value
            const t = document.getElementById(i + "/type")?.getElementsByTagName("input")[0].value

            if (n !== undefined) {
                editRecieptItems[i].item = n
            } if (q !== undefined) {
                editRecieptItems[i].quantity = Number(q)
            } if (p !== undefined) {
                editRecieptItems[i].price = p
            } if (t !== undefined) {
                editRecieptItems[i].type = t
            } 
        }
    }

    function validateData() {
        let submitFlag = true

        for (let i = 0; i < editRecieptItems.length; i++) {
            if (editRecieptItems[i].item === "" || editRecieptItems[i].item === "*") {
                const temp = [...editRecieptItems];
                temp[i].item = "*";
                setEditRecieptItems(temp)
                document.getElementById(i + "/item")?.setAttribute("color", "danger");
                submitFlag = false

            }
            if (editRecieptItems[i].type === "" || editRecieptItems[i].type === "*") {
                const temp = [...editRecieptItems];
                temp[i].type = "*";
                setEditRecieptItems(temp)
                document.getElementById(i + "/type")?.setAttribute("color", "danger");
                submitFlag = false

            }
            if (!Number.isInteger(editRecieptItems[i].quantity) || Math.sign(editRecieptItems[i].quantity) !== 1) {
                document.getElementById(i + "/quantity")?.setAttribute("color", "danger");
                const temp = [...editRecieptItems];
                temp[i].quantity = 0;
                setEditRecieptItems(temp)
                submitFlag = false

            }
            if (editRecieptItems[i].price === "") {
                const temp = [...editRecieptItems];
                temp[i].type = "0.00";
                setEditRecieptItems(temp)
                document.getElementById(i + "/type")?.setAttribute("color", "danger");
                document.getElementById(i + "/price")?.setAttribute("color", "danger");
                submitFlag = false

            }
        }
        if (submitFlag === true) {
            // const storeName = document.getElementById("Store_Name")?.getElementsByTagName("input")[0].value
            // const date = document.getElementById("date")?.getElementsByTagName("input")[0].value

            // const data = {
            //     text: [date, storeName, "", "", getTotalCosts]
            // };

            // addItemsA(1, data, items)
            const button = document.getElementById("cancelButton")
            if (button) {
                button.click();
            }

        }
    }

    function setNormalColour(i: string) {
        document.getElementById(i)?.setAttribute("color", "light");
    }
}

export default EditReciept;