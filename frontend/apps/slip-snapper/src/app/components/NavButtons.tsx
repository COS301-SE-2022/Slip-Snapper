import { IonButton, IonMenuButton } from "@ionic/react";
import React, { useEffect } from "react";

export const NavButtons = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mQuery, setMQuery] = React.useState<any>({
    matches: window.innerWidth > 768 ? true : false,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);

    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  console.log(mQuery.matches);

  return (
    <div>
      {mQuery && !mQuery.matches ? (
        <IonMenuButton />
      ) : (
        <>
          <IonButton routerLink={"/home"}>Home</IonButton>
          <IonButton routerLink={"/viewreports"}>Reports</IonButton>
          <IonButton routerLink={"/profile"}>Profile</IonButton>
        </>
      )}
    </div>
  );
};