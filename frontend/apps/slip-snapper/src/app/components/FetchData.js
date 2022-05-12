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
            console.log(editedText);
        } else {
            editDiv.contentEditable = "true";
            btn.color = "tertiary";
        }
    }
}
}
   
export default FetchData;