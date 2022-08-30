import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonItem, IonButton, IonCard, IonFooter, IonGrid, IonCardHeader, IonCardTitle, IonCol, IonInput, IonLabel, IonRow, IonIcon, IonAlert, useIonToast, IonSelectOption, IonSelect } from '@ionic/react';
import React, { useState } from 'react';
import { Chip } from '@mui/material';
import AddCircleOutlineIcon  from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { IonDatetime } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import '../theme/addEntry.css';
import { NavButtons } from '../components/NavButtons';
import { addItemsA } from '../../api/apiCall';

const AddEntry: React.FC = () => {
    const [items, setItems] = useState([{ item: "", quantity: 1, price: "0.00", type: "" }]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMes] = useState("");
    const [present, dismiss] = useIonToast();

    const handleCostsChange = (event: any) => {
        const _tempCosts = [...items];
        let temp = event.target.id
        temp = temp.substring(0, 1)
        _tempCosts[temp].price = event.target.value
        getData();
        setItems(_tempCosts);
    };
    const getTotalCosts = () => {
        return items.reduce((total, item) => {
            // console.log(parseFloat(items[0].price))
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
                                    <IonInput onClick={() => setNormalColour("Store_Name")} id={"Store_Name"} contentEditable="true"></IonInput>
                                </IonItem>
                            </IonCardTitle>
                        </div>
                        <div color="primary">
                            <IonCardTitle className="date elem">Date:
                                <IonItem className='addEntry' color="tertiary">
                                    <IonIcon icon={calendarOutline} slot="end"/>
                                    <IonDatetime displayFormat='YYYY/MM/DD' id={"date"}/>
                                </IonItem>
                            </IonCardTitle>
                        </div>
                    </IonCardHeader>

                    <IonCardHeader className="wrapper">
                        <IonCardTitle>Edit Details</IonCardTitle>
                    </IonCardHeader>

                    {items.map((item: any, index: number) => {
                        return (
                            <IonGrid key={index}>
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
                                            <IonInput onClick={() => setNormalColour(index + "/item")} id={index + "/item"} value={item.item}></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                        <IonLabel className='labels' style={index>0?{display:"none"}:{}}>Quantity</IonLabel>
                                        <IonLabel className='extra-labels'>Quantity</IonLabel>
                                        <IonItem color="tertiary" className='inputs'>
                                            <IonInput type='number' onClick={() => setNormalColour(index + "/quantity")}
                                                id={index + "/quantity"} value={item.quantity}  ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                        <IonLabel className='labels' style={index>0?{display:"none"}:{}}>Price</IonLabel>
                                        <IonLabel className='extra-labels'>Price</IonLabel>
                                        <IonItem color="tertiary" className='inputs'>
                                            <IonInput type='number' onIonChange={handleCostsChange} onClick={() => setNormalColour(index + "/price")}
                                                id={index + "/price"} value={item.price} ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                        <IonLabel className='labels' style={index>0?{display:"none"}:{}}>Type</IonLabel>
                                        <IonLabel className='extra-labels'>Type</IonLabel>
                                        <IonItem color="tertiary" className="select-options">
                                            <IonSelect id={index + "/type"} interface="popover" placeholder='Select Category' value={item.type}>
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
                        <IonItem id={"total"} className='addEntry' color="tertiary">
                            {getTotalCosts()}
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
        setItems([...items, { item: "", quantity: 1, price: "0.00", type: "" }])
    }
    function removeItem(index: number) {
        getData()
        const data = [...items];
        if (data.length === 1) {
            setAlertMes("A receipt needs to have at least one item.")
            setShowAlert(true);
        }
        else {
            data.splice(index, 1)
            setItems(data)
        }
    }

    function getData() {
        for (let i = 0; i < items.length; i++) {
            const n = document.getElementById(i + "/item")?.getElementsByTagName("input")[0].value
            const q = document.getElementById(i + "/quantity")?.getElementsByTagName("input")[0].value
            const p = document.getElementById(i + "/price")?.getElementsByTagName("input")[0].value
            const t = document.getElementById(i + "/type")?.getElementsByTagName("input")[0].value

            if (n !== undefined) {
                items[i].item = n
            } if (q !== undefined) {
                items[i].quantity = Number(q)
            } if (p !== undefined) {
                items[i].price = p
            } if (t !== undefined) {
                items[i].type = t
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
        if (document.getElementById("total")?.innerHTML === "NaN") {

            for (let i = 0; i < items.length; i++) {
                if (isNaN(+items[i].price)) {
                    setAlertMes("Please input a number at item #" + (i + 1) + " to continue.")
                    setShowAlert(true)
                    return
                }
            }
            setAlertMes("Please check that all your Item prices are Numbers")
            setShowAlert(true)
            return
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].item === "" ||
                items[i].type === "" ||
                !Number.isInteger(items[i].quantity) ||
                Math.sign(items[i].quantity) !== 1 ||
                items[i].price === "") {
                setAlertMes("Please complete all fields for item #" + (i + 1) + " to continue.")
                setShowAlert(true)
                return
            }
        }

        const storeName = document.getElementById("Store_Name")?.getElementsByTagName("input")[0].value
        const date = document.getElementById("date")?.getElementsByTagName("input")[0].value.split('T')[0].replace(/-/gi,"/")
        const tempTotal = document.getElementById("total")?.innerHTML
        let total = 0.00;
        if (tempTotal !== undefined) {
            total = parseFloat(tempTotal)
        }
        const data = {
            text: [date, storeName, "", "", total]
        };

        let user = JSON.parse(localStorage.getItem('user')!)
        if (user == null) {
            user = { id: 24 }
        }
        addItemsA(user.id, data, items)
        clearData()
        const button = document.getElementById("cancelButton")
        if (button) {
            button.click();
            window.location.reload()
            present('Deleted ' , 1200);
        }

    }

    function clearData() {
        setItems([{ item: "", quantity: 1, price: "0.00", type: "" }]);
        document.getElementById("Store_Name")!.getElementsByTagName("input")[0].value = "";
        document.getElementById("date")!.getElementsByTagName("input")[0].value = "";
    }

    function setNormalColour(i: string) {
        document.getElementById(i)?.setAttribute("color", "light");
    }
}

export default AddEntry;
