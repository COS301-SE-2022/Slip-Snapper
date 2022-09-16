import { IonTitle, IonButton, IonCard, IonItem, IonAlert, IonCardHeader, IonCardTitle, IonLabel, IonSearchbar, IonCol, IonGrid, IonRow, IonToggle, IonDatetime, IonIcon, useIonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getAllSlips, deleteSlip } from '../../api/apiCall';
import '../theme/SlipItems.css';
import { calendarOutline, idCard } from 'ionicons/icons';



const SlipItems: React.FC = () => {
    let user = JSON.parse(localStorage.getItem('user')!)

    const [originalSlips, setOriginalSlips] = useState<any[]>([]);
    const [slipItems, setSlipItems] = useState<any[]>([]);
    const [present, dismiss] = useIonToast();


    useEffect(() => {
        if (user == null) {
            user = { id: 24 }
        }
        getAllSlips(user.id)
            .then(
                apiResponse => {
                    if (typeof (apiResponse.data) !== "string") {
                        orderSlips(apiResponse.data.slips)
                        setOriginalSlips(apiResponse.data.slips)
                        setSlipItems(apiResponse.data.slips)
                    }
                })
    }, []);
    const [deleteAlert, setDeleteAlert] = useState({
        state: false,
        name: '',
        id: 0,
    });

    const current = new Date();
    const [filterDates, setFilterDates] = useState({
        from: "",
        to: "",
    });
    return (
        <div>
            <IonItem>
                <IonTitle>All Receipts</IonTitle>
            </IonItem>
            <div className='wrapper'>
                <IonCard color="primary" className="search-bar">

                    <IonItem color='primary'>
                        <IonSearchbar color="tertiary" id='searchBar' onIonChange={filter} />
                    </IonItem>

                    <IonItem color='primary'>
                        <IonLabel>Total Filter</IonLabel>
                        <IonToggle color='secondary' />
                    </IonItem>

                    <IonItem color='primary'>
                        <IonLabel>Date Filter</IonLabel>
                        <IonToggle color='secondary' onIonChange={e => toggleDates(e.detail.checked)} />
                    </IonItem>

                    <div id='date-div' className='date-div' color="primary" >
                        <IonCardTitle className="date elem">From Date:
                            <IonItem className='date-item' color="tertiary">
                                <IonDatetime value={filterDates.from} displayFormat='DD/MM/YYYY' id={"fromDate"} />
                                <IonIcon icon={calendarOutline} slot="end" />
                            </IonItem>
                        </IonCardTitle>

                        <IonCardTitle className="date elem">To Date:
                            <IonItem className='date-item' color="tertiary">
                                <IonDatetime value={filterDates.to} displayFormat='DD/MM/YYYY' id={"toDate"} />
                                <IonIcon icon={calendarOutline} slot="end" />
                            </IonItem>
                        </IonCardTitle>

                        <IonItem color="primary" >
                            <IonButton color="secondary" slot="end" onClick={() => {
                                filter()
                            }}>Apply</IonButton>
                        </IonItem>

                    </div>
                </IonCard>

                <IonCard color="primary" className="receipts-table">
                    <IonCardHeader>
                        <IonCardTitle>Receipts</IonCardTitle>
                    </IonCardHeader>

                    {slipItems.map((item, index) => {
                        return (
                            <IonItem key={index} color="tertiary" id={"slipItem" + index}>
                                <IonLabel>
                                    {item.transactionDate.split('T')[0].replace(/-/gi, "/").split('/').reverse().join('/') + " - " + item.location}
                                </IonLabel>
                                {"Total: R" + item.total.toFixed(2)}
                                <IonButton routerLink="/editreceipt" id={item.id + "b"} color="secondary" slot="end" onClick={() => {
                                    localStorage.removeItem('editSlip')
                                    localStorage.setItem('editSlip', JSON.stringify(item))
                                }}>Edit</IonButton>
                                <IonButton
                                    onClick={() =>
                                        setDeleteAlert({
                                            state: true,
                                            name: item.location,
                                            id: item.id,
                                        })
                                    }
                                    fill="solid"
                                    slot="end"
                                    color="medium"
                                >
                                    Delete
                                </IonButton>
                                <IonAlert
                                    isOpen={deleteAlert.state}
                                    onDidDismiss={() =>
                                        setDeleteAlert({ state: false, name: '', id: 0 })
                                    }
                                    header="Confirm Delete"
                                    message="Are you sure you want to delete this slip?"
                                    buttons={[
                                        'Cancel',
                                        {
                                            text: 'Delete',
                                            cssClass: 'toasts',
                                            handler: async () => {
                                                await deleteSlip(deleteAlert.id)
                                                getAllSlips(user.id)
                                                    .then(
                                                        apiResponse => {
                                                            if (typeof (apiResponse.data) !== "string") {
                                                                setSlipItems(apiResponse.data.slips)
                                                            }
                                                        })
                                                setDeleteAlert({ state: false, name: '', id: 0 });
                                            },
                                        },
                                    ]}
                                />
                            </IonItem>
                        )
                    })}
                </IonCard>
            </div>
        </div>
    );

    function filter() {

        for (let i = 0; i < slipItems.length; i++) {
            const temp = document.getElementById("slipItem" + i)
            if (temp !== null)
                temp.style.display = "block";
        }

        const searchValue = document.getElementById("searchBar")?.getElementsByTagName("input")[0].value
        if (searchValue !== "") {
            searchFilter(searchValue)
        }

        if (document.getElementById("fromDate")?.getElementsByTagName("input")[0].value !== "" || document.getElementById("toDate")?.getElementsByTagName("input")[0].value !== "") {
            dateFilter()
        }

    }

    function searchFilter(searchText: string | undefined) {

        if (searchText !== undefined) {
            for (let i = 0; i < slipItems.length; i++) {
                if (!slipItems[i].location.toLowerCase().includes(searchText.toLowerCase())) {
                    const temp = document.getElementById("slipItem" + i)
                    if (temp !== null)
                        temp.style.display = "none";
                }
                else if (slipItems[i].transactionDate.split('T')[0].replace(/-/gi, "/").split('/').reverse().join('/').includes(searchText.toLowerCase())) {
                    const temp = document.getElementById("slipItem" + i)
                    if (temp !== null)
                        temp.style.display = "none";
                }
            }
        }
    }

    function toggleDates(state: any) {
        const temp = document.getElementById('date-div')
        if (state) {
            if (temp !== null)
                temp.style.display = "block";
        }

        if (!state) {
            if (temp !== null)
                temp.style.display = "none";

            setSlipItems(originalSlips)
        }
    }

    function dateFilter() {

        const fromDate = document.getElementById("fromDate")?.getElementsByTagName("input")[0].value.split('T')[0].replace(/-/gi, "/")
        const toDate = document.getElementById("toDate")?.getElementsByTagName("input")[0].value.split('T')[0].replace(/-/gi, "/")

        if (toDate !== "" && fromDate !== "" && toDate!==undefined&&fromDate!==undefined&&toDate<fromDate)
        {
            present('Please enter a valid Date interval.', 1200);
            return

        }

        if (fromDate !== "" && fromDate !== undefined) {
            for (let i = 0; i < originalSlips.length; i++) {
                if (fromDate > originalSlips[i].transactionDate) {
                    const temp = document.getElementById("slipItem" + i)
                    if (temp !== null)
                        temp.style.display = "none";
                }
            }
        }

        if (toDate !== "" && toDate !== undefined) {
            for (let i = 0; i < originalSlips.length; i++) {
                if (toDate < originalSlips[i].transactionDate) {
                    const temp = document.getElementById("slipItem" + i)
                    if (temp !== null)
                        temp.style.display = "none";
                }
            }
        }
        if (fromDate !== undefined && toDate !== undefined)
            setFilterDates({ from: fromDate, to: toDate })
    }

    function orderSlips(slips: any) {
        let temp: any;
        for (let i = 0; i < slips.length; i++) {
            for (let j = 1; j < (slips.length - i); j++) {
                if (slips[j - 1].transactionDate < slips[j].transactionDate) {
                    temp = slips[j - 1]
                    slips[j - 1] = slips[j]
                    slips[j] = temp;
                }
            }
        }
    }
};


export default SlipItems;

