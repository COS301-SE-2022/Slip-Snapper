import { IonTitle, IonButton, IonCard, IonItem, IonAlert, IonCardHeader, IonLabel, IonSearchbar, IonToggle, IonDatetime, IonIcon, useIonToast, IonButtons, IonContent, IonHeader, IonModal, IonRadio, IonRadioGroup, IonToolbar, IonFab, IonFabButton, IonCardSubtitle } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getAllSlips, deleteSlip } from '../../api/apiCall';
import '../theme/slip-items.css';
import { calendarOutline, filterOutline } from 'ionicons/icons';
import { Slider } from '@mui/material';
import { destroySession } from "../../api/Session"


const SlipItems: React.FC = () => {
    const [originalSlips, setOriginalSlips] = useState<any[]>([]);
    const [slipItems, setSlipItems] = useState<any[]>([]);

    const [totalToggle, setTotalToggle] = useState(false);
    const [dateToggle, setDateToggle] = useState(false);

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        getAllSlips()
            .then(
                apiResponse => {
                    if (typeof (apiResponse.data) !== "string") {
                        destroySession(apiResponse);
                        orderSlips(apiResponse.data.slips)
                        setOriginalSlips(apiResponse.data.slips)
                        setSlipItems(apiResponse.data.slips)
                        checkEmptySlips(apiResponse.data.slips)
                    }
                })
    }, []);
    const [deleteAlert, setDeleteAlert] = useState({
        state: false,
        name: '',
        id: 0,
    });

    const [filterDateFrom, setFilterDateFrom] = useState("");
    const [filterDateTo, setFilterDateTo] = useState("");


    const [value, setValue] = React.useState<number[]>([0, 5000]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        filter()
    };

    const resetValue = () => {
        setValue([0, 5000]);
    };

    const resetDate = () => {
        setFilterDateFrom("")
        setFilterDateTo("")
    };
    const marks = [
        {
            value: 0,
            label: 'R0',
        },
        {
            value: 2500,
            label: 'R2500',
        },
        {
            value: 5000,
            label: '>R5000',
        },
    ];

    const [isOpenSearch, setIsOpenSearch] = useState(false);
    orderSlips(slipItems)
    return (
        <div>
            <IonItem>
                <IonTitle>All Receipts</IonTitle>
            </IonItem>
            <IonCard color="primary" className="receipts-table">
                <IonCardHeader className='search-bar-header'>
                    <IonItem color='primary'>
                        <IonSearchbar className='search-bar-receipts' color="tertiary" id='searchBar' onIonChange={filter} />
                        <IonFab horizontal="end">
                            <IonFabButton onClick={() => setIsOpenSearch(true)} color="secondary" size="small">
                                <IonIcon src={filterOutline} />
                            </IonFabButton>
                        </IonFab>
                    </IonItem>
                </IonCardHeader>

                {slipItems.map((item, index) => {
                    return (
                        <IonItem key={index} color="tertiary" id={"slipItem" + index}>
                            <IonLabel>
                                {item.transactionDate.split('T')[0].replace(/-/gi, "/").split('/').reverse().join('/') + " - " + item.location}
                            </IonLabel>
                            <div className='total-mobile'>
                                {"Total: R" + item.total.toFixed(2)}
                            </div>
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
                                            getAllSlips()
                                                .then(
                                                    apiResponse => {
                                                        if (typeof (apiResponse.data) !== "string") {
                                                            setSlipItems(apiResponse.data.slips)
                                                            checkEmptySlips(apiResponse.data.slips)
                                                        }
                                                    })
                                            setDeleteAlert({ state: false, name: '', id: 0 });
                                            orderSlips(slipItems)
                                        },
                                    },
                                ]}
                            />
                        </IonItem>
                    )
                })}

                <IonItem className='emptySlips' id='emptySlips' color="tertiary">Your scanned slips will be displayed here.</IonItem>
            </IonCard>

            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="Oops..."
                message={"Please enter a valid date interval."}
                buttons={['Ok']}
            />

            <IonModal onDidPresent={() => { toggleTotalFilter(totalToggle); toggleDates(dateToggle) }} isOpen={isOpenSearch} onDidDismiss={() => { setIsOpenSearch(false); filter() }}>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>Search Filter</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => {
                                returnToDefault()
                            }}>restore to default</IonButton>
                            <IonButton onClick={() => {
                                setIsOpenSearch(false); filter();
                            }}>Apply</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem>
                        <IonLabel>Total Filter</IonLabel>
                        <IonToggle color='secondary' onIonChange={e => toggleTotalFilter(!totalToggle)} checked={totalToggle} onClick={() => setTotalToggle(!totalToggle)} />
                    </IonItem>

                    <div id='totalSlider' className='totalSlider'>
                        <Slider
                            getAriaLabel={() => 'Total range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={5000}
                            step={100}
                            marks={marks}
                            color={'secondary'}
                        />
                    </div>

                    <IonItem>
                        <IonLabel>Date Filter</IonLabel>
                        <IonToggle color='secondary' onIonChange={e => toggleDates(!dateToggle)} checked={dateToggle} onClick={() => setDateToggle(!dateToggle)} />
                    </IonItem>

                    <div id='date-div' className='date-div' color="primary" >
                        <IonItem>
                            <IonLabel>From:
                                <IonItem className='date-item' color="tertiary">
                                    <IonDatetime onIonChange={e => { setFilterDateFrom(e.detail.value!) }} value={filterDateFrom} displayFormat='DD/MM/YYYY' id={"fromDate"} />
                                    <IonIcon icon={calendarOutline} slot="end" />
                                </IonItem>
                            </IonLabel>
                            <IonLabel>To:
                                <IonItem className='date-item' color="tertiary">
                                    <IonDatetime onIonChange={e => { setFilterDateTo(e.detail.value!) }} value={filterDateTo} displayFormat='DD/MM/YYYY' id={"toDate"} />
                                    <IonIcon icon={calendarOutline} slot="end" />
                                </IonItem>
                            </IonLabel>
                        </IonItem>
                    </div>
                </IonContent>
            </IonModal>
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

        if (dateToggle && checkDates())
            if (document.getElementById("fromDate")?.getElementsByTagName("input")[0].value !== "" || document.getElementById("toDate")?.getElementsByTagName("input")[0].value !== "") {
                dateFilter()
            }

        if (totalToggle)
            totalFilter()

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
        }
    }

    function toggleTotalFilter(state: any) {
        const temp = document.getElementById('totalSlider')
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
        const fromDate = filterDateFrom.split('T')[0].replace(/-/gi, "/")
        const toDate = filterDateTo.split('T')[0].replace(/-/gi, "/")

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
    }

    function checkDates() {
        const fromDate = filterDateFrom.split('T')[0].replace(/-/gi, "/")
        const toDate = filterDateTo.split('T')[0].replace(/-/gi, "/")

        if (toDate !== "" && fromDate !== "" && toDate !== undefined && fromDate !== undefined && toDate < fromDate) {
            setFilterDateFrom("")
            setFilterDateTo("")
            setShowAlert(true)
            return false
        }

        return true;
    }

    function totalFilter() {
        for (let i = 0; i < originalSlips.length; i++) {

            if (value[1] === 5000) {
                if (value[0] > originalSlips[i].total) {
                    const temp = document.getElementById("slipItem" + i)
                    if (temp !== null)
                        temp.style.display = "none";
                }
            }

            else if (value[0] > originalSlips[i].total || value[1] < originalSlips[i].total) {
                const temp = document.getElementById("slipItem" + i)
                if (temp !== null)
                    temp.style.display = "none";
            }
        }
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

    function returnToDefault()
    {
        resetDate()
        resetValue()
        setTotalToggle(false)
        setDateToggle(false)
    }

    function checkEmptySlips(reports: any) {

        if (reports.length === 0) {
            const temp = document.getElementById('emptySlips')
            if (temp !== null)
                temp.style.display = "block";
        }

        else {
            const temp = document.getElementById('emptySlips')
            if (temp !== null)
                temp.style.display = "none";
        }
    }
};

export default SlipItems;

