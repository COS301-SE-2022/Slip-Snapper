import {
    IonAlert,
    IonIcon,
    IonItem,
    IonProgressBar,
    IonText
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
            <IonItem id="foodBudget" className="center-items" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setFood(true)}/>
                <IonText>{"Food: R"+amounts[0]}</IonText>
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
                            applyToBudget(alertData.food,0);
                            isExceeded(parseFloat(alertData.food),"foodBar")
                        }
                    }]}></IonAlert>

            <IonItem id="fashionBudget" className="center-items" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setFashion(true)}/>
                <IonText>{"Fashion: R" + amounts[1]}</IonText>
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
                            applyToBudget(alertData.food, 1);
                            isExceeded(parseFloat(alertData.food), "fashionBar")
                        }
                    }]}></IonAlert>

            <IonItem id="electronicsBudget" className="center-items" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setElec(true)}/>
                <IonText>{"Electronics: R" + amounts[2]}</IonText>
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
                            applyToBudget(alertData.food, 2);
                            isExceeded(parseFloat(alertData.food), "elecBar")
                        }
                    }]}></IonAlert>

            <IonItem id="houseBudget" className="center-items" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setHouseHold(true)}/>
                <IonText>{"Household: R" + amounts[3]}</IonText>
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
                            applyToBudget(alertData.food, 3);
                            isExceeded(parseFloat(alertData.food), "houseBar")
                        }
                    }]}></IonAlert>

            <IonItem id="otherBudget" className="center-items" color="tertiary">
                <IonIcon className="edit-budget" src={create} onClick={() => setOther(true)}/> 
                <IonText>{"Other: R" + amounts[4]}</IonText>
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