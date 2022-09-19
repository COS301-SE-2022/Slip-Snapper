import { IonCard, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonItem, IonText } from "@ionic/react";
import React, { useEffect, useState } from 'react';
import { getStatsA, getProfileData } from "../../api/apiCall"
import '../theme/user-stats.css';
import { helpCircleOutline } from 'ionicons/icons';
import { Popover } from '@mui/material';
import ProfileBarGraph from "./ProfileBarGraph";
import ProfilePieChart from "./ProfilePieChart";

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

    const [percentages, setPercentages] = useState({
        Food: 0,
        Fashion: 0,
        Electronics: 0,
        Household: 0,
        Other: 0,
        Healthcare: 0,
        Hobby: 0,
        Vehicle: 0
});
    useEffect(() => {
        getStatsA()
            .then(
                apiResponse => {
                    if (typeof (apiResponse.data) !== "string") {
                        setUserStats(apiResponse.data)
                    }
                })

        getProfileData()
            .then(apiResponse => {
                if (typeof (apiResponse.data) !== "string") {
                    if(apiResponse.data)
                       setPercentages(apiResponse.data.otherBudgets.percentages)
                }
            })
    }, []);

    const [weekExPop, setWeekExPop] = useState(null);
    const [monthExPop, setMonthExPop] = useState(null);
    const [mostCategory, setMostCategory] = useState(null);
    const [mostExpensive, setMostExpensive] = useState(null);


    const openWeekExPop = (event: any) => { setWeekExPop(event.currentTarget); };
    const openMonthExPop = (event: any) => { setMonthExPop(event.currentTarget); };
    const openMostCategory = (event: any) => { setMostCategory(event.currentTarget); };
    const openMostExpensive = (event: any) => { setMostExpensive(event.currentTarget); };

    const closeWeekExPop = () => { setWeekExPop(null); };
    const closeMonthExPop = () => { setMonthExPop(null); };
    const closeMostCategory = () => { setMostCategory(null); };
    const closeMostExpensive = () => { setMostExpensive(null); };

    return (
        <div className="wrapper">
            {/* Weekly Expenditure */}
            <IonCard className="card weekly" color="primary">
                <IonCardHeader>
                    <IonItem lines="none" className="headings" color="primary">
                        <IonCardTitle>Weekly Expenditure</IonCardTitle>
                        <IonIcon src={helpCircleOutline} onClick={openWeekExPop} className="info-icon" />
                        <Popover
                            open={Boolean(weekExPop)}
                            onClose={closeWeekExPop}
                            anchorEl={weekExPop}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <p className="popover-text">Compare your total weekly expenditure for this week
                                and the previous week to manage your spending habits.</p>
                        </Popover>
                    </IonItem>
                    <ProfileBarGraph graphData={userStats.lastWeek}></ProfileBarGraph>
                </IonCardHeader>
            </IonCard>

            {/* Monthly Expenditure */}
            <IonCard className="card monthly" color="primary">
                <IonCardHeader>
                    <IonItem lines="none" className="headings" color="primary">
                        <IonCardTitle>Monthly Expenditure</IonCardTitle>
                        <IonIcon src={helpCircleOutline} onClick={openMonthExPop} className="info-icon" />
                        <Popover
                            open={Boolean(monthExPop)}
                            onClose={closeMonthExPop}
                            anchorEl={monthExPop}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <p className="popover-text">Compare your total monthly expenditure for this month
                                and the previous month to manage your spending habits.</p>
                        </Popover>
                    </IonItem>
                    <ProfileBarGraph graphData={userStats.lastMonth}></ProfileBarGraph>
                </IonCardHeader>
            </IonCard>

            <IonCard className="card most-purchased" color="primary">
                <IonCardHeader>
                    <IonItem lines="none" className="headings" color="primary">
                        <IonCardTitle>Category Expenditure</IonCardTitle>
                        <IonIcon src={helpCircleOutline} onClick={openMostCategory} className="info-icon" />
                        <Popover
                            open={Boolean(mostCategory)}
                            onClose={closeMostCategory}
                            anchorEl={mostCategory}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <p className="popover-text">Your categorized expenditure of the last month. </p>
                        </Popover>
                    </IonItem>
                    <ProfilePieChart graphData={[percentages]}></ProfilePieChart>
                </IonCardHeader>
            </IonCard>

            <IonCard className="card most-spent" color="primary">
                <IonCardHeader>
                    <IonItem className="headings" color="primary">
                        <IonCardTitle>Most Expensive Recent Purchase</IonCardTitle>
                        <IonIcon src={helpCircleOutline} onClick={openMostExpensive} className="info-icon" />
                        <Popover
                            open={Boolean(mostExpensive)}
                            onClose={closeMostExpensive}
                            anchorEl={mostExpensive}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <p className="popover-text">The most expensive purchase that you have made this month.</p>
                        </Popover>
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



