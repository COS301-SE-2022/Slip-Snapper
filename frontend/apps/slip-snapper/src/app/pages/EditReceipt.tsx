import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonItem, IonButton, IonCard, IonFooter, IonGrid, IonCardHeader, IonCardTitle, IonCol, IonInput, IonLabel, IonRow, IonIcon, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import { Chip } from '@mui/material';
import  AddCircleOutlineIcon  from '@mui/icons-material/AddCircleOutline';
import '../theme/addEntry.css';
import { NavButtons } from '../components/NavButtons';
import { updateSlipA } from '../../api/apiCall';

const EditReciept: React.FC = () => {
    
    const slipContents = JSON.parse(localStorage.getItem('editSlip')!);
    const [editRecieptItems, setEditRecieptItems] = useState(slipContents.items);
    const originalItems = slipContents.items

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMes] = useState("");
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Edit Reciept</IonTitle>
                    <IonButtons slot="end">
                        <NavButtons />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <IonCard color="primary">
                    <IonCardHeader className='wrapper'>
                        <div color="primary">
                            <IonCardTitle className="store elem">Location:
                                <IonItem className='addEntry' color="tertiary">
                                    <IonInput value={slipContents.location} id={"Store_Name"} contentEditable="true"></IonInput>
                                </IonItem>
                            </IonCardTitle>
                        </div>
                        <div color="primary">
                        <IonCardTitle className="date elem">Date:
                            <IonItem className='addEntry' color="tertiary">
                                <IonInput value={new Date(slipContents.transactionDate).toLocaleDateString('en-GB')} id={"date"} contentEditable="true"></IonInput>
                            </IonItem>
                        </IonCardTitle>
                        </div>
                    </IonCardHeader>

                    <IonCardHeader className="wrapper">
                        <IonCardTitle>Edit Details</IonCardTitle>
                    </IonCardHeader>

                    {editRecieptItems.map((item: any, index: number) => {
                        return (
                            <IonGrid key={index} >
                                <div className='wrapper small-chip'>
                                    <Chip label={"Item # "+ (index+1)} onDelete={() => removeItem(index)} sx={{ bgcolor: '#27A592', color: 'white' }}/>
                                </div>
                                <div className='wrapper'>
                                    <IonCol className='big-chip'>
                                        <Chip label={"Item # "+ (index+1)} onDelete={() => removeItem(index)} sx={{ bgcolor: '#27A592', color: 'white' }}/>
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                        <IonLabel className='labels'>Description</IonLabel>
                                        <IonItem data-testid={index + "/item"} color="tertiary" className='inputs'>
                                            <IonInput id={index + "/item"} value={item.data.item}></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                        <IonLabel className='labels'>Quantity</IonLabel>
                                        <IonItem color="tertiary" className='inputs'>
                                            <IonInput type='number'
                                                id={index + "/quantity"} value={item.itemQuantity}  ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                        <IonLabel className='labels'>Price</IonLabel>
                                        <IonItem color="tertiary" className='inputs'>
                                            <IonInput
                                                id={index + "/price"} value={item.itemPrice} ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                        <IonLabel className='labels'>Type</IonLabel>
                                        <IonItem color="tertiary" className='inputs'>
                                            <IonInput  id={index + "/type"} value={item.data.itemType} ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonAlert
                                        isOpen={showAlert}
                                        onDidDismiss={() => setShowAlert(false)}
                                        header="Oops..."
                                        message={alertMessage}
                                        buttons={['Ok']}
                                    />
                                </div>
                            </IonGrid>
                        )
                    })}

                    <div className='wrapper'>
                        <Chip label="New Item" icon={<AddCircleOutlineIcon />} onClick={addItem} color="secondary"/>
                    </div>

                    <IonCardHeader className="wrapper">
                        <IonCardTitle>Total Amount:</IonCardTitle>
                    </IonCardHeader>

                    <IonCardHeader className="wrapper">
                        <IonItem className='addEntry' color="tertiary">
                            <IonInput id={"total"} value={slipContents.total}></IonInput>
                        </IonItem>
                    </IonCardHeader>

                    <IonItem color="primary">
                        <IonButton id='cancelButton' fill="solid" slot="end" color="medium" routerLink={'/receipts'}>Cancel</IonButton>
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
        setEditRecieptItems([...editRecieptItems, { data: { id: editRecieptItems.length+1, item: "", itemType: "" }, itemPrice: 0, itemQuantity: 1 }])
    }
    function removeItem(index: number) {
        getData()
        const data = [...editRecieptItems];
        if (data.length === 1) {
            setAlertMes("A receipt needs to have at least one item.")
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
                editRecieptItems[i].data.item = n
            } if (q !== undefined) {
                editRecieptItems[i].itemQuantity = Number(q)
            } if (p !== undefined) {
                editRecieptItems[i].itemPrice = p
            } if (t !== undefined) {
                editRecieptItems[i].data.itemType = t
            }
        }
    }

    function validateData() {
        if (document.getElementById("Store_Name")?.getElementsByTagName("input")[0].value === "") {
            setAlertMes("Please enter a Store Name to continue.")
            setShowAlert(true)
            return
        }
        if (document.getElementById("date")?.getElementsByTagName("input")[0].value === "") {
            setAlertMes("Please enter a Date to continue.")
            setShowAlert(true)
            return
        }
        if (document.getElementById("total")?.getElementsByTagName("input")[0].value === "") {
            setAlertMes("Please enter a Total to continue.")
            setShowAlert(true)
            return
        }

        for (let i = 0; i < editRecieptItems.length; i++) {
            if (editRecieptItems[i].data.item === "" ||
                editRecieptItems[i].data.itemType === "" ||
                !Number.isInteger(editRecieptItems[i].itemQuantity) || 
                Math.sign(editRecieptItems[i].itemQuantity) !== 1 ||
                editRecieptItems[i].price === "") {
                setAlertMes("Please complete all fields for item #" + (i + 1) + " to continue.")
                setShowAlert(true)
                return

            }
        }

        const updateItems = editRecieptItems;

        const removeItems: unknown[] = []
        
        for (const rem of originalItems){
            let flag = false
            for(const item of editRecieptItems){
                if(item.id === rem.id){
                    flag = true
                }
            }
            if(!flag){
                removeItems.push(rem.id)
            }
        }

        const insertItems: unknown[] = []
        for (const item of editRecieptItems){
            
            if(item.id === undefined){
                insertItems.push(item)
            }

        }

        const storeName = document.getElementById("Store_Name")?.getElementsByTagName("input")[0].value
        const date = document.getElementById("date")?.getElementsByTagName("input")[0].value
        const temp = document.getElementById("total")?.getElementsByTagName("input")[0].value
        let total
        if (temp !==undefined)
        {
             total = parseFloat(temp)
        }
        const data = {
            text: [date, storeName, "", "", total, slipContents.id]
        };

        let user = JSON.parse(localStorage.getItem('user')!)
        if(user==null){
            user = {id: 24}
        }
        updateSlipA(user.id, data, insertItems, updateItems, removeItems)
        setEditRecieptItems([{ data: { id: editRecieptItems.length+1, item: "", itemType: "" }, itemPrice: 0, itemQuantity: 1 }])
        
        const button = document.getElementById("cancelButton")
        if (button) {
            button.click();
            window.location.reload()
        }

    }
}



export default EditReciept;