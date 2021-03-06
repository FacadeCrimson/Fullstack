import React, { useEffect} from 'react';
import {Kepler} from './Kepler';
import {customize} from './KeplerLoadData';
import {IonButton, IonItem, IonIcon, IonItemDivider} from '@ionic/react';
import {KeplerGlSchema,resetMapConfig} from 'kepler.gl';
import {downloadJsonFile} from './Function'
import {helpCircleOutline} from 'ionicons/icons'
import ReactFileReader from 'react-file-reader';
import { Store } from 'redux';

interface ContainerProps1 {
    store:Store;
    data: string;
    conf:object;
}

export const EmbeddedMap: React.FC<ContainerProps1> = ({store,data,conf}) => {
    useEffect(()=>{
        customize(store,data,conf);
        return function cleanup() {
          store.dispatch(resetMapConfig())
        };
    })

    return (<div id="keplermap"><Kepler></Kepler></div>);
};

interface ContainerProps2 {
  store:Store;
  name:string;
}

export const SaveConfigButton: React.FC<ContainerProps2> = ({store,name}) => {
    const handleSave = async ()=>{
        const newConfig = KeplerGlSchema.getConfigToSave(store.getState().keplerGl.map)
        const url = process.env.REACT_APP_BACKEND+'/uploadconfig'
        let fd = new FormData()
        fd.append('name', name)
        fd.append('type', "config")
        fd.append('file', JSON.stringify(newConfig))
        await fetch(url, {
        method: 'POST',
        body: fd
        })
    }

    const handleMouseOver=()=>{
        const info = document.getElementById("configsave")
        if(info){
          info.style.display="block"
        }
    }

    const handleMouseLeave=()=>{
      const info = document.getElementById("configsave")
      if(info){
        info.style.display="none"
      }
  }

    return <>
           <IonItem>
            <IonButton onClick={handleSave}>Save Config</IonButton>
            <IonIcon icon={helpCircleOutline} slot="end" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}></IonIcon>
          </IonItem>
          <IonItemDivider id="configsave" style={{display:"none",}}>save the configuration file of left map to server, so next time it will open at its current state</IonItemDivider>

          </>
           
  }
  
export const DownloadConfigButton: React.FC<ContainerProps2> = ({store,name}) => {
    const handleDownload = ()=>{
         const mapConfig = KeplerGlSchema.getConfigToSave(store.getState().keplerGl.map)
         downloadJsonFile(mapConfig, name+'.json');
    }

    const handleMouseOver=()=>{
      const info = document.getElementById("configdownload")
      if(info){
        info.style.display="block"
      }
  }
  const handleMouseLeave=()=>{
    const info = document.getElementById("configdownload")
    if(info){
      info.style.display="none"
    }
}
    return <>
          <IonItem>
            <IonButton onClick={handleDownload}>Download Config</IonButton>
            <IonIcon icon={helpCircleOutline} slot="end" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}></IonIcon>
          </IonItem>
          <IonItemDivider id="configdownload" style={{display:"none",}}>download the configuration file of left map to local</IonItemDivider>
         </>
  }

interface ContainerProps3 {
  name:string;
}

export const UploadConfigButton: React.FC<ContainerProps3> = ({name}) => {
    const handleUpload = async (files:any)=>{
         const url = process.env.REACT_APP_BACKEND+'/uploadconfig'
         let reader = new FileReader();
        reader.onload = async function() {
          let fd = new FormData()
          fd.append('name', name)
          fd.append('type', "config")
          fd.append('file', reader.result as string)
          await fetch(url, {
          method: 'POST',
          body: fd
          })         
        }
        if(files[0]){
          reader.readAsText(files[0]);
        }
        else{
          return
        }
        
    }

    const handleMouseOver=()=>{
      const info = document.getElementById("configupload")
      if(info){
        info.style.display="block"
      }
    }
      const handleMouseLeave=()=>{
        const info = document.getElementById("configupload")
        if(info){
          info.style.display="none"
        }
    }
    return <>
            <IonItem>
                <ReactFileReader handleFiles={handleUpload} fileTypes={'.json'}>
                  <IonButton onClick={handleUpload}>Upload Config</IonButton>
                </ReactFileReader>

              <IonIcon icon={helpCircleOutline} slot="end" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}></IonIcon>
            </IonItem>
            <IonItemDivider id="configupload" style={{display:"none",}}>upload the configuration file from local to server, it has to be the same name as the data file</IonItemDivider>
         </>
  }