import { IonButton, IonMenuButton } from "@ionic/react";
import React, { useEffect } from "react";

/**
 * Implements the Burger Menu used for navigation on mobile devices
 */
export const NavButtons = () => {

  //Media Query State
  const [mQuery, setMQuery] = React.useState<any>({
    matches: window.innerWidth > 768 ? true : false,
  });

  //Update state based on screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.onchange = (e) => {
        if (e.matches) {
        setMQuery(false)
      } else {
        setMQuery(true)
      }
    }}, []);

  return (
    <div>
      {mQuery && !mQuery.matches ? (
        <IonMenuButton />
      ) : (
        <>
          {/* Burger Menu Routing */}
          <IonButton routerLink={"/home"}>Home</IonButton>
          <IonButton routerLink={"/viewreports"}>Reports</IonButton>
          <IonButton routerLink={"/profile"}>Profile</IonButton>
          <IonButton routerLink={"/receipts"}>Receipts</IonButton>
        </>
      )}
    </div>
  );
};