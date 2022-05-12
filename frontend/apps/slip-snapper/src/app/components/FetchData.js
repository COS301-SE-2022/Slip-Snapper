import React from "react";
import { IonButton } from '@ionic/react';
import '../pages/FetchData.css';
class FetchData extends React.Component {
   
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }
   
    // ComponentDidMount is used to
    // execute the code 
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
            <h1> Pleses wait some time.... </h1> </div> ;
        return (
        <div className = "App">
            <h1> Fetch data from an api in react </h1>  {
                items.map((item) => ( 
                <div class="div">
                    <ul key = { item.id } class="no-bullets">
                        <li>Item Name: { item.item_name }</li>
                        <li>Quantity: { item.quantity }</li>
                        <li>Price: { item.price }</li>
                        <li>Type: { item.type }</li>
                        <li>Date: { item.date }</li>
                        <li>Location: { item.location }</li>
                    </ul>
                    <IonButton fill="outline" color="secondary">Edit</IonButton>
                </div>
                ))
            }
        </div>
    );
}
}
   
export default FetchData;