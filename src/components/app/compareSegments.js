import React,  {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { deepOrange } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import CompareIcon from '@material-ui/icons/Compare';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Check';
import {postAnalysis} from '../../request/projectRequests'; 
import CircularProgress from '@material-ui/core/CircularProgress';

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


export default function CompareSegments(props){
  const classes = useStyles();
  const {analysisItems, onClose=()=>{},} = props;
  const [nameComp, setNameComp] = useState("");
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [groupA, setGroupA] = useState([]);
  const [groupB, setGroupB] = useState([]);
  const [isBusy, setIsBusy] = useState(false);

  const getOptions = options => options.map((item, i) => item.metadata.labelValues.map((val, j) => {
    return({
      groupName: item.analysisName,
      groupValue: val,
  })}) )
  const onComplete = ()=>{
    setErrMsg(null);

    if(nameA === "" || nameB ==="" || nameComp===""){
      setErrMsg("Please make sure you have filled out all the names required.");
      return
    }

    if(nameA === nameB || nameB === nameComp || nameComp=== nameA){
      setErrMsg("Please make sure none of the names are repeated.");
      return
    }

    if(groupA.length === 0 || groupB.length === 0){
      setErrMsg("Please make sure segment selection is complete.");
      return    
    }

    var requestBody ={
      analysisName : nameComp,
      analysisType : 'COMPARISON_SEGMENT',
      analysisParams : {},
      data:[
        {
          name : 'groupA',
          values: groupA,
        },
        {
          name : 'groupB',
          values: groupB,
        },
      ],
    }

    setIsBusy(true)
    postAnalysis(requestBody).then(response=>{
      setIsBusy(false);
      onClose(true);
    }).catch(err =>{
      setIsBusy(false);
      onClose();
    })
  }
  const segmentOptions = Array.isArray(analysisItems) ? getOptions(analysisItems).flat(1) : [];
  // const projectId = Array.isArray(analysisItems) && analysisItems.length > 0 && analysisItems[0].projectId ? analysisItems[0].projectId : "";
  // const objectiveId = Array.isArray(analysisItems) && analysisItems.length > 0 && analysisItems[0].objectiveId ? analysisItems[0].objectiveId : "";
  return(
    <Paper className={classes.paper} elevation={5}>
      <div className={classes.titleBar}>
        <CompareIcon style={{marginRight: 10}} />
        <Typography color="textPrimary" variant="h5">Compare Customer Segments</Typography>
      </div>

      <div className={classes.inputContainer}>
        <Typography color="textPrimary" variant="subtitle2">STEP 1 - Give your comparison a name</Typography>
        <TextField
          required
          id="outlined-required"
          label="Please give this comparison a name"
          variant="outlined"
          value={nameComp}
          onChange={event=>{setNameComp(event.target.value)}}
          style={{width : '38rem'}}
        />
      </div>

      <div className={classes.inputContainer}>
        <Typography color="textPrimary" variant="subtitle2" style={{lineHeight : 1.1}}>STEP 2 - Build your Comparison Combinations</Typography>
        <Typography color="textSecondary" variant="body2" style={{fontSize: 12, marginBottom: '0.25rem'}}>Combination A vs Combination B to give your more insights.</Typography>
        <div style={{display: 'flex'}}>
          <div className={classes.inputContainer}>
            <div className={classes.coloredLabel}>
              Compare These Segments
            </div>
            <TextField
              required
              id="textfield_a"
              label="Give them a name"
              variant="outlined"
              value={nameA}
              onChange={event=>{setNameA(event.target.value)}}
              style={{width : '18rem', marginTop: 5}}
            />

            <Autocomplete
              multiple
              id="combination-a"
              options={segmentOptions}
              getOptionLabel={(option) => option.groupValue}
              groupBy={(option) => option.groupName}
              defaultValue={[]}
              filterSelectedOptions
              onChange={(event, value) =>{
                if(value.length > 0){
                  setGroupA(value.map((item, i)=>item.groupValue));
                }
                else{
                  setGroupA([]);
                }
              }}
              style={{marginTop: 10, maxWidth: '18rem'}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select from Existing Segments"
                  placeholder="Segments"
                />
              )}
            />
          </div>
          <div className={classes.inputContainer}>
            <div className={classes.coloredLabel}>
              Against These Segments
            </div>
            <TextField
              required
              id="textfield_b"
              label="Give them a name"
              variant="outlined"
              value={nameB}
              onChange={event=>{setNameB(event.target.value)}}
              style={{width : '18rem', marginTop: 5}}
            />
            <Autocomplete
              multiple
              id="combination-b"
              options={segmentOptions}
              getOptionLabel={(option) => option.groupValue}
              groupBy={(option) => option.groupName}
              defaultValue={[]}
              filterSelectedOptions
              onChange={(event, value) =>{
                if(value.length > 0){
                  setGroupB(value.map((item, i)=>item.groupValue));
                }
                else{
                  setGroupB([]);
                }
              }}
              style={{marginTop: 10, maxWidth: '18rem'}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select from Existing Segments"
                  placeholder="Segments"
                />
              )}
            />
          </div>
        </div>

      </div>
      {errMsg ? <Typography color="error" variant="body2">{errMsg}</Typography> : null}
      {isBusy ?
        <CircularProgress /> :

        <div className={classes.inputContainer}>
          <Fab variant="extended" color="primary" aria-label="done" className={classes.margin} onClick={()=>{onComplete()}}>
            <DoneIcon className={classes.extendedIcon} />
            Complete
          </Fab>
          <Fab variant="outlined" aria-label="cancel" className={classes.margin} onClick={()=>{onClose()}}>
              Cancel
          </Fab>
        </div>}
    </Paper>
  )
}


