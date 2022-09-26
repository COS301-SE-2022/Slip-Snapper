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
  import {home, person, documents, pencil} from 'ionicons/icons';

  
  export const Menu = () => {
    return (
      <IonMenu side="end" contentId="main" type="overlay" swipeGesture= {false} >
        <IonHeader>
          <IonToolbar color="primary">
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
            <IonMenuToggle auto-hide="false">
              <IonItem button routerLink={"/receipts"} routerDirection="none">
                <IonLabel>Receipts</IonLabel>
                <IonIcon src={pencil}/>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
    );
  };