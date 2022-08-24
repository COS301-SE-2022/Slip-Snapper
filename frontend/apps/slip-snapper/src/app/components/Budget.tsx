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


export let globalCategoryBudgets: any
let globalCategorySpent: any, globalRenderedBudgets: any, globalSetRenderedBudgets: any


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
        household: 0,
        Other: 0,
    });

    //User Expenditure
    const [categoryBudgets, setCategoryBudgets] = useState({
        FoodBudget:
        {
            active: false,
            timeFrame: false,
            weeklyValue: 0,
            monthlyValue: 0
        },
        FashionBudget:
        {
            active: false,
            timeFrame: false,
            weeklyValue: 0,
            monthlyValue: 0
        },
        ElectronicsBudget:
        {
            active: false,
            timeFrame: false,
            weeklyValue: 0,
            monthlyValue: 0
        },
        HouseholdBudget:
        {
            active: false,
            timeFrame: false,
            weeklyValue: 0,
            monthlyValue: 0
        },
        OtherBudget:
        {
            active: false,
            timeFrame: false,
            weeklyValue: 0,
            monthlyValue: 0
        },
    });

    const [renderedBudgets, setRenderedBudgets] = useState({ FoodBudget: 0, FashionBudget: 0, ElecBudget: 0, HouseBudget: 0, OtherBudget: 0 })

    globalCategoryBudgets = categoryBudgets;
    globalCategorySpent = categorySpent;
    globalRenderedBudgets = renderedBudgets
    globalSetRenderedBudgets = setRenderedBudgets

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user')!)
        if (user == null) {
            user = { id: 24 }
        }
        getProfileData(user.id)
            .then(
                apiResponse => {
                    if (typeof (apiResponse.data) !== "string") {
                        console.log(apiResponse.data.otherBudgets.budgets.budgets)
                        setCategoryBudgets(apiResponse.data.otherBudgets.budgets.budgets)
                        setCategorySpent(apiResponse.data.otherBudgets.totals)
                        setProgressBars(apiResponse.data.otherBudgets.budgets.budgets, apiResponse.data.otherBudgets.totals)
                    }
                })
    }, []);
    return (
        <div>
            <IonItem id="foodBudget" className="categoryBudgets" color="tertiary" >
                <IonIcon className="edit-budget" src={create} onClick={() => setFood(true)} />
                <IonText>{"Food: R" + renderedBudgets.FoodBudget}</IonText>
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

            <IonItem id="fashionBudget" className="categoryBudgets" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setFashion(true)} />
                <IonText>{"Fashion: R" + renderedBudgets.FashionBudget}</IonText>
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

            <IonItem id="electronicsBudget" className="categoryBudgets" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setElec(true)} />
                <IonText>{"Electronics: R" + renderedBudgets.ElecBudget}</IonText>
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

            <IonItem id="houseBudget" className="categoryBudgets" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setHouseHold(true)} />
                <IonText>{"Household: R" + renderedBudgets.HouseBudget}</IonText>
                <IonProgressBar id='houseBar' class='progressBar' slot="end"></IonProgressBar><br />
            </IonItem>
            <IonAlert
                isOpen={houseHold}
                onDidDismiss={() => setHouseHold(false)}
                header={'Change Budget'}
                inputs={[
                    { name: 'house', placeholder: 'Insert Household Budget' },]}
                buttons={[
                    {
                        text: 'Apply',
                        handler: (alertData) => {
                            applyToBudget("house", alertData.house)
                        }
                    }]}></IonAlert>

            <IonItem id="otherBudget" className="categoryBudgets" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setOther(true)} />
                <IonText>{"Other: R" + renderedBudgets.OtherBudget}</IonText>
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
                if (categoryBudgets.FoodBudget.timeFrame === true) {
                    categoryBudgets.FoodBudget.weeklyValue = newBudget
                }
                else { categoryBudgets.FoodBudget.monthlyValue = newBudget }
                console.log(categoryBudgets)
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
                if (categoryBudgets.FashionBudget.timeFrame === true) {
                    categoryBudgets.FashionBudget.weeklyValue = newBudget
                }
                else { categoryBudgets.FashionBudget.monthlyValue = newBudget }
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
                if (categoryBudgets.ElectronicsBudget.timeFrame === true) {
                    categoryBudgets.ElectronicsBudget.weeklyValue = newBudget

                }
                else { categoryBudgets.ElectronicsBudget.monthlyValue = newBudget }
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
                if (categoryBudgets.HouseholdBudget.timeFrame === true) {
                    categoryBudgets.HouseholdBudget.weeklyValue = newBudget
                }
                else {
                    categoryBudgets.HouseholdBudget.monthlyValue = newBudget
                }
                setCategoryBudgets(categoryBudgets)
                isExceeded(newBudget, "houseBar", categorySpent.household)
                setGeneralBudget(user.id, categoryBudgets)
                present("New Household budget set", 1200)
            }
        }
        if (categoryBudgetType === "other") {

            if (isNaN(newBudget) || newBudget < 0) {
                present("Invalid Other budget set", 1200)
            }

            else {
                if (categoryBudgets.OtherBudget.timeFrame === true) {
                    categoryBudgets.OtherBudget.weeklyValue = newBudget
                }
                else { categoryBudgets.OtherBudget.monthlyValue = newBudget }
                setCategoryBudgets(categoryBudgets)
                isExceeded(newBudget, "otherBar", categorySpent.Other)
                setGeneralBudget(user.id, categoryBudgets)
                present("New Other budget set", 1200)
            }
        }
        setProgressBars(categoryBudgets, categorySpent)
    }

}

function isExceeded(budget: number, barID: string, total: number) {
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
function setProgressBars(budgets: any, totals: any) {

    const newBudgets = { FoodBudget: 0, FashionBudget: 0, ElecBudget: 0, HouseBudget: 0, OtherBudget: 0 }

    if (budgets.FoodBudget.timeFrame === true) {
        isExceeded(budgets.FoodBudget.weeklyValue, "foodBar", totals.Food);
        newBudgets.FoodBudget = budgets.FoodBudget.weeklyValue

    }
    else {
        isExceeded(budgets.FoodBudget.monthlyValue, "foodBar", totals.Food);
        newBudgets.FoodBudget = budgets.FoodBudget.monthlyValue
    }

    if (budgets.ElectronicsBudget.timeFrame === true) {
        isExceeded(budgets.ElectronicsBudget.weeklyValue, "elecBar", totals.Electronics);
        newBudgets.ElecBudget = budgets.ElectronicsBudget.weeklyValue
    }
    else {
        isExceeded(budgets.ElectronicsBudget.monthlyValue, "elecBar", totals.Electronics);
        newBudgets.ElecBudget = budgets.ElectronicsBudget.monthlyValue

    }

    if (budgets.FashionBudget.timeFrame === true) {
        isExceeded(budgets.FashionBudget.weeklyValue, "fashionBar", totals.Fashion);
        newBudgets.FashionBudget = budgets.FashionBudget.weeklyValue

    }
    else {
        isExceeded(budgets.FashionBudget.monthlyValue, "fashionBar", totals.Fashion);
        newBudgets.FashionBudget = budgets.FashionBudget.monthlyValue

    }

    if (budgets.HouseholdBudget.timeFrame === true) {
        isExceeded(budgets.HouseholdBudget.weeklyValue, "houseBar", totals.household);
        newBudgets.HouseBudget = budgets.HouseholdBudget.weeklyValue

    }
    else {
        isExceeded(budgets.HouseholdBudget.monthlyValue, "houseBar", totals.household);
        newBudgets.HouseBudget = budgets.HouseholdBudget.monthlyValue

    }

    if (budgets.OtherBudget.timeFrame === true) {
        isExceeded(budgets.OtherBudget.weeklyValue, "otherBar", totals.Other);
        newBudgets.OtherBudget = budgets.OtherBudget.weeklyValue

    }
    else {
        isExceeded(budgets.OtherBudget.monthlyValue, "otherBar", totals.Other);
        newBudgets.OtherBudget = budgets.OtherBudget.monthlyValue

    }

    globalSetRenderedBudgets(newBudgets)

}

export function updateBudgets() {

    let user = JSON.parse(localStorage.getItem('user')!)
    if (user == null) {
        user = { id: 24 }
    }

    getProfileData(user.id)
        .then(
            apiResponse => {
                if (typeof (apiResponse.data) !== "string") {
                    globalCategoryBudgets = apiResponse.data.otherBudgets.budgets.budgets;
                    setProgressBars(apiResponse.data.otherBudgets.budgets.budgets, apiResponse.data.otherBudgets.totals)
                }
            })
}
export default Budget;