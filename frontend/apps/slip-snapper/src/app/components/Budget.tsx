import {
    IonAlert,
    IonIcon,
    IonItem,
    IonProgressBar,
    IonText,
    useIonToast
} from "@ionic/react";
import { useEffect, useState } from "react";
import '../theme/profile.css';
import { create } from 'ionicons/icons'
import { getProfileData, setGeneralBudget } from "../../api/apiCall"

function Budget() {

    const [present, dismiss] = useIonToast();

    //Alerts
    const [food, setFood] = useState(false);
    const [fashion, setFashion] = useState(false);
    const [elec, setElec] = useState(false);
    const [houseHold, setHouseHold] = useState(false);
    const [other, setOther] = useState(false);

    const [categorySpent, setCategorySpent] = useState({
        Food: 0,
        Fashion: 0,
        Electronics: 0,
        Household: 0,
        Other: 0,
    });

    //User Expenditure
    const [categoryBudgets, setCategoryBudgets] = useState({
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

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user')!)
        if (user == null) {
            user = { id: 24 }
        }
        getProfileData(user.id)
            .then(
                apiResponse => {
                    if (typeof (apiResponse.data) !== "string") {

                        const mockSpent = {
                            Food: 10000,
                            Fashion: 20000,
                            Electronics: 10000,
                            Household: 40000,
                            Other: 50000,
                        }

                        const mockBudgets = {
                            monthlyElectronicsBudget: 0,
                            monthlyFashionBudget: 0,
                            monthlyFoodBudget: 20000,
                            monthlyHouseholdBudget: 0,
                            monthlyOtherBudget: 0,
                            weeklyElectronicsBudget: 21000,
                            weeklyFashionBudget: 18999,
                            weeklyFoodBudget: 14000,
                            weeklyHouseholdBudget: 28000,
                            weeklyOtherBudget: 89000,
                        }

                        // setCategoryBudgets(apiResponse.data.otherBudgets.budgets)
                        // setBudgetSpent(apiResponse.data.otherBudgets.totals)
                        setCategoryBudgets(mockBudgets)
                        setCategorySpent(mockSpent)

                        setProgressBars(mockBudgets, mockSpent)


                    }
                })
    }, []);

    return (
        <div>
            <IonItem id="foodBudget" className="center-items" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setFood(true)} />
                <IonText>{"Food: R" + categoryBudgets.weeklyFoodBudget}</IonText>
                <IonProgressBar id='foodBar' class='progressBar' slot="end"></IonProgressBar><br />
            </IonItem>
            <IonAlert
                isOpen={food}
                onDidDismiss={() => setFood(false)}
                header={'Change Budget'}
                inputs={[
                    { name: 'food', placeholder: 'Insert Food Budget' },]}
                buttons={[
                    {
                        text: 'Apply',
                        handler: (alertData) => {
                            applyToBudget("food", alertData.food)
                        }
                    }]}></IonAlert>

            <IonItem id="fashionBudget" className="center-items" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setFashion(true)} />
                <IonText>{"Fashion: R" + categoryBudgets.weeklyFashionBudget}</IonText>
                <IonProgressBar id='fashionBar' class='progressBar' slot="end"></IonProgressBar><br />
            </IonItem>
            <IonAlert
                isOpen={fashion}
                onDidDismiss={() => setFashion(false)}
                header={'Change Budget'}
                inputs={[
                    { name: 'fashion', placeholder: 'Insert Fashion Budget' },]}
                buttons={[
                    {
                        text: 'Apply',
                        handler: (alertData) => {
                            applyToBudget("fashion", alertData.fashion)
                        }
                    }]}></IonAlert>

            <IonItem id="electronicsBudget" className="center-items" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setElec(true)} />
                <IonText>{"Electronics: R" + categoryBudgets.weeklyElectronicsBudget}</IonText>
                <IonProgressBar id='elecBar' class='progressBar' slot="end"></IonProgressBar><br />
            </IonItem>
            <IonAlert
                isOpen={elec}
                onDidDismiss={() => setElec(false)}
                header={'Change Budget'}
                inputs={[
                    { name: 'elec', placeholder: 'Insert Electronics Budget' },]}
                buttons={[
                    {
                        text: 'Apply',
                        handler: (alertData) => {
                            applyToBudget("elec", alertData.elec)
                        }
                    }]}></IonAlert>

            <IonItem id="houseBudget" className="center-items" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setHouseHold(true)} />
                <IonText>{"Household: R" + categoryBudgets.weeklyHouseholdBudget}</IonText>
                <IonProgressBar id='houseBar' class='progressBar' slot="end"></IonProgressBar><br />
            </IonItem>
            <IonAlert
                isOpen={houseHold}
                onDidDismiss={() => setHouseHold(false)}
                header={'Change Budget'}
                inputs={[
                    { name: 'house', placeholder: 'Insert Fashion Budget' },]}
                buttons={[
                    {
                        text: 'Apply',
                        handler: (alertData) => {
                            applyToBudget("house", alertData.house)
                        }
                    }]}></IonAlert>

            <IonItem id="otherBudget" className="center-items" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setOther(true)} />
                <IonText>{"Other: R" + categoryBudgets.weeklyOtherBudget}</IonText>
                <IonProgressBar id='otherBar' class='progressBar' slot="end"></IonProgressBar><br />
            </IonItem>
            <IonAlert
                isOpen={other}
                onDidDismiss={() => setOther(false)}
                header={'Change Budget'}
                inputs={[
                    { name: 'other', placeholder: 'Insert Other Budget' },]}
                buttons={[
                    {
                        text: 'Apply',
                        handler: (alertData) => {
                            applyToBudget("other", alertData.other)
                        }
                    }]}></IonAlert>
        </div>
    );

    function applyToBudget(categoryBudgetType: string, newBudget: number) {
        let user = JSON.parse(localStorage.getItem('user')!)
        if (user == null) {
            user = { id: 24 }
        }

        if (categoryBudgetType === "food") {

            if (isNaN(newBudget) || newBudget < 0) {
                present("Invalid Food budget set", 1200)
            }

            else {
                categoryBudgets.weeklyFoodBudget = newBudget
                setCategoryBudgets(categoryBudgets)
                isExceeded(newBudget, "foodBar", categorySpent.Food)
                setGeneralBudget(user.id, categoryBudgets)
                present("New Food budget set", 1200)
            }
        }

        if (categoryBudgetType === "fashion") {

            if (isNaN(newBudget) || newBudget < 0) {
                present("Invalid Fashion budget set", 1200)
            }

            else {
                categoryBudgets.weeklyFashionBudget = newBudget
                setCategoryBudgets(categoryBudgets)
                isExceeded(newBudget, "fashionBar", categorySpent.Fashion)
                setGeneralBudget(user.id, categoryBudgets)
                present("New Fashion budget set", 1200)
            }
        }

        if (categoryBudgetType === "elec") {

            if (isNaN(newBudget) || newBudget < 0) {
                present("Invalid Electronics budget set", 1200)
            }

            else {
                categoryBudgets.weeklyElectronicsBudget = newBudget
                setCategoryBudgets(categoryBudgets)
                isExceeded(newBudget, "elecBar", categorySpent.Electronics)
                setGeneralBudget(user.id, categoryBudgets)
                present("New Electronics budget set", 1200)
            }
        }

        if (categoryBudgetType === "house") {

            if (isNaN(newBudget) || newBudget < 0) {
                present("Invalid Household budget set", 1200)
            }

            else {
                categoryBudgets.weeklyHouseholdBudget = newBudget
                setCategoryBudgets(categoryBudgets)
                isExceeded(newBudget, "houseBar", categorySpent.Household)
                setGeneralBudget(user.id, categoryBudgets)
                present("New Household budget set", 1200)
            }
        }

        if (categoryBudgetType === "other") {

            if (isNaN(newBudget) || newBudget < 0) {
                present("Invalid Other budget set", 1200)
            }

            else {
                categoryBudgets.weeklyOtherBudget = newBudget
                setCategoryBudgets(categoryBudgets)
                isExceeded(newBudget, "otherBar", categorySpent.Other)
                setGeneralBudget(user.id, categoryBudgets)
                present("New Other budget set", 1200)
            }
        }
    }

    function isExceeded(budget: number, barID: string, total: number) {
        const withinBudget = total / budget

        console.log(budget)
        console.log(barID)
        console.log(total)


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

    function setProgressBars(budgets:any , totals:any) {
        isExceeded(budgets.weeklyElectronicsBudget, "elecBar", totals.Electronics);
        isExceeded(budgets.weeklyFashionBudget, "fashionBar", totals.Fashion);
        isExceeded(budgets.weeklyFoodBudget, "foodBar", totals.Food);
        isExceeded(budgets.weeklyHouseholdBudget, "houseBar", totals.Household);
        isExceeded(budgets.weeklyOtherBudget, "otherBar", totals.Other);
    }
}
export default Budget;