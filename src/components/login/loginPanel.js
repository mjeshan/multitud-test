import '../../styles/LoginPanel.css';
import React from 'react';
import {baseURL} from '../../request/config';
import {ReactComponent as MultitudLogo} from '../../assets/multitudPortrait.svg';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { trackSignInOrOut } from '../../trackers/appEventTracker';

export default function LoginPanel(props){
  return(
    <div style={{
      width: '100%',
      height: '100%',
      display : 'flex',
      flexDirection : 'column',
      alignItems : 'center',
      alignContent : 'center',
      justifyContent : 'center',
      position: 'absolute',
      top : 0,
      left : 0,
    }}>
      <MultitudLogo  style={{width: '17%', height : 'auto'}}/>
      <Button onClick={ () => {
          trackSignInOrOut('sign in')
        }} 
        size="large" variant="contained" style={{
        backgroundColor : '#ffab40', 
        marginTop : '4%', 
        width : '15%', 
        padding : 15, 
        marginBottom : '4%'}} 
        href={baseURL + "login"}
        disableElevation>
        <Typography variant="subtitle1" style={{    
          fontSize : '1rem',
          fontWeight : 500,}}>Sign In</Typography>
      </Button>
    </div>)
}