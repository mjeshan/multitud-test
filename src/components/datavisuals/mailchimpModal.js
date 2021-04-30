import React,  {useEffect, useState} from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { deepOrange } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import CompareIcon from '@material-ui/icons/Email';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    height: 'auto',
    padding: theme.spacing(7, 5, 7, 7),
  },
  titleBar:{
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 30,
  },
  inputContainer:{
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 30,
    marginRight: '2rem',
  },
  coloredLabel:{
    textAlign: 'center',
    width: 'auto',
    height: 'auto',
    borderRadius: '3px',
    color: '#FFFFFF',
    backgroundColor: "#1d4e5fff",
    padding: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));


/*
NOTE - This is the prototype MailChimp UI integration and is not complete. Modal code used CompareSegments component as reference
TODOs:
- When MailChimpModal is opened, request for audience and campaign lists by calling ‘GET' flow to mailchimpActivate-lm and populate drop down fields appropriately
  - Must call src/request/request.js activateMailChimp()
- When ‘Activate’ button is clicked in MailChimpModal, send ‘ACTIVATE’ request to mailchimpActivate-lm, passing along the appropriate query params
- Handle mailchimpActivate-lm responses and update UI accordingly
- Clean up Autocomplete props, don't need as complicated as CompareSegments (e.g. don't need combination of different segments)
*/

export default function MailChimpModal(props) {
  const classes = useStyles();
  const {profile,analysisItems, items, onClose=()=>{},getEmailCampaigns,sendEmailCampaign, emailCampaignBusy, emailCampaigns,emailLists} = props;
  const [camp, setCamp] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [groupA, setGroupA] = useState([]);
  const [listSelection, setListSelection] = useState("");
  const [success, setSuccess] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [activationState, setActivationState] = React.useState({
    checked: false,
  });

  useEffect(() => {
    getEmailCampaigns();
    return () => {

    };
  }, []);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const getOptions = options => options.map((item, i) => item.metadata.labelValues.map((val, j) => {
    return({
      groupName: item.analysisName,
      groupValue: val,
  })}) )
  
  
  const getCampaigns = camps => camps.map((item, i) => {
    return({
        groupName: item.campaignId,
        groupValue: item.title,
      }
    )
  })

  const getLists = lists => lists.map((item, i) => {
    return({
        groupName: item.id,
        groupValue: item.name,
      }
    )
  })

  const campaignOptions = Array.isArray(emailCampaigns) ? getCampaigns(emailCampaigns) : [];
  const audienceLists = Array.isArray(emailLists) ? getLists(emailLists): [];
  console.log(">>>>>>>>>>>>>> lists", audienceLists)
  const segmentOptions = Array.isArray(analysisItems) ? getOptions(analysisItems).flat(1) : [];
  const ColorButton = withStyles((theme) => ({
    root: {
      color: '#241C15',
      backgroundColor: '#FFE01B',
      '&:hover': {
        backgroundColor:'#FFEE2B',
      },
    },
  }))(Button);

  const validateSelection = selection => (selection && selection[0]) || (selection && selection !== "");


  return(
    <Paper className={classes.paper} elevation={5}>
      <div className={classes.titleBar}>
        <CompareIcon style={{marginRight: 10}} />
        <Typography color="textPrimary" variant="h5">MailChimp Campaign Activation</Typography>
      </div>

      <div className={classes.inputContainer}>
        <div style={{display: 'flex'}}>
          <div className={classes.inputContainer}>
            <Typography color="textPrimary" variant="subtitle2" style={{lineHeight : 1.1}}>Choose your target audience</Typography>
            <Autocomplete
              disabled={isBusy || emailCampaignBusy}
              multiple
              id="audience"
              options={segmentOptions}
              getOptionLabel={(option) => option.groupValue}
              groupBy={(option) => option.groupName}
              defaultValue={[]}
              filterSelectedOptions
              onChange={(event, value) =>{
                if(value && value.length > 0){
                  setGroupA(value.map((item, i)=>item.groupValue));
                }
                else{
                  setGroupA([]);
                }
              }}
              style={{width : '22rem', marginTop: 5}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select your Audience Segment(s)"
                  placeholder=""
                />
              )}
            />
            <Typography color="textPrimary" variant="subtitle2" style={{lineHeight : 1.1, marginTop: 20}}>Choose a Mailchimp Email List</Typography>
            <Typography color="textSecondary" variant="body1" style={{lineHeight : 1.1, marginTop: 5, width: 340}}>Any customers in your selected segment will be added to your Mailchimp list, as long as Shopify has their permission.</Typography>
            <Autocomplete
              disabled={isBusy || emailCampaignBusy}
              id="audience"
              options={audienceLists}
              getOptionLabel={(option) => option.groupValue}
              filterSelectedOptions
              onChange={(event, value) =>{
                if(value && value.groupName){
                  setListSelection(value.groupName);
                }
                else{
                  setListSelection("");
                }
              }}
              style={{width : '22rem', marginTop: 5}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Selection required"
                  placeholder=""
                />
              )}
            />
            <Typography color="textPrimary" variant="subtitle2" style={{lineHeight : 1.1, marginTop: 20}}>Choose an existing campaign to send</Typography>
            <Autocomplete
              //multiple
              id="campaign"
              disabled={isBusy || emailCampaignBusy}
              options={campaignOptions}
              getOptionLabel={(option) => option.groupValue}
              //groupBy={(option) => option.groupName}
              //defaultValue={[]}
              filterSelectedOptions
              onChange={(event, value) =>{
                if(value && value.groupName){
                  setCamp(value.groupName);
                }
                else{
                  setCamp("");
                }
              }}
              style={{width : '22rem', marginTop: 5}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select the Email Campaign"
                  placeholder=""
                />
              )}
            />
            {/*
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={activationState.checked}
                      onChange={handleActivationChange}
                      name="checked"
                      color="primary"
                    />
                  }
                  label="Create a New Campaign"
                />
              </FormGroup>
                */}
          </div>
        </div>

      </div>
      {errMsg ? <Typography color="error" variant="body2">{errMsg}</Typography> : null}
      {isBusy || emailCampaignBusy ?
        <CircularProgress /> :

        <div className={classes.inputContainer}>
          <Snackbar open={success} autoHideDuration={3000} onClose={()=>{setSuccess(false)}}>
            <Alert onClose={()=>{setSuccess(false)}} severity="success">
              Campaign Sent!
            </Alert>
          </Snackbar>
          <Fab variant="extended" color="primary" aria-label="done" className={classes.margin} component={ColorButton} 
              onClick={()=>{
                setErrMsg(null);

                if(!validateSelection(groupA) || !validateSelection(listSelection) || !validateSelection(camp)){
                  setErrMsg("Please make sure you have filled out all the names required.");
                  return
                }
            
                var requestBody ={
                  audience: groupA,
                  listId: listSelection,
                }
                setIsBusy(true)
                sendEmailCampaign(camp, requestBody).then(res=>{
                  setIsBusy(false);
                  setSuccess(true);
                }).catch(err =>{
                  setIsBusy(false);
                });
              }}>
            <SendIcon className={classes.extendedIcon} />
              Send Campaign 
          </Fab>
          <Fab variant="outlined" aria-label="cancel" className={classes.margin} onClick={()=>{onClose()}}>
              Cancel
          </Fab>
        </div>}
    </Paper>
  )
}


