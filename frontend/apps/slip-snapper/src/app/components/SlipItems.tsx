import { IonTitle, IonButton, IonCard, IonItem, IonAlert, IonCardHeader, IonCardTitle, IonLabel, IonSearchbar, IonCol, IonGrid, IonRow, IonToggle } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getAllSlips, deleteSlip } from '../../api/apiCall';
import '../theme/SlipItems.css';


const SlipItems: React.FC = () => {
    let user = JSON.parse(localStorage.getItem('user')!)

    const [originalSlips, setOriginalSlips] = useState<any[]>([]);
    const [slipItems, setSlipItems] = useState<any[]>([]);

    useEffect(() => {
        if (user == null) {
            user = { id: 24 }
        }
        getAllSlips(user.id)
            .then(
                apiResponse => {
                    if (typeof (apiResponse.data) !== "string") {
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
    return (
        <div>
            <IonItem>
                <IonTitle>All Receipts</IonTitle>
            </IonItem>
            <div className='wrapper'>
                <IonCard color="primary" className="search-bar">

                    <IonItem color='primary'>
                        <IonSearchbar color="tertiary" onIonChange={e => searchFilter(e.detail.value)} />
                    </IonItem>

                    <IonItem color='primary'>
                        <IonLabel>Total Filter</IonLabel>
                        <IonToggle color='secondary' />
                    </IonItem>

                    <IonItem color='primary'>
                        <IonLabel>Date Filter</IonLabel>
                        <IonToggle color='secondary' />
                    </IonItem>

                </IonCard>

                <IonCard color="primary" className="receipts-table">
                    <IonCardHeader>
                        <IonCardTitle>Receipts</IonCardTitle>
                    </IonCardHeader>

                    {slipItems.map((item, index) => {
                        return (
                            <IonItem key={index} color="tertiary">
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

    function searchFilter(searchText: string | undefined) {
        setSlipItems([])
        const temp: any[] = [];

        if (searchText !== undefined) {
            for (let i = 0; i < originalSlips.length; i++) {
                console.log( )
                if (originalSlips[i].location.toLowerCase().includes(searchText.toLowerCase())) {
                    temp.push(originalSlips[i]);
                }
                else if (originalSlips[i].transactionDate.split('T')[0].replace(/-/gi, "/").split('/').reverse().join('/').includes(searchText.toLowerCase()))
                {
                    temp.push(originalSlips[i]);
                }
            }
        }
        setSlipItems(temp)
    }
};

export default SlipItems;