import { IonButton, IonMenuButton } from "@ionic/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

/**
 * Implements the Burger Menu used for navigation on mobile devices
 */
export const NavButtons = () => {

  const history =useHistory();
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
          <IonButton  onClick={() => {history.push("/home"); window.location.reload() }}>Home</IonButton>
          <IonButton  onClick={() => {history.push("/viewreports"); window.location.reload()}}>Reports</IonButton>
          <IonButton onClick={() => {history.push("/profile"); window.location.reload()} }>Profile</IonButton>
          <IonButton  onClick={() => {history.push("/receipts"); window.location.reload()} }>Receipts</IonButton>
        </>
      )}
    </div>
  );
};