import { IonTitle, IonButton, IonCard, IonCol, IonItem, IonRow, IonAlert, IonCardHeader, IonCardTitle } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getAllSlips } from '../../api/apiCall';
import '../theme/FetchData.css';


const SlipItems: React.FC = () => {
    const [slipItems, setSlipItems] = useState<any[]>([]);
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user')!)
        if (user == null) {
            user = { id: 24 }
        }
        getAllSlips(user.id)
            .then(
                apiResponse => {
                    if (typeof (apiResponse.data) !== "string") {
                        setSlipItems(apiResponse.data.slips)
                    }
                })
    }, []);


    const [deleteAlert, setDeleteAlert] = useState({
        state: false,
        name: '',
        Id: 0,
    });
    return (
        <div className="App">
            <IonItem>
                <IonTitle>All Receipts</IonTitle>
            </IonItem>
            <IonCard color="primary" className="all-reports">
                <IonCardHeader>
                    <IonCardTitle>All Reciepts:</IonCardTitle>
                </IonCardHeader>
                {slipItems.map((item, index) => (

                    <IonItem key={index} color="tertiary">
                        {item.location + " [ Total: " + item.total + "]"}
                        <IonButton routerLink="/editreceipt" id={item.id + "b"} color="secondary" slot="end" onClick={() => {
                            localStorage.removeItem('editSlip')
                            localStorage.setItem('editSlip', JSON.stringify(item))
                        }}>Edit</IonButton>
                        <IonButton
                            onClick={() =>
                                setDeleteAlert({
                                    state: true,
                                    name: "report.reportName",
                                    Id: 0,
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
                                setDeleteAlert({ state: false, name: '', Id: 0 })
                            }
                            header="Confirm Delete"
                            message="Are you sure you want to delete this report?"
                            buttons={[
                                'Cancel',
                                {
                                    text: 'Delete',
                                    cssClass: 'toasts',
                                    handler: () => {
                                        setDeleteAlert({ state: false, name: '', Id: 0 });
                                    },
                                },
                            ]}
                        />
                    </IonItem>

                ))

                }
            </IonCard>

        </div>
    );
};

export default SlipItems;