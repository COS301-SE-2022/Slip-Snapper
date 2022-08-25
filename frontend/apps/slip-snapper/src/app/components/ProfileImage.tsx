import {
  IonButton,
  IonButtons,
  IonItem,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonRadioGroup,
  IonRadio,
  IonIcon,
  IonFab,
  IonFabButton
} from "@ionic/react";
import { pencil } from "ionicons/icons";
import React, { useEffect, useState } from 'react';


export const ProfileImage = () => {
  const [isOpen, setIsOpen] = useState(false);



  return (
    <div color="primary">
        <IonItem color="primary">
            {/*eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
            <img  className="profilePhoto" src="..\assets\mock-images\profile-picture-sample.jpg" alt="profile-picture"/>
            <IonFab className="profile-photo-fab" horizontal="end" vertical="bottom">
                <IonFabButton onClick={() => setIsOpen(true)} color="secondary" size="small">
                    <IonIcon src={pencil} size="small"/>
                </IonFabButton>
            </IonFab>
        </IonItem>
      
      <IonModal isOpen={isOpen} onDidDismiss={() => { setIsOpen(false) }}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Edit Profile Picture</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => {
                setIsOpen(false);
              }}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonRadioGroup>
            <IonGrid>
            <IonRow>
                <IonCol>
                    <IonItem>
                        {/*eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
                        <img  src="..\assets\mock-images\profile-picture-sample.jpg" alt="profile-picture"/>
                        <IonRadio slot="end"/>
                    </IonItem>
                </IonCol>
                <IonCol>
                <IonItem>
                        {/*eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
                        <img  src="..\assets\mock-images\profile-picture-sample.jpg" alt="profile-picture"/>
                        <IonRadio slot="end"/>
                    </IonItem>
                </IonCol>
                <IonCol>
                <IonItem>
                        {/*eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
                        <img  src="..\assets\mock-images\profile-picture-sample.jpg" alt="profile-picture"/>
                        <IonRadio slot="end"/>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                <IonItem>
                        {/*eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
                        <img  src="..\assets\mock-images\profile-picture-sample.jpg" alt="profile-picture"/>
                        <IonRadio slot="end"/>
                    </IonItem>
                </IonCol>
                <IonCol>
                <IonItem>
                        {/*eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
                        <img  src="..\assets\mock-images\profile-picture-sample.jpg" alt="profile-picture"/>
                        <IonRadio slot="end"/>
                    </IonItem>
                </IonCol>
                <IonCol>
                <IonItem>
                        {/*eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
                        <img  src="..\assets\mock-images\profile-picture-sample.jpg" alt="profile-picture"/>
                        <IonRadio slot="end"/>
                    </IonItem>
                </IonCol>
            </IonRow>
          </IonGrid>

            </IonRadioGroup>
        </IonContent>
      </IonModal>
    </div>
  );
};
