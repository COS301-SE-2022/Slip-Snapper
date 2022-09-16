import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonItem, IonButton, IonCard, IonFooter, IonGrid, IonCardHeader, IonCardTitle, IonCol, IonInput, IonLabel, IonRow, IonIcon, IonAlert, IonModal, IonFab, IonFabButton, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState } from 'react';
import { Chip } from '@mui/material';
import AddCircleOutlineIcon  from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { imageOutline } from 'ionicons/icons';
import { IonDatetime } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import '../theme/addEntry.css';
import { NavButtons } from '../components/NavButtons';
import { addItemsA } from '../../api/apiCall';



const EditSlip: React.FC = () => {
    const data = JSON.parse(localStorage.getItem('scan-content')!);
    const photo = JSON.parse(localStorage.getItem('photo')!);
    const [items, setItems] = useState(data.text[2]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMes] = useState("");
    const [showImage, setShowImage] = useState(false);
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
                    <IonCardHeader className="wrapper">
                        <div>
                            <IonFab id="desktop-fab" title="Receipt" horizontal='start' vertical='top'>
                                <IonFabButton color='secondary' onClick={() => { setShowImage(true) }}><IonIcon icon={imageOutline}></IonIcon></IonFabButton>
                            </IonFab>
                        </div>
                        <div color="primary">
                            <IonCardTitle className="store elem">Location:
                                <IonItem className='addEntry' color="tertiary">
                                    <IonInput value={data.text[1]} id={"Store_Name"} contentEditable="true"></IonInput>
                                </IonItem>
                            </IonCardTitle>
                        </div>
                        <div color="primary">
                            <IonCardTitle className="date elem">Date:
                                <IonItem className='addEntry' color="tertiary">
                                    <IonDatetime value={data.text[0]} displayFormat='DD/MM/YYYY' id={"date"}/>
                                    <IonIcon icon={calendarOutline} slot="end"/>
                                </IonItem>
                            </IonCardTitle>
                        </div>    
                    </IonCardHeader>

                    <IonCardHeader className="wrapper">
                        <IonCardTitle>Edit Details</IonCardTitle>
                    </IonCardHeader>

                    {items.map((item: any, index: number) => {
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
                                            <IonInput onClick={() => setNormalColour(index + "/price")} type='number'
                                                id={index + "/price"} value={item.price} ></IonInput>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol className='item-col elem'>
                                        <IonLabel className='labels' style={index>0?{display:"none"}:{}}>Type</IonLabel>
                                        <IonLabel className='extra-labels'>Type</IonLabel>
                                        <IonItem color="tertiary" className='inputs'>
                                            <IonSelect id={index + "/type"} interface="popover" placeholder='Select Category' 
                                            value={item.type.charAt(0).toUpperCase() + item.type.slice(1)}>
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
                                    <IonModal isOpen={showImage} onDidDismiss={() => setShowImage(false)}>
                                        <IonHeader>
                                            <IonToolbar color="primary">
                                            <IonTitle>Current Receipt</IonTitle>
                                            <IonButtons slot="end">
                                                <IonButton onClick={() => { setShowImage(false) }}>Close</IonButton>
                                            </IonButtons>
                                            </IonToolbar>
                                        </IonHeader>
                                        <IonContent>
                                            <img src={photo} alt="receipt" />
                                        </IonContent>
                                    </IonModal>
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
                            <IonInput id={"total"} value={data.text[4]}></IonInput>
                        </IonItem>
                    </IonCardHeader>

                    <IonItem color="primary">
                        <IonButton id='cancelButton' fill="solid" slot="end" color="medium" routerLink={'/home'}>Cancel</IonButton>
                        <IonButton id='submitButton' onClick={() => { getData(); validateData(); }} fill="solid" slot="end" color="secondary">Submit</IonButton>
                    </IonItem>
                </IonCard>
            </IonContent>
            <IonButton className="successRedirect" id="successRedirect" routerLink={"/home"}></IonButton>
            <IonFooter>
                    <IonFab id="mobi-fab" horizontal='start' vertical='top' edge>
                            <IonFabButton color='secondary' onClick={() => { setShowImage(true) }}><IonIcon icon={imageOutline}></IonIcon></IonFabButton>
                    </IonFab>
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
        if (document.getElementById("total")?.getElementsByTagName("input")[0].value === "") {
            setAlertMes("Please enter a Total to continue.")
            setShowAlert(true)
            return
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].item === "" ||
                items[i].type === "" ||
                !Number.isInteger(items[i].quantity) || 
                Math.sign(items[i].quantity) !== 1 ||
                items[i].price === "")
                {
                setAlertMes("Please complete all fields for item #" + (i + 1) + " to continue.")
                setShowAlert(true)
                return
            }
        }
        const storeName = document.getElementById("Store_Name")?.getElementsByTagName("input")[0].value
        const date = document.getElementById("date")?.getElementsByTagName("input")[0].value.split('T')[0].replace(/-/gi,"/")
        const tempTotal = document.getElementById("total")?.getElementsByTagName("input")[0].value
        let total = 0.00;
        if (tempTotal !== undefined) {
            total = parseFloat(tempTotal)
        }
        const data = {
            text: [date, storeName, "", "", total]
        };

        addItemsA(data, items)
        const button = document.getElementById("successRedirect")
        if (button) {
            button.click();
            window.location.reload()
        }

    }

    function setNormalColour(i: string) {
        document.getElementById(i)?.setAttribute("color", "light");
    }

}

export default EditSlip;