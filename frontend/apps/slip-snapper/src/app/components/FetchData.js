import React from "react";
import { IonButton } from '@ionic/react';
import '../pages/FetchData.css';
class FetchData extends React.Component {
   
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }
   
    componentDidMount() {
        fetch("http://localhost:1234/items?user=1", {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => res.json())
            .then(
                (json) => {
                this.setState({
                    items: json,
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
                        <li>Item Name: { item.item_name }</li>
                        <li>Quantity: { item.quantity }</li>
                        <li>Price: { item.price }</li>
                        <li>Type: { item.type }</li>
                        <li>Date: { item.date }</li>
                        <li>Location: { item.location }</li>
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

        fetch("http://localhost:1234/updateItem", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    itemid: _item,
                    user: 1,
                    name : _name,
                    location : _location,
                    quantity : _quantity,
                    price : _price,
                    type : _type
                })
            })
            .then((res) => res.json());
    }

}
}
   
export default FetchData;