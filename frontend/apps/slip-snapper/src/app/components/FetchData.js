import React from "react";
import { IonButton } from '@ionic/react';
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
            <h1> Items </h1>  {
                items.map((item) => ( 
                <div className="div" id={item.id} contentEditable="false" suppressContentEditableWarning={true}>
                    <h2>Item { item.id }</h2>
                    <ul key = { item.id } className="no-bullets">
                        <li key = { item.id+""+item.itemName }>Item Name: { item.itemName }</li>
                        <li key = { item.id+""+item.quantity }>Quantity: { item.quantity }</li>
                        <li key = { item.id+""+item.price }>Price: { item.price }</li>
                        <li key = { item.id+""+item.type }>Type: { item.type }</li>
                        <li key = { item.id+""+item.date }>Date: { item.date }</li>
                        <li key = { item.id+""+item.location }>Location: { item.location }</li>
                    </ul>
                    <IonButton id={item.id+"b"} fill="outline" color="secondary" onClick={()=>toggleEditable(item.id)}>Edit</IonButton>
                </div>
                ))
            }
        </div>
    );

    function toggleEditable(id) {
        var editDiv = document.getElementById(id);
        var btn = document.getElementById(id+"b");
        var editedText = document.getElementById(id).innerText;
        if (editDiv.contentEditable === "true") {
            editDiv.contentEditable = "false";
            btn.color = "secondary";
            updateItem(editedText);
        } else {
            editDiv.contentEditable = "true";
            btn.color = "tertiary";
        }
    }

    function updateItem(editedText){
        let lines = editedText.split("\n")
        let _item = lines[0].split(" ")[0].toLowerCase() + lines[0].split(" ").pop()
        let _name = lines[1].split(" ").pop();
        let _location = lines[6].split(" ").pop();
        let _quantity = lines[2].split(" ").pop();
        let _price = lines[3].split(" ").pop();
        let _type = lines[4].split(" ").pop();
        let userid = 1;

        let resp = "";
        updateItemA(_item,userid,_name,_location,_quantity,_price,_type)
            .then((res) => res.json())
            .then(json => resp = json);
        console.log(resp)
    }

}
}
   
export default FetchData;