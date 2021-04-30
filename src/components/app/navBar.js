import React,  {useEffect} from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CompareIcon from '@material-ui/icons/Compare';
import ConnectedIcon from '@material-ui/icons/Email';
import Slide from '@material-ui/core/Slide';
import { useHistory, useLocation} from "react-router-dom";
import {ReactComponent as MultitudLogo} from '../../assets/multitudLandscape.svg';
import Fade from '@material-ui/core/Fade';
import Popover from '@material-ui/core/Popover';
import ProfilePreview from '../profile/profilePreview';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import CompareSegments from './compareSegments';
import Typography from '@material-ui/core/Typography';
import { trackTabNavigation } from '../../trackers/appEventTracker.js';
import MailChimpModal from '../datavisuals/mailchimpModal';

const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: 250,
    alignItems : 'center',
    borderRightStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.divider,
  },
  iconStyle:{
    width: '70%', 
    height : 'auto', 
    marginBottom : '3rem',
    marginTop : '1.7rem',
    //margin: '1rem'
  },
  appBarStyle:{
    padding : 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  tabsStyle: {
    flexGrow: 1,
    margin : 0,
    height : '100%',
  },
  tabStyle:{
    fontSize : '0.8rem',
    minWidth : '0.5rem',
    marginRight : '0.6rem',
    width : 'auto',
  },
  bottomMenu:{
    flexGrow: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'flex-end',
    paddingBottom: '2rem',
  }, 
  buttonStyle:{
    width: "100%",
    marginTop: '0.5rem', 
   // marginLeft: '0.5rem',
    //marginRight: '0.5rem',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: '#241C15',
    backgroundColor: '#FFE01B',
    '&:hover': {
      backgroundColor:'#FFEE2B',
    },
  },
}))(Button);



export default function NavBar({getAnalysis, 
                                analysis, 
                                profile, 
                                navBarHeight='3rem', 
                                clearCookie, 
                                currentAnalysis=null, 
                                isBusy=false, 
                                authEmailMarketing,
                                sendEmailCampaign,
                                getEmailCampaigns,
                                emailCampaignBusy,
                                emailCampaigns,
                                emailLists}){
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const routeHistory = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [openEmailModal, setEmailOpenModal] = React.useState(false);
  const [reloaddMenu, setReloadMenu] = React.useState(false);
  const location = useLocation();

  const analysisUrls = Array.isArray(analysis) ? analysis.map((item,i) => item.analysisName) : null;
  const activeUrlIndex = Array.isArray(analysisUrls) ?analysisUrls.findIndex(item=> location.pathname===item) : -1;

  const mailChimpConnected = profile && profile.status && profile.status.MailChimpState == 'connected';
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getAnalysis();
    return () => {

    };
  }, []);

  useEffect(() => {
    if(!isBusy){
      setReloadMenu(false);
    }
    return () => {

    };
  }, [isBusy]);

  const topFeatures = Array.isArray(analysis)? analysis.filter(item => item.analysisCategory === "EXTERNAL_UNSUPERVISED" || item.analysisType === "PRODUCT_SEGMENT") : [];
  const bottomFeatures = Array.isArray(analysis)? analysis.filter(item => item.analysisCategory === "INTERNAL_SUPERVISED" && item.analysisType !== "PRODUCT_SEGMENT") : [];

  useEffect(() => { 
    if (Array.isArray(analysis) && analysis.length > 0 ){
      setValue(0);

      var defaultRoute = true;
      
      if(Array.isArray(analysisUrls)){
        if(activeUrlIndex >= 0){
          routeHistory.push('/'+ analysisUrls[activeUrlIndex]);
          setValue(activeUrlIndex);
          defaultRoute = false;
        }
      }
      if(topFeatures[0] && topFeatures[0].analysisName && defaultRoute)
        routeHistory.push('/'+ topFeatures[0].analysisName);
    }
    return () => {

    };
  }, [analysis]);

  //const tabsValues = []
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  if(activeUrlIndex >= 0 && value !== activeUrlIndex){
    setValue(activeUrlIndex);
  }
    

  return(
    <Slide direction="right" in={true} mountOnEnter unmountOnExit {...{ timeout: 800 }}>
      <div className={classes.root} >

        <MultitudLogo className={classes.iconStyle}/>

        {(Array.isArray(topFeatures) && topFeatures.length > 0) && !reloaddMenu ? 
          <Fade in={true} {...{ timeout: 1200 }}>
            <List 
            component="nav" 
            aria-label="menu list"
            style={{width: '100%'}}
            >
                {

                  topFeatures.map((item, i) => 
                    <ListItem
                      button
                      key={i}
                      selected={value === i}
                      color="primary"
                      style={{paddingLeft : 30}}
                      onClick={()=>{
                        setValue(i)
                        trackTabNavigation(item.analysisName);
                        routeHistory.push('/'+ item.analysisName)}}
                    >
                      <ListItemText primary={item.analysisName} />
                    </ListItem>)
                    
                }
                <Divider style={{marginTop: '1rem', marginBottom : '1rem'}} />
                <Typography color="textSecondary" variant="subtitle2" align="left" style={{marginLeft: 30, marginBottom: '1rem', marginTop: '2rem'}}>SEGMENTS</Typography>
                {
                  bottomFeatures.map((item, i) => 
                    <ListItem
                      button
                      key={i}
                      selected={value === topFeatures.length + i}
                      color="primary"
                      style={{paddingLeft : 30}}
                      onClick={()=>{
                        setValue(topFeatures.length + i)
                        trackTabNavigation(item.analysisName);
                        routeHistory.push('/'+ item.analysisName)}}
                    >
                      {item.isBusy ? <CircularProgress style={{}} />  : null}
                      <ListItemText primary={item.analysisName} />
                    </ListItem>)
                }

            </List>

          </Fade>
          : <div style={{flexGrow : 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}> <CircularProgress style={{ marginTop: '2rem'}} /> </div>}

        <div className={classes.bottomMenu}>
          {profile.status.isMailChimpTargeted ? 
            <React.Fragment>
            {mailChimpConnected ?
              <ColorButton 
                  color="primary"
                  onClick={()=>{
                    setEmailOpenModal(true)
                  }}
                  variant="outlined"
                  startIcon={<ConnectedIcon />}
                  className={classes.buttonStyle}
                  disabled={!Array.isArray(analysis)}
                >
                  Email Campaign
              </ColorButton>
              :
              <ColorButton 
                  color="primary"
                  onClick={()=>{

                    authEmailMarketing(profile.name, profile.organization.organizationName)
                  // setEmailOpenModal(true)
                  }}
                  variant="outlined"
                  // startIcon={<CompareIcon />}
                  className={classes.buttonStyle}
                  disabled={!Array.isArray(analysis)}
                >
                  MailChimp Login
              </ColorButton>
            }
            <Modal
                className={classes.modal}
                open={openEmailModal}
                onClose={()=>{setEmailOpenModal(false)}}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500}}
            >
                <Fade in={openModal}>
                    <MailChimpModal 
                      // subSegment={segmentLabel}
                      // profile={profile}
                      analysisItems={bottomFeatures}
                      sendEmailCampaign={sendEmailCampaign}
                      getEmailCampaigns={getEmailCampaigns}
                      emailCampaignBusy={emailCampaignBusy}
                      emailCampaigns={emailCampaigns}
                      emailLists={emailLists}
                        onClose={success=> {
                          setEmailOpenModal(false)
                            if(success){
                                // setReloadMenu(true);
                                // getAnalysis();
                            }
                        }}
                    />
                </Fade>
            </Modal>
          </React.Fragment>
          :null}
          <Button
              onClick={()=>{setOpenModal(true)}}
              variant="contained"
              color="primary"
              startIcon={<CompareIcon />}
              className={classes.buttonStyle}
              disabled={!Array.isArray(analysis)}
            >
              Compare Segments
          </Button>
          <Button
              onClick={handleClick}
              variant="outlined"
              //color="inherit"
              startIcon={<AccountCircle />}
              className={classes.buttonStyle}
            >
              {profile.name}
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <ProfilePreview profile={profile} clearCookie={clearCookie}/>
          </Popover>
          <Modal
            className={classes.modal}
            open={openModal}
            onClose={()=>{setOpenModal(false)}}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <CompareSegments analysisItems={bottomFeatures} onClose={success=>{
                setOpenModal(false)
                  if(success){
                    setReloadMenu(true);
                    getAnalysis();
                  }
                }} />
            </Fade>
          </Modal>
        </div>


      </div>
    </Slide>
  )

}