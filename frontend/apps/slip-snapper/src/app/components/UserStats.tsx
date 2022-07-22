import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonTextarea } from "@ionic/react";
import React, { useEffect } from 'react';
import {  getStatsA } from "../../api/apiCall"

const favourite = { store: "N/A", total: 0 }
const mostSpentCategory = { itemCategory: "N/A", total: 0 }
const mostSpentStore = { store: "N/A", total: 0 }
const weekMonthSpent = { lastWeek: 0, thisWeek: 0, lastMonth: 0, thisMonth: 0 }
export const UserStats = () => {
    useEffect(() => {
        getStatsA(1)
            .then(
                apiResponse => {
                    mostSpentCategory.itemCategory = apiResponse.data.category.name;
                    mostSpentCategory.total = apiResponse.data.category.amount;
                    mostSpentStore.store = apiResponse.data.mostExpensive.name;
                    mostSpentStore.total = apiResponse.data.mostExpensive.amount;
                    weekMonthSpent.lastWeek = apiResponse.data.lastWeek.previous;
                    weekMonthSpent.thisWeek = apiResponse.data.lastWeek.current;
                    weekMonthSpent.lastMonth = apiResponse.data.lastMonth.previous;
                    weekMonthSpent.thisMonth = apiResponse.data.lastMonth.current;
                    favourite.store = apiResponse.data.favouriteStore.name;
                    favourite.total = apiResponse.data.favouriteStore.total;

                    setUserStatistics()

                })
    }, []);
    return(
        <div className="wrapper">
            <IonCard className="card weekly" color="primary">
                <IonCardHeader>
                    <IonItem className="headings" color="primary">
                        <IonCardTitle>Weekly Expenditure</IonCardTitle>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonCardSubtitle> <IonTextarea title="thisWeek" id='thisWeek' readonly ></IonTextarea></IonCardSubtitle>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonCardSubtitle> <IonTextarea title="lastWeek" id='lastWeek' readonly ></IonTextarea></IonCardSubtitle>
                    </IonItem>
                </IonCardHeader>
                <IonItem color="primary">
                    <IonButton fill="solid" slot="end" color="secondary">
                        Compare Reports
                    </IonButton>
                </IonItem>
            </IonCard>

            <IonCard className="card monthly" color="primary">
                <IonCardHeader>
                    <IonItem className="headings" color="primary">
                        <IonCardTitle>Monthly Expenditure</IonCardTitle>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonCardSubtitle><IonTextarea title="thisMonth" id='thisMonth' readonly ></IonTextarea></IonCardSubtitle>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonCardSubtitle><IonTextarea title="lastMonth" id='lastMonth' readonly ></IonTextarea></IonCardSubtitle>
                    </IonItem>
                </IonCardHeader>
                <IonItem color="primary">
                    <IonButton fill="solid" slot="end" color="secondary">
                        Compare Reports
                    </IonButton>
                </IonItem>
            </IonCard>

            <IonCard className="card most-purchased" color="primary">
                <IonCardHeader>
                    <IonItem className="headings" color="primary">
                        <IonCardTitle>Favourite Item Category</IonCardTitle>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonTextarea title="categoryName" id='categoryName' readonly ></IonTextarea>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonTextarea title="categoryTotal" id='categoryTotal' readonly></IonTextarea>
                    </IonItem>
                </IonCardHeader>
            </IonCard>

            <IonCard className="card most-spent" color="primary">
                <IonCardHeader>
                    <IonItem className="headings" color="primary">
                        <IonCardTitle>Most Spent At Store</IonCardTitle>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonCardSubtitle> <IonTextarea title="storeName" id='storeName' readonly ></IonTextarea></IonCardSubtitle>
                    </IonItem>
                    <IonItem className="center-items" color="tertiary">
                        <IonCardSubtitle> <IonTextarea title="storeTotal" id='storeTotal' readonly ></IonTextarea></IonCardSubtitle>
                    </IonItem>
                </IonCardHeader>
            </IonCard>
        </div>

    )
};
function setUserStatistics() {
    document.getElementById("favoriteStore")?.setAttribute("value", "Store Name: " + favourite.store)
    document.getElementById("favoriteTotal")?.setAttribute("value", "Total: R" + favourite.total.toFixed(2).toString())
    document.getElementById("categoryName")?.setAttribute("value", "Item Category: " + mostSpentCategory.itemCategory)
    document.getElementById("categoryTotal")?.setAttribute("value", "Total: R" + mostSpentCategory.total.toFixed(2).toString())
    document.getElementById("storeName")?.setAttribute("value", "Store Name: " + mostSpentStore.store)
    document.getElementById("storeTotal")?.setAttribute("value", "Total: R" + mostSpentStore.total.toFixed(2).toString())
    document.getElementById("lastWeek")?.setAttribute("value", "Total Spent Last Week: R" + weekMonthSpent.lastWeek.toFixed(2).toString())
    document.getElementById("thisWeek")?.setAttribute("value", "Total Spent This Week: R" + weekMonthSpent.thisWeek.toFixed(2).toString())
    document.getElementById("lastMonth")?.setAttribute("value", "Total Spent Last Month: R" + weekMonthSpent.lastMonth.toFixed(2).toString())
    document.getElementById("thisMonth")?.setAttribute("value", "Total Spent This Month: R" + weekMonthSpent.thisMonth.toFixed(2).toString())
}



