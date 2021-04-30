import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { blueGrey, red, pink, purple, deepPurple, indigo, blue, 
  lightBlue, cyan, teal, green, lightGreen, lime,
   yellow, amber, orange, deepOrange,grey  } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import * as layoutStyles from '../../styles/layoutStyles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  container:{
    backgroundColor : theme.palette.background.paper,
  },
  rowContainerNoWrap: {
    ...layoutStyles.rowContainerNoWrap,
    alignItems : 'center',
  },
  fabContainer:{
    flexGrow: 1,
    display : 'flex',
    justifyContent: 'flex-end',
    height : '100%',
    //width : '100%',
    paddingRight : 80,
  },
  sectionTitle:{
    'fontSize' : 24,
    //marginBottom : 15,
    //paddingBottom : 15,
    width : 'auto',
    height: 'auto',
    align: 'center',
  },
  divierStyle:{

    marginTop : 0,
  },
  button: {
    marginLeft: 25,
  },
  backButton:{
   // marginTop : 25,
    marginRight : 15,
  },
  textFieldStyle:{
    minWidth : 300,
    width : '30%',
    height : '100%',
    margin : 0,
  },
}));

const CustomeTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: grey[500],
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: grey[500],
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: grey[500],
      },
    },
  },
})(TextField);
/*
=======Buttons Input Model=====
 buttons = [
  { label: "",
    color : "primary" / "secondary",
    icon : <icon>,
    action : ()=>{},
  }
]
backButton = {action}
*/
export default function SectionHeader({title, 
  marginTop=0, marginBottom=0, buttons, 
  backButtonAction, prefixItems, appendingItems, 
  isMainTitle=false, backgroundImage=null, 
  isPaper=false, fab=null, onTitleChange=null,
  disableControls=false,}){
  const classes = useStyles();

  return(
    <div className={isPaper ? classes.container : null} style={{width : isMainTitle ? "100%" : "95%", "text-align": "left",  marginBottom :marginBottom, backgroundImage:backgroundImage, }} >
      <div className={classes.rowContainerNoWrap} style={{"marginTop" : marginTop,  marginLeft : isMainTitle ? 25 : 50, paddingTop : 5, paddingBottom : 7,}}>
          {backButtonAction ? 
            <IconButton aria-label="back" className={classes.backButton} size="large" onClick={backButtonAction}>
              <BackIcon fontSize="inherit" />
            </IconButton>
          : null}
          {prefixItems ? prefixItems : null}
          {onTitleChange ?
           <CustomeTextField 
            className={classes.textFieldStyle} 
            required
            disabled={disableControls}
            variant="filled" 
            label={"New Analysis Name"} 
            defaultValue={title} 
            onChange={event => {onTitleChange(event.target.value)}}
            error={title === "" || title === null || title === undefined}
            helperText={title === "" || title === null || title === undefined ? "Cannot be empty!" : null} />
        
          :<Typography variant={isMainTitle ? "h6" : "h5"} className={classes.sectionTitle} color="textSecondary" >
            {title} 
          </Typography>}
          {appendingItems ? appendingItems : null}
          {Array.isArray(buttons) ?  
            buttons.map((button, i) => {
              return(
                <Button
                  variant="contained"
                  color={button.color ? button.color : "primary"}
                  size="medium"
                  className={classes.button}
                  startIcon={button.icon ? button.icon : null}
                  onClick={button.action ? button.action : ()=>{}}
                  key={i}>
                    {button.label ? button.label : ""}
                </Button>
              )
            })
          :null}
          {fab ? 
            <div className={classes.fabContainer}>
              {fab}
            </div>
          :null}
      </div>
      <Divider className={classes.divierStyle} style={{ marginLeft : isMainTitle? 10 : 55, marginRight: isMainTitle? 5 : 0}}/>
    </div>
  )
}