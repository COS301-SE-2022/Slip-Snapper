import {
    IonAlert,
    IonFab,
    IonIcon,
    IonItem,
    IonProgressBar,
    IonText,
    useIonToast
} from "@ionic/react";
import { useEffect, useState } from "react";
import '../theme/profile.css';
import { create } from 'ionicons/icons'
import Filter7Icon from '@mui/icons-material/Filter7Outlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
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
    const [healthcare, setHealthCare] = useState(false);
    const [hobby, setHobby] = useState(false);
    const [vehicle, setVehicle] = useState(false);


    const [weeklyCategorySpent, setWeeklyCategorySpent] = useState({
        Food: 0,
        Fashion: 0,
        Electronics: 0,
        Household: 0,
        Other: 0,
        Healthcare: 0,
        Hobby: 0,
        Vehicle: 0

    });

    const [monthlyCategorySpent, setMonthlyCategorySpent] = useState({
        Food: 0,
        Fashion: 0,
        Electronics: 0,
        Household: 0,
        Other: 0,
        Healthcare: 0,
        Hobby: 0,
        Vehicle: 0

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
        HealthcareBudget:
        {
            active: false,
            timeFrame: false,
            weeklyValue: 0,
            monthlyValue: 0
        },
        HobbyBudget:
        {
            active: false,
            timeFrame: false,
            weeklyValue: 0,
            monthlyValue: 0
        },
        VehicleBudget:
        {
            active: false,
            timeFrame: false,
            weeklyValue: 0,
            monthlyValue: 0
        },
    });

    const [renderedBudgets, setRenderedBudgets] = useState({
        FoodBudget: 0, FashionBudget: 0, ElecBudget: 0, HouseBudget: 0, OtherBudget: 0
        , HealthcareBudget: 0, HobbyBudget: 0, VehicleBudget: 0
    })

    globalCategoryBudgets = categoryBudgets;
    // globalCategorySpent = weeklyCategorySpent;
    // globalRenderedBudgets = renderedBudgets
    globalSetRenderedBudgets = setRenderedBudgets

    useEffect(() => {
        getProfileData()
            .then(
                apiResponse => {
                    if (typeof (apiResponse.data) !== "string") {
                        setCategoryBudgets(apiResponse.data.otherBudgets.budgets.budgets)
                        setWeeklyCategorySpent(apiResponse.data.otherBudgets.weeklyTotal)
                        setMonthlyCategorySpent(apiResponse.data.otherBudgets.monthlyTotal)
                        setProgressBars(apiResponse.data.otherBudgets.budgets.budgets, apiResponse.data.otherBudgets.weeklyTotal, apiResponse.data.otherBudgets.monthlyTotal)
                    }
                })
    }, []);
    return (
        <div>
            <IonItem id="foodBudget" className="categoryBudgets" color="tertiary" >
                <IonIcon className="edit-budget" src={create} onClick={() => setFood(true)} />
                <IonText>Food: R{categoryBudgets.FoodBudget.timeFrame === true ? categoryBudgets.FoodBudget.weeklyValue.toFixed(2) : categoryBudgets.FoodBudget.monthlyValue.toFixed(2)}</IonText>
                <IonProgressBar id='foodBar' class='categoryProgressBar' slot="end" ></IonProgressBar><br />
                <IonFab horizontal='end' edge>
                    {categoryBudgets.FoodBudget.timeFrame === true ? <Filter7Icon /> : <CalendarMonthIcon />}
                </IonFab>
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
                <IonText>Fashion: R{categoryBudgets.FashionBudget.timeFrame === true ? categoryBudgets.FashionBudget.weeklyValue.toFixed(2) : categoryBudgets.FashionBudget.monthlyValue.toFixed(2)}</IonText>
                <IonProgressBar id='fashionBar' class='categoryProgressBar' slot="end" ></IonProgressBar><br />
                <IonFab horizontal='end' edge>
                    {categoryBudgets.FashionBudget.timeFrame === true ? <Filter7Icon /> : <CalendarMonthIcon />}
                </IonFab>
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
                <IonText>Electronics: R{categoryBudgets.ElectronicsBudget.timeFrame === true ? categoryBudgets.ElectronicsBudget.weeklyValue.toFixed(2) : categoryBudgets.ElectronicsBudget.monthlyValue.toFixed(2)}</IonText>
                <IonProgressBar id='elecBar' class='categoryProgressBar' slot="end" ></IonProgressBar><br />
                <IonFab horizontal='end' edge>
                    {categoryBudgets.ElectronicsBudget.timeFrame === true ? <Filter7Icon /> : <CalendarMonthIcon />}
                </IonFab>
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
                <IonText>Household: R{categoryBudgets.HouseholdBudget.timeFrame === true ? categoryBudgets.HouseholdBudget.weeklyValue.toFixed(2) : categoryBudgets.HouseholdBudget.monthlyValue.toFixed(2)}</IonText>
                <IonProgressBar id='houseBar' class='categoryProgressBar' slot="end" ></IonProgressBar><br />
                <IonFab horizontal='end' edge>
                    {categoryBudgets.HouseholdBudget.timeFrame === true ? <Filter7Icon /> : <CalendarMonthIcon />}
                </IonFab>
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

            <IonItem id="hobbyBudget" className="categoryBudgets" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setHobby(true)} />
                <IonText>Hobby: R{categoryBudgets.HobbyBudget.timeFrame === true ? categoryBudgets.HobbyBudget.weeklyValue.toFixed(2) : categoryBudgets.HobbyBudget.monthlyValue.toFixed(2)}</IonText>
                <IonProgressBar id='hobbyBar' class='categoryProgressBar' slot="end"></IonProgressBar><br />
                <IonFab horizontal='end' edge>
                    {categoryBudgets.HobbyBudget.timeFrame === true ? <Filter7Icon /> : <CalendarMonthIcon />}
                </IonFab>
            </IonItem>
            <IonAlert
                isOpen={hobby}
                onDidDismiss={() => setHobby(false)}
                header={'Change Budget'}
                inputs={[
                    { name: 'hobby', placeholder: 'Insert Hobby Budget' },]}
                buttons={[
                    {
                        text: 'Apply',
                        handler: (alertData) => {
                            applyToBudget("hobby", alertData.hobby)
                        }
                    }]}></IonAlert>

            <IonItem id="healthcareBudget" className="categoryBudgets" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setHealthCare(true)} />
                <IonText>Healthcare: R{categoryBudgets.HealthcareBudget.timeFrame === true ? categoryBudgets.HealthcareBudget.weeklyValue.toFixed(2) : categoryBudgets.HealthcareBudget.monthlyValue.toFixed(2)}</IonText>
                <IonProgressBar id='healthcareBar' class='categoryProgressBar' slot="end"></IonProgressBar><br />
                <IonFab horizontal='end' edge>
                    {categoryBudgets.HealthcareBudget.timeFrame === true ? <Filter7Icon /> : <CalendarMonthIcon />}
                </IonFab>
            </IonItem>
            <IonAlert
                isOpen={healthcare}
                onDidDismiss={() => setHealthCare(false)}
                header={'Change Budget'}
                inputs={[
                    { name: 'healthcare', placeholder: 'Insert Healthcare Budget' },]}
                buttons={[
                    {
                        text: 'Apply',
                        handler: (alertData) => {
                            applyToBudget("healthcare", alertData.healthcare)
                        }
                    }]}></IonAlert>

            <IonItem id="vehicleBudget" className="categoryBudgets" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setVehicle(true)} />
                <IonText>Vehicle: R{categoryBudgets.VehicleBudget.timeFrame === true ? categoryBudgets.VehicleBudget.weeklyValue.toFixed(2) : categoryBudgets.VehicleBudget.monthlyValue.toFixed(2)}</IonText>
                <IonProgressBar id='vehicleBar' class='categoryProgressBar' slot="end"></IonProgressBar><br />
                <IonFab horizontal='end' edge>
                    {categoryBudgets.VehicleBudget.timeFrame === true ? <Filter7Icon /> : <CalendarMonthIcon />}
                </IonFab>
            </IonItem>
            <IonAlert
                isOpen={vehicle}
                onDidDismiss={() => setVehicle(false)}
                header={'Change Budget'}
                inputs={[
                    { name: 'vehicle', placeholder: 'Insert Vehicle Budget' },]}
                buttons={[
                    {
                        text: 'Apply',
                        handler: (alertData) => {
                            applyToBudget("vehicle", alertData.vehicle)
                        }
                    }]}></IonAlert>

            <IonItem id="otherBudget" className="categoryBudgets" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setOther(true)} />
                <IonText>Other: R{categoryBudgets.OtherBudget.timeFrame === true ? categoryBudgets.OtherBudget.weeklyValue.toFixed(2) : categoryBudgets.OtherBudget.monthlyValue.toFixed(2)}</IonText>
                <IonProgressBar id='otherBar' class='categoryProgressBar' slot="end"></IonProgressBar><br />
                <IonFab horizontal='end' edge>
                    {categoryBudgets.OtherBudget.timeFrame === true ? <Filter7Icon /> : <CalendarMonthIcon />}
                </IonFab>
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
        if (categoryBudgetType === "food") {

            if (isNaN(newBudget) || newBudget < 0) {
                present("Invalid Food budget set", 1200)
            }

            else {
                if (categoryBudgets.FoodBudget.timeFrame === true) {
                    categoryBudgets.FoodBudget.weeklyValue = Number(newBudget)
                    isExceeded(newBudget, "foodBar", weeklyCategorySpent.Food)
                }
                else { 
                    categoryBudgets.FoodBudget.monthlyValue = Number(newBudget) 
                    isExceeded(newBudget, "foodBar", monthlyCategorySpent.Food)
                }
                setCategoryBudgets(categoryBudgets)
                setGeneralBudget(categoryBudgets)
                present("New Food budget set", 1200)
            }
        }

        if (categoryBudgetType === "fashion") {

            if (isNaN(newBudget) || newBudget < 0) {
                present("Invalid Fashion budget set", 1200)
            }

            else {
                if (categoryBudgets.FashionBudget.timeFrame === true) {
                    categoryBudgets.FashionBudget.weeklyValue = Number(newBudget)
                    isExceeded(newBudget, "fashionBar", weeklyCategorySpent.Fashion)
                }
                else { 
                    categoryBudgets.FashionBudget.monthlyValue = Number(newBudget) 
                    isExceeded(newBudget, "fashionBar", monthlyCategorySpent.Fashion)
                }
                setCategoryBudgets(categoryBudgets)
                setGeneralBudget(categoryBudgets)
                present("New Fashion budget set", 1200)
            }
        }

        if (categoryBudgetType === "elec") {

            if (isNaN(newBudget) || newBudget < 0) {
                present("Invalid Electronics budget set", 1200)
            }

            else {
                if (categoryBudgets.ElectronicsBudget.timeFrame === true) {
                    categoryBudgets.ElectronicsBudget.weeklyValue = Number(newBudget)
                    isExceeded(newBudget, "elecBar", weeklyCategorySpent.Electronics)
                }
                else { 
                    categoryBudgets.ElectronicsBudget.monthlyValue = Number(newBudget) 
                    isExceeded(newBudget, "elecBar", monthlyCategorySpent.Electronics)
                }
                setCategoryBudgets(categoryBudgets)
                setGeneralBudget(categoryBudgets)
                present("New Electronics budget set", 1200)
            }
        }

        if (categoryBudgetType === "house") {
            if (isNaN(newBudget) || newBudget < 0) {
                present("Invalid Household budget set", 1200)
            }

            else {
                if (categoryBudgets.HouseholdBudget.timeFrame === true) {
                    categoryBudgets.HouseholdBudget.weeklyValue = Number(newBudget)
                    isExceeded(newBudget, "houseBar", weeklyCategorySpent.Household)

                }
                else {
                    categoryBudgets.HouseholdBudget.monthlyValue = Number(newBudget)
                    isExceeded(newBudget, "houseBar", monthlyCategorySpent.Household)

                }
                setCategoryBudgets(categoryBudgets)
                setGeneralBudget(categoryBudgets)
                present("New Household budget set", 1200)
            }
        }
        if (categoryBudgetType === "other") {

            if (isNaN(newBudget) || newBudget < 0) {
                present("Invalid Other budget set", 1200)
            }

            else {
                if (categoryBudgets.OtherBudget.timeFrame === true) {
                    categoryBudgets.OtherBudget.weeklyValue = Number(newBudget)
                    isExceeded(newBudget, "otherBar", weeklyCategorySpent.Other)

                }
                else { 
                    categoryBudgets.OtherBudget.monthlyValue = Number(newBudget)
                    isExceeded(newBudget, "otherBar", monthlyCategorySpent.Other)
                 }
                setCategoryBudgets(categoryBudgets)
                setGeneralBudget(categoryBudgets)
                present("New Other budget set", 1200)
            }
        }

        if (categoryBudgetType === "healthcare") {

            if (isNaN(newBudget) || newBudget < 0) {
                present("Invalid Healthcare budget set", 1200)
            }

            else {
                if (categoryBudgets.HealthcareBudget.timeFrame === true) {
                    categoryBudgets.HealthcareBudget.weeklyValue = Number(newBudget)
                    isExceeded(newBudget, "healthcareBar", weeklyCategorySpent.Healthcare)

                }
                else { 
                    categoryBudgets.HealthcareBudget.monthlyValue = Number(newBudget) 
                    isExceeded(newBudget, "healthcareBar", monthlyCategorySpent.Healthcare)
                }
                setCategoryBudgets(categoryBudgets)
                setGeneralBudget(categoryBudgets)
                present("New Healthcare budget set", 1200)
            }
        }

        if (categoryBudgetType === "hobby") {

            if (isNaN(newBudget) || newBudget < 0) {
                present("Invalid Hobby budget set", 1200)
            }

            else {
                if (categoryBudgets.HobbyBudget.timeFrame === true) {
                    categoryBudgets.HobbyBudget.weeklyValue = Number(newBudget)
                    isExceeded(newBudget, "hobbyBar", weeklyCategorySpent.Hobby)
                }
                else { 
                    categoryBudgets.HobbyBudget.monthlyValue = Number(newBudget)
                    isExceeded(newBudget, "hobbyBar", monthlyCategorySpent.Hobby)
                 }
                setCategoryBudgets(categoryBudgets)
                setGeneralBudget(categoryBudgets)
                present("New Hobby budget set", 1200)
            }
        }

        if (categoryBudgetType === "vehicle") {

            if (isNaN(newBudget) || newBudget < 0) {
                present("Invalid Vehicle budget set", 1200)
            }

            else {
                if (categoryBudgets.VehicleBudget.timeFrame === true) {
                    categoryBudgets.VehicleBudget.weeklyValue = Number(newBudget)
                    isExceeded(newBudget, "vehicleBar", weeklyCategorySpent.Vehicle)

                }
                else { 
                    categoryBudgets.VehicleBudget.monthlyValue = Number(newBudget) 
                    isExceeded(newBudget, "vehicleBar", monthlyCategorySpent.Vehicle)
                }
                setCategoryBudgets(categoryBudgets)
                setGeneralBudget(categoryBudgets)
                present("New Vehicle budget set", 1200)
            }
        }
        setProgressBars(categoryBudgets,weeklyCategorySpent,monthlyCategorySpent)
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
function setProgressBars(budgets: any, weeklyTotals: any, monthlyTotals: any) {
    const newBudgets = { FoodBudget: 0, FashionBudget: 0, ElecBudget: 0, HouseBudget: 0, OtherBudget: 0, HealthcareBudget: 0, HobbyBudget: 0, VehicleBudget: 0 }
    if (budgets.FoodBudget.timeFrame === true) {
        isExceeded(budgets.FoodBudget.weeklyValue, "foodBar", weeklyTotals.Food);
        newBudgets.FoodBudget = budgets.FoodBudget.weeklyValue

    }
    else {
        isExceeded(budgets.FoodBudget.monthlyValue, "foodBar", monthlyTotals.Food);
        newBudgets.FoodBudget = budgets.FoodBudget.monthlyValue
    }

    if (budgets.ElectronicsBudget.timeFrame === true) {
        isExceeded(budgets.ElectronicsBudget.weeklyValue, "elecBar", weeklyTotals.Electronics);
        newBudgets.ElecBudget = budgets.ElectronicsBudget.weeklyValue
    }
    else {
        isExceeded(budgets.ElectronicsBudget.monthlyValue, "elecBar", monthlyTotals.Electronics);
        newBudgets.ElecBudget = budgets.ElectronicsBudget.monthlyValue

    }

    if (budgets.FashionBudget.timeFrame === true) {
        isExceeded(budgets.FashionBudget.weeklyValue, "fashionBar", weeklyTotals.Fashion);
        newBudgets.FashionBudget = budgets.FashionBudget.weeklyValue

    }
    else {
        isExceeded(budgets.FashionBudget.monthlyValue, "fashionBar", monthlyTotals.Fashion);
        newBudgets.FashionBudget = budgets.FashionBudget.monthlyValue

    }

    if (budgets.HouseholdBudget.timeFrame === true) {
        isExceeded(budgets.HouseholdBudget.weeklyValue, "houseBar", weeklyTotals.Household);
        newBudgets.HouseBudget = budgets.HouseholdBudget.weeklyValue

    }
    else {
        isExceeded(budgets.HouseholdBudget.monthlyValue, "houseBar", monthlyTotals.Household);
        newBudgets.HouseBudget = budgets.HouseholdBudget.monthlyValue

    }

    if (budgets.OtherBudget.timeFrame === true) {
        isExceeded(budgets.OtherBudget.weeklyValue, "otherBar", weeklyTotals.Other);
        newBudgets.OtherBudget = budgets.OtherBudget.weeklyValue

    }
    else {
        isExceeded(budgets.OtherBudget.monthlyValue, "otherBar", monthlyTotals.Other);
        newBudgets.OtherBudget = budgets.OtherBudget.monthlyValue

    }

    if (budgets.HealthcareBudget.timeFrame === true) {
        isExceeded(budgets.HealthcareBudget.weeklyValue, "healthcareBar", weeklyTotals.Healthcare);
        newBudgets.HealthcareBudget = budgets.HealthcareBudget.weeklyValue


    }
    else {
        isExceeded(budgets.HealthcareBudget.monthlyValue, "healthcareBar", monthlyTotals.Healthcare);
        newBudgets.HealthcareBudget = budgets.HealthcareBudget.monthlyValue
    }

    if (budgets.VehicleBudget.timeFrame === true) {
        isExceeded(budgets.VehicleBudget.weeklyValue, "vehicleBar", weeklyTotals.Vehicle);
        newBudgets.VehicleBudget = budgets.VehicleBudget.weeklyValue
    }
    else {
        isExceeded(budgets.VehicleBudget.monthlyValue, "vehicleBar", monthlyTotals.Vehicle);
        newBudgets.VehicleBudget = budgets.VehicleBudget.monthlyValue
    }

    if (budgets.HobbyBudget.timeFrame === true) {
        isExceeded(budgets.HobbyBudget.weeklyValue, "hobbyBar", weeklyTotals.Hobby);
        newBudgets.HobbyBudget = budgets.HobbyBudget.weeklyValue
    }
    else {
        isExceeded(budgets.HobbyBudget.monthlyValue, "hobbyBar", monthlyTotals.Hobby);
        newBudgets.HobbyBudget = budgets.HobbyBudget.monthlyValue
    }

    globalSetRenderedBudgets(newBudgets)

}

export function updateBudgets() {
    getProfileData()
        .then(
            apiResponse => {
                if (typeof (apiResponse.data) !== "string") {
                    globalCategoryBudgets = apiResponse.data.otherBudgets.budgets.budgets;
                    setProgressBars(apiResponse.data.otherBudgets.budgets.budgets, apiResponse.data.otherBudgets.weeklyTotal, apiResponse.data.otherBudgets.monthlyTotal)
                }
            })
}
export default Budget;