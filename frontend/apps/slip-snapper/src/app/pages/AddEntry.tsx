import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonItem, IonButton, IonCard, IonFooter, IonGrid, IonCardHeader, IonCardTitle, IonCol, IonInput, IonLabel, IonIcon, IonAlert, useIonToast, IonSelectOption, IonSelect } from '@ionic/react';
import React, { useState } from 'react';
import { Chip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { IonDatetime } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import '../theme/addEntry.css';
import { NavButtons } from '../components/NavButtons';
import { addItemsA } from '../../api/apiCall';

const AddEntry: React.FC = () => {
    const [addEntryItem, setAddEntryItems] = useState([{ item: "", quantity: 1, price: "0.00", type: "" }]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMes] = useState("");
    const [present, dismiss] = useIonToast();
    const [total, setTotal] = useState(0);

    function handleCostsChange(lastItem: boolean) {
        getData()
        let total = 0;

        if (lastItem) {
            for (let i = 0; i < addEntryItem.length - 1; i++) {
                total += Number(addEntryItem[i].price)
            }
        }
        else {
            for (let i = 0; i < addEntryItem.length; i++) {
                total += Number(addEntryItem[i].price)
            }
        }
        setTotal(total)
        return total

    };
    const getTotalCosts = () => {
        return addEntryItem.reduce((total, item) => {
            return total + Number(item.price);

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
                    <IonCardHeader className="wrapper">
                        <div color="primary">
                            <IonCardTitle className="store elem">Location:
                                <IonItem className='addEntry' color="tertiary">
                                    <IonInput id={"addEntry_Store_Name"} contentEditable="true"></IonInput>
                                </IonItem>
                            </IonCardTitle>
                        </div>
                        <div color="primary">
                            <IonCardTitle className="date elem">Date:
                                <IonItem className='addEntry' color="tertiary">
                                    <IonIcon icon={calendarOutline} slot="end" />
                                    <IonDatetime displayFormat='YYYY/MM/DD' id={"addEntryDate"} />
                                </IonItem>
                            </IonCardTitle>
                        </div>
                    </IonCardHeader>

                    <IonCardHeader className="wrapper">
                        <IonCardTitle>Edit Details</IonCardTitle>
                    </IonCardHeader>

                    {addEntryItem.map((item: any, index: number) => {
                        return (
                            <IonGrid key={index}>
                                <div className='wrapper small-chip'>
                                    <Chip label={"Item # " + (index + 1)} sx={{ bgcolor: '#27A592', color: 'white' }} />
                                    <Chip icon={<DeleteIcon />} label="Delete" onClick={() => removeItem(index)} color="error" variant="outlined" slot="end" />
                                </div>
                                <div className='wrapper'>
                                    <IonCol className={index > 0 ? 'big-chip-child' : 'big-chip'}>
                                        <Chip label={"Item # " + (index + 1)} sx={{ bgcolor: '#27A592', color: 'white' }} />
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                        <IonLabel className='labels' style={index > 0 ? { display: "none" } : {}}>Description</IonLabel>
                                        <IonLabel className='extra-labels'>Description</IonLabel>
                                        <IonItem data-testid={index + "/addEntryItem"} color="tertiary" className='inputs'>
                                            <IonInput  id={index + "/addEntryItem"} value={item.item}></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                        <IonLabel className='labels' style={index > 0 ? { display: "none" } : {}}>Quantity</IonLabel>
                                        <IonLabel className='extra-labels'>Quantity</IonLabel>
                                        <IonItem color="tertiary" className='inputs'>
                                            <IonInput type='number' id={index + "/addEntryQuantity"} value={item.quantity}  ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                        <IonLabel className='labels' style={index > 0 ? { display: "none" } : {}}>Price</IonLabel>
                                        <IonLabel className='extra-labels'>Price</IonLabel>
                                        <IonItem color="tertiary" className='inputs'>
                                            <IonInput type='number' onIonChange={() => { handleCostsChange(false) }} id={index + "/addEntryPrice"} value={item.price} ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                        <IonLabel className='labels' style={index > 0 ? { display: "none" } : {}}>Type</IonLabel>
                                        <IonLabel className='extra-labels'>Type</IonLabel>
                                        <IonItem color="tertiary" className="select-options">
                                            <IonSelect id={index + "/addEntryType"} interface="popover" placeholder='Select Category' value={item.type}>
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

                                    <IonCol className={index > 0 ? 'big-chip-child' : 'big-chip'}>
                                        <Chip icon={<DeleteIcon />} label="Delete" onClick={() => removeItem(index)} color="error" variant="outlined" />
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
                        <Chip label="New Item" icon={<AddCircleOutlineIcon />} onClick={addItem} color="secondary" />
                    </div>

                    <IonCardHeader className="wrapper">
                        <IonCardTitle>Total Amount:</IonCardTitle>
                    </IonCardHeader>

                    <IonCardHeader className="wrapper">
                        <IonItem id={"addEntryTotal"} className='addEntry' color="tertiary">
                            {getTotalCosts().toFixed(2)}
                        </IonItem>
                    </IonCardHeader>

                    <IonItem color="primary">
                        <IonButton id='cancelButton' onClick={() => { clearData(); }} fill="solid" slot="end" color="medium" routerLink={'/home'}>Cancel</IonButton>
                        <IonButton id='submitButton' onClick={() => { getData(); validateData(); }} fill="solid" slot="end" color="secondary">Submit</IonButton>
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
        setAddEntryItems([...addEntryItem, { item: "", quantity: 1, price: "0.00", type: "" }])
    }
    function removeItem(index: number) {
        getData()
        const data = [...addEntryItem];
        if (data.length === 1) {
            setAlertMes("A receipt needs to have at least one item.")
            setShowAlert(true);
        }
        else {
            data.splice(index, 1)
            setAddEntryItems(data)
            if (index === addEntryItem.length)
                handleCostsChange(true)
            else { handleCostsChange(true) }
        }
    }

    function getData() {
        for (let i = 0; i < addEntryItem.length; i++) {
            const n = document.getElementById(i + "/addEntryItem")?.getElementsByTagName("input")[0].value
            const q = document.getElementById(i + "/addEntryQuantity")?.getElementsByTagName("input")[0].value
            const p = document.getElementById(i + "/addEntryPrice")?.getElementsByTagName("input")[0].value
            const t = document.getElementById(i + "/addEntryType")?.getElementsByTagName("input")[0].value

            if (n !== undefined) {
                addEntryItem[i].item = n
            } if (q !== undefined) {
                addEntryItem[i].quantity = Number(q)
            } if (p !== undefined) {
                addEntryItem[i].price = p
            } if (t !== undefined) {
                addEntryItem[i].type = t
            }
        }
    }

    function validateData() {
        if (document.getElementById("addEntry_Store_Name")?.getElementsByTagName("input")[0].value === "") {
            setAlertMes("Please enter a Store Location to continue.")
            setShowAlert(true)
            return
        }
        if (document.getElementById("addEntryDate")?.getElementsByTagName("input")[0].value === "") {
            setAlertMes("Please enter a Date to continue.")
            setShowAlert(true)
            return
        }

        for (let i = 0; i < addEntryItem.length; i++) {
            if (addEntryItem[i].item === "" ||
                addEntryItem[i].type === "" ||
                !Number.isInteger(addEntryItem[i].quantity) ||
                Math.sign(addEntryItem[i].quantity) !== 1 ||
                addEntryItem[i].price === "") {
                setAlertMes("Please complete all fields for item #" + (i + 1) + " to continue.")
                setShowAlert(true)
                return
            }

            if (Number(addEntryItem[i].price) < 0 || addEntryItem[i].price.includes('e'))
            {
                setAlertMes("Please enter a valid price at item #" + (i + 1) + ".")
                setShowAlert(true)
                return
            }
        }

        const storeName = document.getElementById("addEntry_Store_Name")?.getElementsByTagName("input")[0].value
        const date = document.getElementById("addEntryDate")?.getElementsByTagName("input")[0].value.split('T')[0].replace(/-/gi, "/")
        const tempTotal = document.getElementById("addEntryTotal")?.innerHTML
        let total = 0.00;
        if (tempTotal !== undefined) {
            total = parseFloat(tempTotal)
        }
        const data = {
            text: [date, storeName, "", "", total]
        };
        for (let a = 0; a < addEntryItem.length;a++)
        {
            addEntryItem[a].price = Number(addEntryItem[a].price).toFixed(2)
        }
        addItemsA(data, addEntryItem)
        clearData()
        const button = document.getElementById("cancelButton")
        if (button) {
            button.click();
            window.location.reload()
        }
    }

    function clearData() {
        setAddEntryItems([{ item: "", quantity: 1, price: "0.00", type: "" }]);
        document.getElementById("addEntry_Store_Name")!.getElementsByTagName("input")[0].value = "";
        document.getElementById("addEntryDate")!.getElementsByTagName("input")[0].value = "";
    }
}

export default AddEntry;
