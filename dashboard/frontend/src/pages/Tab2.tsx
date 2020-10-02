import React,{useState,useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuToggle, IonChip,
  IonIcon, IonButton, IonMenu, IonList, IonListHeader, IonLabel, IonItem, IonSelect, IonSelectOption, IonSearchbar, IonPopover, IonItemDivider,
  IonRow, IonGrid, IonCol } from '@ionic/react';
import './Tab2.css';
import { menu, home, closeCircle } from 'ionicons/icons';
import {Circles,AnimatedCircles,ChartWithDimensions} from '../components/D3Explore'
import {subSubGroup} from '../components/FilterList'
import {MultiSelector} from '../components/MultiSelector'

const Tab2: React.FC = () => {
  const useShowPopover = useState(false);
  return (
  <IonPage className="ion-page" id="main-content">
        <IonMenu content-id="main-content">
            <IonHeader>
              <IonToolbar color="primary">
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonContent>
              <IonList>
                <IonListHeader>
                  Navigate
                </IonListHeader>
                <IonMenuToggle>
                  <IonItem button>
                    <IonIcon slot="start" icon={home}></IonIcon>
                    <IonLabel>
                      Home
                    </IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </IonList>
            </IonContent>
        </IonMenu>
     
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuToggle>
            <IonButton>
              <IonIcon slot="icon-only" icon={menu}></IonIcon>
            </IonButton>
          </IonMenuToggle>
        </IonButtons>
        <IonTitle>Header</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
    <IonGrid>
        <IonRow>
          <IonCol size="12"  sizeMd="3" offsetMd="1">
            <Circles></Circles>
          </IonCol>
          <IonCol size="12"  sizeMd="3" offsetMd="1">
              <AnimatedCircles></AnimatedCircles>
          </IonCol>
          <IonCol size="12"  sizeMd="3" offsetMd="1">
            <ChartWithDimensions {...chartSettings}></ChartWithDimensions>
          </IonCol>
          <IonCol size="12"  sizeMd="3" offsetMd="1">
        
          </IonCol>
        </IonRow>
      </IonGrid>
        <IonItem>Filter</IonItem>
        <IonItem>
            <IonLabel>Sub-subgroup</IonLabel>
            <IonButton slot="end" onClick={() => useShowPopover[1](true)}>&#9662;</IonButton>
        </IonItem>
        <MultiSelector data={subSubGroup} useShowPopover={useShowPopover}></MultiSelector>
    </IonContent>
  </IonPage>
  );
};

export default Tab2;


const chartSettings={
  width: 200,
  height: 200,
  marginTop: 50,
  marginRight: 50,
  marginBottom: 50,
  marginLeft: 50,
}


          // <IonSelect multiple={true} interface="popover" className="select" slot="end" value={ssg} onIonChange={e => setSsg(e.detail.value)}>