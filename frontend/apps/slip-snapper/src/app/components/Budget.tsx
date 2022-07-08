import {
    IonAlert,
    IonButton,
    IonFab,
    IonIcon,
    IonInput,
    IonItem,
    IonProgressBar,
} from "@ionic/react";
import { useState } from "react";
import '../theme/profile.css';
import { create } from 'ionicons/icons'


function Budget() {
    const [food, setFood] = useState(false);
    const [fashion, setFashion] = useState(false);
    const [elec, setElec] = useState(false);
    const [houseHold, setHouseHold] = useState(false);
    const [other, setOther] = useState(false);
    const [amounts, setAmounts] = useState<string[]>(["100", "200", "300", "400", "500"]);
    const totalSpent = 88;

    return (
        <div>
            <IonItem onClick={() => setFood(true)} id="foodBudget" className="dynamic-items" color="tertiary">
                <IonIcon className="edit-budget" src={create}/>
                <IonInput readonly value={"Food: R"+amounts[0]}></IonInput>
                <IonProgressBar id='foodBar' class='progressBar'></IonProgressBar><br />
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
                            applyToBudget(alertData.food,0);
                            isExceeded(parseFloat(alertData.food),"foodBar")
                        }
                    }]}></IonAlert>

            <IonItem onClick={() => setFashion(true)} id="fashionBudget" className="dynamic-items" color="tertiary">
                <IonIcon className="edit-budget" src={create}/>
                <IonInput readonly value={"Fashion: R" + amounts[1]}></IonInput>
                <IonProgressBar id='fashionBar' class='progressBar'></IonProgressBar><br />
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
                            applyToBudget(alertData.food, 1);
                            isExceeded(parseFloat(alertData.food), "fashionBar")
                        }
                    }]}></IonAlert>

            <IonItem onClick={() => setElec(true)} id="electronicsBudget" className="dynamic-items" color="tertiary">
                <IonIcon className="edit-budget" src={create}/>
                <IonInput readonly value={"Electronics: R" + amounts[2]}></IonInput>
                <IonProgressBar id='elecBar' class='progressBar'></IonProgressBar><br />
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
                            applyToBudget(alertData.food, 2);
                            isExceeded(parseFloat(alertData.food), "elecBar")
                        }
                    }]}></IonAlert>

            <IonItem onClick={() => setHouseHold(true)} id="houseBudget" className="dynamic-items" color="tertiary">
                <IonIcon className="edit-budget" src={create}/>
                <IonInput readonly value={"Household: R" + amounts[3]}></IonInput>
                <IonProgressBar id='houseBar' class='progressBar'></IonProgressBar><br />
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
                            applyToBudget(alertData.food, 3);
                            isExceeded(parseFloat(alertData.food), "houseBar")
                        }
                    }]}></IonAlert>

            <IonItem onClick={() => setOther(true)} id="otherBudget" className="dynamic-items" color="tertiary">
                <IonIcon className="edit-budget" src={create}/> 
                <IonInput readonly value={"Other: R" + amounts[4]}></IonInput>
                <IonProgressBar id='otherBar' class='progressBar'></IonProgressBar><br />
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
                            applyToBudget(alertData.food, 4);
                            isExceeded(parseFloat(alertData.food), "otherBar")
                        }
                    }]}></IonAlert>
        </div>
    );

    function applyToBudget(newValue: string ,pos:number) {
        const val = parseFloat(newValue)

        if (!isNaN(val)) {
            amounts[pos]=val.toString()
            setAmounts(amounts)
        }
    }

  
    function isExceeded(budget:number,barID:string) {
        
        const withinBudget = totalSpent / budget

        if (totalSpent >= budget && !isNaN(budget)) {
            document.getElementById(barID)?.setAttribute("color", "danger")
        }
        else if (totalSpent >= budget / 2 && !isNaN(budget)) {
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