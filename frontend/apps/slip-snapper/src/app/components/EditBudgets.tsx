import {
  IonButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCheckbox,
  IonList,
  IonToggle
} from "@ionic/react";
import React, { useEffect, useState } from 'react';
import { getProfileData, setGeneralBudget } from '../../api/apiCall';
import { updateBudgets, globalCategoryBudgets } from './Budget';


export const EditBudgets = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [food, setFood] = useState(false);
  const [fashion, setFashion] = useState(false);
  const [electronics, setElectronics] = useState(false);
  const [household, setHousehold] = useState(false);
  const [other, setOther] = useState(false);
  const [hobby, setHobby] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [healthcare, setHealthcare] = useState(false);


  const categoryStates = [
    { name: 'Food', isActive: food, id: "foodBudget" },
    { name: 'Fashion', isActive: fashion, id: "fashionBudget" },
    { name: 'Electronics', isActive: electronics, id: "electronicsBudget" },
    { name: 'Household', isActive: household, id: "houseBudget" },
    { name: 'Other', isActive: other, id: "otherBudget" },
    { name: 'Hobby', isActive: hobby, id: "hobbyBudget" },
    { name: 'Health', isActive: healthcare, id: "healthcareBudget" },
    { name: 'Vehicle', isActive: vehicle, id: "vehicleBudget" }
   
  ];


  const [foodInterval, setFoodInterval] = useState(false);
  const [fashionInterval, setFashionInterval] = useState(false);
  const [electronicsInterval, setElectronicsInterval] = useState(false);
  const [householdInterval, setHouseholdInterval] = useState(false);
  const [otherInterval, setOtherInterval] = useState(false);
  const [hobbyInterval, setHobbyInterval] = useState(false);
  const [vehicleInterval, setVehicleInterval] = useState(false);
  const [healthcareInterval, setHealthcareInterval] = useState(false);


  //true for weekly
  //false for monthly
  const budgetIntervals = [
    { name: 'Food', weekly: foodInterval, id: "foodInterval" },
    { name: 'Fashion', weekly: fashionInterval, id: "fashionInterval" },
    { name: 'Electronics', weekly: electronicsInterval, id: "electronicsInterval" },
    { name: 'Household', weekly: householdInterval, id: "houseInterval" },
    { name: 'Other', weekly: otherInterval, id: "otherInterval" },
    { name: 'Hobby', weekly: hobbyInterval, id: "hobbyInterval" },
    { name: 'Healthcare', weekly: healthcareInterval, id: "healthcareInterval" },
    { name: 'Vehicle', weekly: vehicleInterval, id: "vehicleInterval" },
   

  ];

  const [budgetObject, setBudgetObject] = useState<any>([])

  useEffect(() => {
    getProfileData()
      .then(
        apiResponse => {
          if (typeof (apiResponse.data) !== "string") {
            setBudgetObject(apiResponse.data.otherBudgets?.budgets.budgets)
            initializeStates(apiResponse.data.otherBudgets?.budgets.budgets, categoryStates)
            hideData(categoryStates)
          }
        })
  }, []);


  return (
    <IonItem color="primary">
      <IonButton fill="solid" slot="end" color="secondary" onClick={() => setIsOpen(true)}>Add/Remove</IonButton>
      <IonModal isOpen={isOpen} onDidDismiss={() => { setStates(budgetIntervals, categoryStates); updateBudgets(); hideData(categoryStates); setIsOpen(false) }}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Edit Budgets</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => {
                setIsOpen(false);
                hideData(categoryStates);
              }}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>

            <IonItem>
              <IonLabel>Electronics</IonLabel>
              <IonItem>
                <IonLabel>{electronicsInterval ? "Weekly" : "Monthly"}</IonLabel>
                <IonToggle checked={electronicsInterval} onClick={() => setElectronicsInterval(!electronicsInterval)} color='secondary'></IonToggle>
                <IonCheckbox slot="end" checked={electronics} onIonChange={e => setElectronics(e.detail.checked)} />
              </IonItem>
            </IonItem>

            <IonItem>
              <IonLabel>Fashion</IonLabel>
              <IonItem>
                <IonLabel>{fashionInterval ? "Weekly" : "Monthly"}</IonLabel>
                <IonToggle checked={fashionInterval} onClick={() => setFashionInterval(!fashionInterval)} color='secondary'></IonToggle>
                <IonCheckbox slot="end" checked={fashion} onIonChange={e => setFashion(e.detail.checked)} />
              </IonItem>
            </IonItem>

            <IonItem>
              <IonLabel>Food</IonLabel>
              <IonItem>
                <IonLabel>{foodInterval ? "Weekly" : "Monthly"}</IonLabel>
                <IonToggle checked={foodInterval} onClick={() => setFoodInterval(!foodInterval)} color='secondary'></IonToggle>
                <IonCheckbox slot="end" checked={food} onIonChange={e => setFood(e.detail.checked)} />
              </IonItem>
            </IonItem>

            <IonItem>
              <IonLabel>Healthcare</IonLabel>
              <IonItem>
                <IonLabel>{healthcareInterval ? "Weekly" : "Monthly"}</IonLabel>
                <IonToggle checked={healthcareInterval} onClick={() => setHealthcareInterval(!healthcareInterval)} color='secondary'></IonToggle>
                <IonCheckbox slot="end" checked={healthcare} onIonChange={e => setHealthcare(e.detail.checked)} />
              </IonItem>
            </IonItem>

            <IonItem>
              <IonLabel>Hobby</IonLabel>
              <IonItem>
                <IonLabel>{hobbyInterval ? "Weekly" : "Monthly"}</IonLabel>
                <IonToggle checked={hobbyInterval} onClick={() => setHobbyInterval(!hobbyInterval)} color='secondary'></IonToggle>
                <IonCheckbox slot="end" checked={hobby} onIonChange={e => setHobby(e.detail.checked)} />
              </IonItem>
            </IonItem>


            <IonItem>
              <IonLabel>Household</IonLabel>
              <IonItem>
                <IonLabel>{householdInterval ? "Weekly" : "Monthly"}</IonLabel>
                <IonToggle checked={householdInterval} onClick={() => setHouseholdInterval(!householdInterval)} color='secondary'></IonToggle>
                <IonCheckbox slot="end" checked={household} onIonChange={e => setHousehold(e.detail.checked)} />
              </IonItem>
            </IonItem>

            <IonItem>
              <IonLabel>Vehicle</IonLabel>
              <IonItem>
                <IonLabel>{vehicleInterval ? "Weekly" : "Monthly"}</IonLabel>
                <IonToggle checked={vehicleInterval} onClick={() => setVehicleInterval(!vehicleInterval)} color='secondary'></IonToggle>
                <IonCheckbox slot="end" checked={vehicle} onIonChange={e => setVehicle(e.detail.checked)} />
              </IonItem>
            </IonItem>

            <IonItem>
              <IonLabel>Other</IonLabel>
              <IonItem>
                <IonLabel>{otherInterval ? "Weekly" : "Monthly"}</IonLabel>
                <IonToggle checked={otherInterval} onClick={() => setOtherInterval(!otherInterval)} color='secondary'></IonToggle>
                <IonCheckbox slot="end" checked={other} onIonChange={e => setOther(e.detail.checked)} />
              </IonItem>
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
    </IonItem>
  );

  function hideData(categoryStates: any) {
    for (let i = 0; i < categoryStates.length; i++) {
      const temp = document.getElementById(categoryStates[i].id)
      if (categoryStates[i].isActive === true) {

        if (temp !== null)
          temp.style.display = "block"
      }
      else {
        if (temp !== null)
          temp.style.display = "none"
      }
    }
  }

  function initializeStates(budgets: any, categoryStates: any) {

    categoryStates[0].isActive = budgets.FoodBudget.active
    categoryStates[1].isActive = budgets.FashionBudget.active
    categoryStates[2].isActive = budgets.ElectronicsBudget.active
    categoryStates[3].isActive = budgets.HouseholdBudget.active
    categoryStates[4].isActive = budgets.OtherBudget.active
    categoryStates[5].isActive = budgets.HobbyBudget.active
    categoryStates[6].isActive = budgets.HealthcareBudget.active
    categoryStates[7].isActive = budgets.VehicleBudget.active

    setFood(budgets.FoodBudget.active)
    setFashion(budgets.FashionBudget.active)
    setElectronics(budgets.ElectronicsBudget.active)
    setHousehold(budgets.HouseholdBudget.active)
    setOther(budgets.OtherBudget.active)
    setHobby(budgets.HobbyBudget.active)
    setHealthcare(budgets.HealthcareBudget.active)
    setVehicle(budgets.VehicleBudget.active)

    setFoodInterval(budgets.FoodBudget.timeFrame)
    setFashionInterval(budgets.FashionBudget.timeFrame)
    setElectronicsInterval(budgets.ElectronicsBudget.timeFrame)
    setHouseholdInterval(budgets.HouseholdBudget.timeFrame)
    setOtherInterval(budgets.OtherBudget.timeFrame)
    setHobbyInterval(budgets.HobbyBudget.timeFrame)
    setHealthcareInterval(budgets.HealthcareBudget.timeFrame)
    setVehicleInterval(budgets.VehicleBudget.timeFrame)
  }

  function setStates(budgetIntervals: any, categoryStates: any) {

    if (globalCategoryBudgets !== undefined) {
      globalCategoryBudgets.FoodBudget.active = categoryStates[0].isActive
      globalCategoryBudgets.FashionBudget.active = categoryStates[1].isActive
      globalCategoryBudgets.ElectronicsBudget.active = categoryStates[2].isActive
      globalCategoryBudgets.HouseholdBudget.active = categoryStates[3].isActive
      globalCategoryBudgets.OtherBudget.active = categoryStates[4].isActive
      globalCategoryBudgets.HobbyBudget.active = categoryStates[5].isActive
      globalCategoryBudgets.HealthcareBudget.active = categoryStates[6].isActive
      globalCategoryBudgets.VehicleBudget.active = categoryStates[7].isActive


      globalCategoryBudgets.FoodBudget.timeFrame = budgetIntervals[0].weekly
      globalCategoryBudgets.FashionBudget.timeFrame = budgetIntervals[1].weekly
      globalCategoryBudgets.ElectronicsBudget.timeFrame = budgetIntervals[2].weekly
      globalCategoryBudgets.HouseholdBudget.timeFrame = budgetIntervals[3].weekly
      globalCategoryBudgets.OtherBudget.timeFrame = budgetIntervals[4].weekly
      globalCategoryBudgets.HobbyBudget.timeFrame = budgetIntervals[5].weekly
      globalCategoryBudgets.HealthcareBudget.timeFrame = budgetIntervals[6].weekly
      globalCategoryBudgets.VehicleBudget.timeFrame = budgetIntervals[7].weekly
    }
    setGeneralBudget(globalCategoryBudgets)
  }

};
