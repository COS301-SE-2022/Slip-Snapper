import {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonMenuToggle,
    IonItem,
    IonLabel,
    IonIcon
  } from "@ionic/react";
  import React from "react";
  import {home, person, documents} from 'ionicons/icons';

  
  export const Menu = () => {
    return (
      <IonMenu side="end" contentId="main">
        <IonHeader>
          <IonToolbar color="light">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle auto-hide="false">
              <IonItem button routerLink={"/home"} routerDirection="none">
                <IonLabel>Home</IonLabel>
                <IonIcon src={home}/>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle auto-hide="false">
              <IonItem button routerLink={"/viewreports"} routerDirection="none">
                <IonLabel>Reports</IonLabel>
                <IonIcon src={documents}/>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle auto-hide="false">
              <IonItem button routerLink={"/profile"} routerDirection="none">
                <IonLabel>Profile</IonLabel>
                <IonIcon src={person}/>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
    );
  };