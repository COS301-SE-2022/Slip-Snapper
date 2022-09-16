import { IonCard, IonCardHeader, IonCardTitle, IonItem, IonText,} from "@ionic/react";
import React, { useEffect, useState } from 'react';
import {  getStatsA } from "../../api/apiCall"

export const UserStats = () => {
    const [userStats, setUserStats] = useState({
        category: {
            amount: 0,
            name: ""
        },
        lastMonth: {
            current: 0,
            previous: 0
        },
        lastWeek: {
            current: 0,
            previous: 0
        },
        mostExpensive: {
            name: "",
            amount: 0
        }
    });

    useEffect(() => {
        getStatsA()
            .then(
                apiResponse => {
                    if(typeof(apiResponse.data) !== "string"){
                        setUserStats(apiResponse.data)
                        console.log(apiResponse.data)
                    }  
                })
    }, []);

    console.log(userStats)
    return(
        <div className="wrapper">
            {/* Weekly Expenditure */}
            <IonCard className="card weekly" color="primary">
                <IonCardHeader>
                    <IonItem className="headings" color="primary">
                        <IonCardTitle>Weekly Expenditure</IonCardTitle>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonText data-testid='thisWeek'>Current Weekly Total: R{userStats.lastWeek.current.toFixed(2)}</IonText>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonText data-testid='lastWeek'>Previous Weekly Total: R{userStats.lastWeek.previous.toFixed(2)}</IonText>
                    </IonItem>
                </IonCardHeader>
            </IonCard>

            {/* Monthly Expenditure */}
            <IonCard className="card monthly" color="primary">
                <IonCardHeader>
                    <IonItem className="headings" color="primary">
                        <IonCardTitle>Monthly Expenditure</IonCardTitle>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonText data-testid='thisMonth'>Current Monthly Total: R{userStats.lastMonth.current.toFixed(2)}</IonText>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonText data-testid='lastMonth'>Previous Monthly Total: R{userStats.lastMonth.previous.toFixed(2)}</IonText>
                    </IonItem>
                </IonCardHeader>
            </IonCard>

            <IonCard className="card most-purchased" color="primary">
                <IonCardHeader>
                    <IonItem className="headings" color="primary">
                        <IonCardTitle>Most Purchased Category</IonCardTitle>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonText data-testid='categoryName'>Category: {userStats.category.name}</IonText>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonText data-testid='categoryTotal'>Total Spent: R{userStats.category.amount.toFixed(2)}</IonText>
                    </IonItem>
                </IonCardHeader>
            </IonCard>

            <IonCard className="card most-spent" color="primary">
                <IonCardHeader>
                    <IonItem className="headings" color="primary">
                        <IonCardTitle>Most Expensive Recent Purchase</IonCardTitle>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonText data-testid='storeName'>Item: {userStats.mostExpensive.name}</IonText>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonText data-testid='storeTotal'>Amount: R{userStats.mostExpensive.amount.toFixed(2)}</IonText>
                    </IonItem>
                </IonCardHeader>
            </IonCard>
        </div>

    )
};



