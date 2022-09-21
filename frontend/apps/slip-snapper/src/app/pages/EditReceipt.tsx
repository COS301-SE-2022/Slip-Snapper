import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonItem, IonButton, IonCard, IonFooter, IonGrid, IonCardHeader, IonCardTitle, IonCol, IonInput, IonLabel, IonRow, IonIcon, IonAlert, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState } from 'react';
import { Chip } from '@mui/material';
import AddCircleOutlineIcon  from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { IonDatetime } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import '../theme/addEntry.css';
import { NavButtons } from '../components/NavButtons';
import { updateSlipA} from '../../api/apiCall';
import { useHistory } from "react-router-dom";

const EditReceipt: React.FC = () => {

    const history = useHistory();

     const slipContents = JSON.parse(localStorage.getItem('editSlip')!);
     for(let i=0; i<slipContents.items.length;i++)
     {
         slipContents.items[i].itemPrice = Number(slipContents.items[i].itemPrice).toFixed(2)
     }
    const [editReceiptItems, setEditReceiptItems] = useState(slipContents.items);
    const originalItems = slipContents.items
    const [location, setLocation] = useState(slipContents.location);
    const [date, setDate] = useState(slipContents.transactionDate);
    
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMes] = useState("");

    const handleCostsChange = (event: any) => {
        const _tempCosts = [...editReceiptItems];
        let temp = event.target.id
        temp = temp.substring(0, 1)
        _tempCosts[temp].itemPrice = event.target.value
        getData();
        setEditReceiptItems(_tempCosts);
    };
    const getTotalCosts = () => {
        return editReceiptItems.reduce((total: number, item: { itemPrice: any; }) => {
            return total + Number(item.itemPrice);

        }, 0);
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Edit Receipt</IonTitle>
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
                                    <IonInput onIonChange={e => setLocation(e.detail.value!)} value={location} id={"Store_Name"} contentEditable="true"></IonInput>
                                </IonItem>
                            </IonCardTitle>
                        </div>
                        <div color="primary">
                        <IonCardTitle className="date elem">Date:
                            <IonItem className='addEntry' color="tertiary">
                                    <IonDatetime onIonChange={e => setDate(e.detail.value!)} value={date} displayFormat='DD/MM/YYYY' id={"date"}/>
                                <IonIcon icon={calendarOutline} slot="end"/>
                            </IonItem>
                        </IonCardTitle>
                        </div>
                    </IonCardHeader>

                    <IonCardHeader className="wrapper">
                        <IonCardTitle>Edit Details</IonCardTitle>
                    </IonCardHeader>

                    {editReceiptItems.map((item: any, index: number) => {
                        return (
                            <IonGrid key={index} >
                                <div className='wrapper small-chip'>
                                    <Chip label={"Item # "+ (index+1)} sx={{ bgcolor: '#27A592', color: 'white' }}/>
                                    <Chip icon={<DeleteIcon/>}  label="Delete" onClick={() => removeItem(index)} color="error" variant="outlined" slot="end"/>
                                </div>
                                <div className='wrapper'>
                                    <IonCol className={index>0?'big-chip-child':'big-chip'}>
                                        <Chip label={"Item # "+ (index+1)} sx={{ bgcolor: '#27A592', color: 'white' }}/>
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                        <IonLabel className='labels' style={index>0?{display:"none"}:{}}>Description</IonLabel>
                                        <IonLabel className='extra-labels'>Description</IonLabel>
                                        <IonItem data-testid={index + "/item"} color="tertiary" className='inputs'>
                                            <IonInput id={index + "/item"} value={item.data[0].item}></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                        <IonLabel className='labels' style={index>0?{display:"none"}:{}}>Quantity</IonLabel>
                                        <IonLabel className='extra-labels'>Quantity</IonLabel>
                                        <IonItem color="tertiary" className='inputs'>
                                            <IonInput type='number'
                                                id={index + "/quantity"} value={item.itemQuantity}  ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                        <IonLabel className='labels' style={index>0?{display:"none"}:{}}>Price</IonLabel>
                                        <IonLabel className='extra-labels'>Price</IonLabel>
                                        <IonItem color="tertiary" className='inputs'>
                                            <IonInput type='number' onIonChange={handleCostsChange} id={index + "/price"} value={item.itemPrice} ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                    <IonLabel className='labels' style={index>0?{display:"none"}:{}}>Type</IonLabel>
                                        <IonLabel className='extra-labels'>Type</IonLabel>
                                        <IonItem color="tertiary" className='inputs'>
                                            <IonSelect id={index + "/type"} interface="popover" placeholder='Select Category' 
                                                value={item.data[0].itemType.charAt(0).toUpperCase() + item.data[0].itemType.slice(1)}>
                                                <IonSelectOption>Electronics</IonSelectOption>
                                                <IonSelectOption>Fashion</IonSelectOption>
                                                <IonSelectOption>Food</IonSelectOption>
                                                <IonSelectOption>Healthcare</IonSelectOption>
                                                <IonSelectOption>Hobby</IonSelectOption>
                                                <IonSelectOption>Household</IonSelectOption>
                                                <IonSelectOption>Vehicle</IonSelectOption>
                                                <IonSelectOption>Other</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol className={index>0?'big-chip-child':'big-chip'}>
                                        <Chip icon={<DeleteIcon/>}  label="Delete" onClick={() => removeItem(index)} color="error" variant="outlined"/>
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
                        <IonItem id={"total"} className='addEntry' color="tertiary" >
                            {getTotalCosts().toFixed(2)}
                        </IonItem>
                    </IonCardHeader>
                    <IonItem color="primary">
                        <IonButton id='cancelButton' fill="solid" slot="end" color="medium" onClick={() => { history.push("/receipts"); window.location.reload(); }}   >Cancel</IonButton>
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
        setEditReceiptItems([...editReceiptItems, { data: { 0: { id: editReceiptItems.length+1, item: "", itemType: "" }}, itemPrice: 0, itemQuantity: 1 }])
    }
    function removeItem(index: number) {
        getData()
        const data = [...editReceiptItems];

        if (data.length === 1) {
            setAlertMes("A receipt needs to have at least one item.")
            setShowAlert(true);
        }
        else {
            data.splice(index, 1)
            setEditReceiptItems(data)
        }
    }
    function getData() {
        for (let i = 0; i < editReceiptItems.length; i++) {
            const n = document.getElementById(i + "/item")?.getElementsByTagName("input")[0].value
            const q = document.getElementById(i + "/quantity")?.getElementsByTagName("input")[0].value
            const p = document.getElementById(i + "/price")?.getElementsByTagName("input")[0].value
            const t = document.getElementById(i + "/type")?.getElementsByTagName("input")[0].value

            if (n !== undefined) {
                editReceiptItems[i].data[0].item = n
            } if (q !== undefined) {
                editReceiptItems[i].itemQuantity = Number(q)
            } if (p !== undefined) {
                editReceiptItems[i].itemPrice = p
            } if (t !== undefined) {
                editReceiptItems[i].data[0].itemType = t
            }
        }
    }

    async function validateData() {
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

        for (let i = 0; i < editReceiptItems.length; i++) {
            if (editReceiptItems[i].data[0].item === "" ||
                editReceiptItems[i].data[0].itemType === "" ||
                !Number.isInteger(editReceiptItems[i].itemQuantity) || 
                Math.sign(editReceiptItems[i].itemQuantity) !== 1 ||
                editReceiptItems[i].itemPrice === "") {
                setAlertMes("Please complete all fields for item #" + (i + 1) + " to continue.")
                setShowAlert(true)
                return
            }

            if (Number(editReceiptItems[i].itemPrice) < 0 || editReceiptItems[i].itemPrice.includes('e')) {
                setAlertMes("Please enter a valid price at item #" + (i + 1) + ".")
                setShowAlert(true)
                return
            }
        }

        const updateItems = editReceiptItems;

        const removeItems: unknown[] = []
        
        for (const rem of originalItems){
            let flag = false
            for(const item of editReceiptItems){
                if(item.id === rem.id){
                    flag = true
                }
            }
            if(!flag){
                removeItems.push(rem.id)
            }
        }

        const insertItems: unknown[] = []
        for (const item of editReceiptItems){
            
            if(item.id === undefined){
                insertItems.push(item)
            }

        }

        const storeName = document.getElementById("Store_Name")?.getElementsByTagName("input")[0].value
        const date = document.getElementById("date")?.getElementsByTagName("input")[0].value.split('T')[0].replace(/-/gi,"/")
        const temp = document.getElementById("total")?.innerHTML
        let total
        if (temp !==undefined)
        {
             total = parseFloat(temp)
        }
        const data = {
            text: [date, storeName, "", "", total, slipContents.id]
        };


        await updateSlipA(data, insertItems, updateItems, removeItems)
        setEditReceiptItems([{ data:{0: { id: editReceiptItems.length+1, item: "", itemType: "" }}, itemPrice: 0, itemQuantity: 1 }])
        const button = document.getElementById("cancelButton")
        if (button) {
            button.click();
            window.location.reload()
        }
    }
}
export default EditReceipt;