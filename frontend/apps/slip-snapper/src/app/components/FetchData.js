import React from "react";
import { IonCol, IonRow, IonTitle, IonButton, IonCard, IonItem, } from '@ionic/react';
import '../pages/FetchData.css';
import { updateItemA, getItemsA } from "../../api/apiCall"

class FetchData extends React.Component {
   
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }
   
    componentDidMount() {
        getItemsA(1)
            .then((res) => res.json())
            .then(
                (json) => {
                    this.setState({
                        items: json.itemList,
                        DataisLoaded: true
                    });
            },
                (error) => {
                    this.setState({
                        DataisLoaded: true,
                        error
                    });
            })
    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Items Loading.... </h1> </div> ;
        return (
        <div className = "App">
            <IonItem>
                <IonTitle>Receipts</IonTitle>
            </IonItem>
            
            <IonRow>
                {items.map((item) => ( 
                    <IonCol className="item-col">
                        <IonCard color="primary" className="items" id={item.id}>
                            <IonItem color="primary"><IonItem color="tertiary" className="titles" slot="start">Receipt #{ item.id }</IonItem>{ new Date(item.date).toDateString() }</IonItem>
                            <IonItem color="primary">
                                Location: { item.location }
                                <IonButton id={item.id+"b"} color="secondary" slot="end" onClick={()=>console.log("TODO: this should retrieve receipt image and open new EditItem page")}>Edit</IonButton>
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