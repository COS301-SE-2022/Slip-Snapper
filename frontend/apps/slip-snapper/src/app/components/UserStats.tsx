import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonText, IonTextarea } from "@ionic/react";
import React, { useEffect, useState } from 'react';
import {  getStatsA } from "../../api/apiCall"

const favourite = { store: "N/A", total: 0 }
const mostSpentCategory = { itemCategory: "N/A", total: 0 }
const mostSpentStore = { store: "N/A", total: 0 }
const weekMonthSpent = { lastWeek: 0, thisWeek: 0, lastMonth: 0, thisMonth: 0 }
export const UserStats = () => {
    const [userStats, setUserStats] = useState({
        category: {
            amount: 0,
            name: ""
        },
        favouriteStore: {
            name: "",
            // receipts: []
            total: 0
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
        getStatsA(1)
            .then(
                apiResponse => {
                    setUserStats(apiResponse.data)
                })
    }, []);
    return(
        <div className="wrapper">
            {/* Weekly Expenditure */}
            <IonCard className="card weekly" color="primary">
                <IonCardHeader>
                    <IonItem className="headings" color="primary">
                        <IonCardTitle>Weekly Expenditure</IonCardTitle>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonText data-testid='thisWeek'>Current Weekly Total: R{userStats.lastWeek.current}</IonText>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonText data-testid='lastWeek'>Previous Weekly Total: R{userStats.lastWeek.previous}</IonText>
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
                        <IonText data-testid='thisMonth'>Current Monthly Total: R{userStats.lastMonth.current}</IonText>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonText data-testid='lastMonth'>Previous Monthly Total: R{userStats.lastMonth.previous}</IonText>
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
                        <IonText data-testid='categoryTotal'>Total Spent: R{userStats.category.amount}</IonText>
                    </IonItem>
                </IonCardHeader>
            </IonCard>

            <IonCard className="card most-spent" color="primary">
                <IonCardHeader>
                    <IonItem className="headings" color="primary">
                        <IonCardTitle>Most Expensive Recent Purchase</IonCardTitle>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonText data-testid='storeName'>Store: {userStats.mostExpensive.name}</IonText>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonText data-testid='storeTotal'>Amount: R{userStats.mostExpensive.amount}</IonText>
                    </IonItem>
                </IonCardHeader>
            </IonCard>
        </div>

    )
};



