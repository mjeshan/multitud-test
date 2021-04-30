import React from 'react';
import {ReactComponent as ReactLogo} from '../../assets/multitudPortrait.svg';
import '../../styles/LoginPanel.css';


export default function LoadingScreen(props){
  return(
    <div className="Panel-Container">
    <header className="App-header">
      <ReactLogo  style={{width: '17%', height : 'auto'}}/>
      <p>
          
      </p>
      <br></br>
      
    </header>
  </div>
  )

}