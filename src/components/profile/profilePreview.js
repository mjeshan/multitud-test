import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {logoutUrl} from '../../request/config';
import Button from '@material-ui/core/Button';
import { trackSignInOrOut } from '../../trackers/appEventTracker'

const useStyles = makeStyles(theme => ({
  container:{
    display : 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonStyle:{
    width : '80%',
    height : 'auto',
    margin :'0.5rem',
    marginBottom: '1rem',
  },
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
  },
  inline: {
    display: 'inline',
  },
}));

export default function ProfilePreview({profile, clearCookie}){
  const classes = useStyles();

  return(
    profile ?
    <div className={classes.container}>
      <List className={classes.root}>
        <ListItem alignItems="flex-start" button>
          <ListItemAvatar>
            {profile.imageUri ? 
            <Avatar alt="Profile Picture" src={profile.imageUri}/>
            :<Avatar alt="Profile Picture"><AccountCircle/></Avatar>}
          </ListItemAvatar>
          <ListItemText
            primary={profile.name}
            secondary={"Signed In"}
          />
        </ListItem>
        {/*<Divider variant="inset" component="li" />*/}
      </List>

      <Button variant="contained" className={classes.buttonStyle} color="secondary" onClick={ async()=>{
                    trackSignInOrOut('sign out')
                    await clearCookie();
                    window.location.href = logoutUrl;
                  }}>
                  Sign Out
      </Button>
    </div>
    : null
  )
}