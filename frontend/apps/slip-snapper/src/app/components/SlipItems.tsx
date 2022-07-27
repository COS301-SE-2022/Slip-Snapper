import { IonTitle, IonButton, IonCard, IonCol, IonItem, IonRow } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getAllSlips } from '../../api/apiCall';
import '../theme/FetchData.css';


 const SlipItems: React.FC = () => {
    const [slipItems, setSlipItems] = useState<any[]>([]);
  useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user')!)
        if(user==null){
            user = {id: 24}
        }
        getAllSlips(user.id)
            .then(
                apiResponse => {
                    setSlipItems(apiResponse.data.slips)
                })
    }, []);



    return (
        <div className="App">
            <IonItem>
                <IonTitle>All Receipts</IonTitle>
            </IonItem>

            <IonRow>
                {slipItems.map((item, index) => (
                    <IonCol key={index} className="item-col">
                        <IonCard color="primary" className="items" id={item.id}>
                            <IonItem color="primary"><IonItem color="tertiary" className="titles" slot="start">Receipt #{item.id}</IonItem>{new Date(item.transactionDate).toDateString()}</IonItem>
                            <IonItem color="primary">
                                Location: {item.location}
                            </IonItem>
                            <IonItem color="primary">
                                Total: R{item.total}
                                <IonButton routerLink="/editreceipt" id={item.id + "b"} color="secondary" slot="end" onClick={() => {
                                    localStorage.removeItem('editSlip')
                                    localStorage.setItem('editSlip', JSON.stringify(item))
                                }}>Edit</IonButton>
                            </IonItem>
                        </IonCard>
                    </IonCol>
                ))}
            </IonRow>
        </div>
    );
};

export default SlipItems;