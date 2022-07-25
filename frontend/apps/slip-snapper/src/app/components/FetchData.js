import React from "react";
import { IonCol, IonRow, IonTitle, IonButton, IonCard, IonItem, } from '@ionic/react';
import '../theme/FetchData.css';
import { updateItemA, getItemsA, getAllSlips } from "../../api/apiCall"

class FetchData extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        getAllSlips(user.id)
            .then(
                apiResponse => {
                    console.log(apiResponse.data.slips)
                    const res = apiResponse.data
                    this.setState({
                        items: res.slips,
                        DataisLoaded: true
                    });
                },
                error => {
                    this.setState({
                        DataisLoaded: true,
                        error
                    });
                })
    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Receipts Loading.... </h1> </div>;
        return (
            <div className="App">
                <IonItem>
                    <IonTitle>All Receipts</IonTitle>
                </IonItem>

                <IonRow>
                    {items.map((item) => (
                        <IonCol className="item-col">
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


        // TODO: Move this code to the new EditItem Page which will have items of individual slips

        // function updateItem(editedText){
        //     let lines = editedText.split("\n")
        //     let _item = lines[0].split(" ")[0].toLowerCase() + lines[0].split(" ").pop()
        //     let _name = lines[1].split(" ").pop();
        //     let _location = lines[6].split(" ").pop();
        //     let _quantity = lines[2].split(" ").pop();
        //     let _price = lines[3].split(" ").pop();
        //     let _type = lines[4].split(" ").pop();
        //     let userid = 1;

        //     let resp = "";
        //     updateItemA(_item,userid,_name,_location,_quantity,_price,_type)
        //         .then((res) => res.json())
        //         .then(json => resp = json);
        //     console.log(resp)
        // }

    }
}

export default FetchData;