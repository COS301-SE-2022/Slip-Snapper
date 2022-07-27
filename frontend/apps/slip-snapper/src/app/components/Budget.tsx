import {
    IonAlert,
    IonIcon,
    IonItem,
    IonProgressBar,
    IonText
} from "@ionic/react";
import { useEffect, useState } from "react";
import '../theme/profile.css';
import { create } from 'ionicons/icons'
import { getProfileData, setGeneralBudget } from "../../api/apiCall"

function Budget() {
    const [food, setFood] = useState(false);
    const [fashion, setFashion] = useState(false);
    const [elec, setElec] = useState(false);
    const [houseHold, setHouseHold] = useState(false);
    const [other, setOther] = useState(false);
    const [budgetSpent, setBudgetSpent] = useState({
        Food:0,
        Fashion:0,
        Electronics:0,
        houseHold:0,
        Other:0,
    });
    const [amounts, setAmounts] = useState({
        monthlyElectronicsBudget: 0,
        monthlyFashionBudget: 0,
        monthlyFoodBudget: 0,
        monthlyHouseholdBudget: 0,
        monthlyOtherBudget: 0,
        weeklyElectronicsBudget: 0,
        weeklyFashionBudget: 0,
        weeklyFoodBudget: 0,
        weeklyHouseholdBudget: 0,
        weeklyOtherBudget: 0,
    });
    const totalSpent = 88;
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user')!)
        if(user==null){
            user = {id: 24}
        }
        getProfileData(user.id)
            .then(
                apiResponse => {
                    setAmounts(apiResponse.data.otherBudgets.budgets)
                    setBudgetSpent(apiResponse.data.otherBudgets.totals)
                })
      }, []);

    return (
        <div>
            <IonItem id="foodBudget" className="center-items" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setFood(true)}/>
                <IonText>{"Food: R"+amounts.weeklyFoodBudget}</IonText>
                <IonProgressBar id='foodBar' class='progressBar' slot="end"></IonProgressBar><br />
            </IonItem>
            <IonAlert
                isOpen={food}
                onDidDismiss={() => setFood(false)}
                header={'Change Budget'}
                inputs={[
                    { name: 'food',placeholder: 'Insert Food Budget'},]}
                buttons={[
                    {
                        text: 'Apply',
                        handler: (alertData) => {
                            amounts.weeklyFoodBudget = alertData.food
                            setAmounts(amounts)
                            isExceeded(parseFloat(alertData.food),"foodBar", budgetSpent.Food)
                            applyToBudget()
                        }
                    }]}></IonAlert>

            <IonItem id="fashionBudget" className="center-items" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setFashion(true)}/>
                <IonText>{"Fashion: R" + amounts.weeklyFoodBudget}</IonText>
                <IonProgressBar id='fashionBar' class='progressBar' slot="end"></IonProgressBar><br />
            </IonItem>
            <IonAlert
                isOpen={fashion}
                onDidDismiss={() => setFashion(false)}
                header={'Change Budget'}
                inputs={[
                    { name: 'food', placeholder: 'Insert Fashion Budget' },]}
                buttons={[
                    {
                        text: 'Apply',
                        handler: (alertData) => {
                            amounts.weeklyFashionBudget = alertData.food
                            setAmounts(amounts)
                            isExceeded(parseFloat(alertData.food), "fashionBar", budgetSpent.Fashion)
                            applyToBudget()
                        }
                    }]}></IonAlert>

            <IonItem id="electronicsBudget" className="center-items" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setElec(true)}/>
                <IonText>{"Electronics: R" + amounts.weeklyElectronicsBudget}</IonText>
                <IonProgressBar id='elecBar' class='progressBar' slot="end"></IonProgressBar><br />
            </IonItem>
            <IonAlert
                isOpen={elec}
                onDidDismiss={() => setElec(false)}
                header={'Change Budget'}
                inputs={[
                    { name: 'food', placeholder: 'Insert Electronics Budget' },]}
                buttons={[
                    {
                        text: 'Apply',
                        handler: (alertData) => {
                            amounts.weeklyElectronicsBudget = alertData.food
                            setAmounts(amounts)
                            isExceeded(parseFloat(alertData.food), "elecBar", budgetSpent.Electronics)
                            applyToBudget()
                        }
                    }]}></IonAlert>

            <IonItem id="houseBudget" className="center-items" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setHouseHold(true)}/>
                <IonText>{"Household: R" + amounts.weeklyHouseholdBudget}</IonText>
                <IonProgressBar id='houseBar' class='progressBar' slot="end"></IonProgressBar><br />
            </IonItem>
            <IonAlert
                isOpen={houseHold}
                onDidDismiss={() => setHouseHold(false)}
                header={'Change Budget'}
                inputs={[
                    { name: 'food', placeholder: 'Insert Fashion Budget' },]}
                buttons={[
                    {
                        text: 'Apply',
                        handler: (alertData) => {
                            amounts.weeklyHouseholdBudget = alertData.food
                            setAmounts(amounts)
                            isExceeded(parseFloat(alertData.food), "houseBar", budgetSpent.houseHold)
                            applyToBudget()
                        }
                    }]}></IonAlert>

            <IonItem id="otherBudget" className="center-items" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setOther(true)}/> 
                <IonText>{"Other: R" + amounts.weeklyOtherBudget}</IonText>
                <IonProgressBar id='otherBar' class='progressBar' slot="end"></IonProgressBar><br />
            </IonItem>
            <IonAlert
                isOpen={other}
                onDidDismiss={() => setOther(false)}
                header={'Change Budget'}
                inputs={[
                    { name: 'food', placeholder: 'Insert Other Budget' },]}
                buttons={[
                    {
                        text: 'Apply',
                        handler: (alertData) => {
                            amounts.weeklyOtherBudget = alertData.food
                            setAmounts(amounts)
                            isExceeded(parseFloat(alertData.food), "otherBar", budgetSpent.Other)
                            applyToBudget()
                        }
                    }]}></IonAlert>
        </div>
    );

    function applyToBudget() {
        let user = JSON.parse(localStorage.getItem('user')!)
        if(user==null){
            user = {id: 24}
        }
        setGeneralBudget(user.id,amounts)
    }
  
    function isExceeded(budget:number,barID:string, total:number) {
        const withinBudget = total / budget

        if (total >= budget && !isNaN(budget)) {
            document.getElementById(barID)?.setAttribute("color", "danger")
        }
        else if (total >= budget / 2 && !isNaN(budget)) {
            document.getElementById(barID)?.setAttribute("color", "warning")
        }
        else if (!isNaN(budget)) {
            document.getElementById(barID)?.setAttribute("color", "success")
        }

        document.getElementById(barID)?.setAttribute("value", withinBudget.toString())

        if (budget === 0) {
            document.getElementById(barID)?.setAttribute("value", "0")
            document.getElementById(barID)?.setAttribute("color", "success")
        }

    }
}
export default Budget;