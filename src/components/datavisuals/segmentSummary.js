import React, { useEffect, useState } from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {openExternalUrl} from '../../utils/parsing'
import {exportUserList} from '../../request/projectRequests'
import { trackSubsegmentDownload } from '../../trackers/appEventTracker'
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    leftSection: {
        display:'flex', 
        flexDirection: 'column', 
        justifyContent: 'flexStart' 
    },
    rightSection: {
        marginLeft: '25px',
        display:'flex', 
        flexDirection: 'column', 
        width: '70%'
    },
    label: {
        display: 'flex', 
        borderRadius: '8px',  
        color: 'white', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontSize: '0.75em', 
        height: '25px',
        width: '110%'
    },
    valueText: {
        color: 'green',
        fontSize: '1.15em',
        textAlign: 'left'
    },
    description: {
        fontSize: '1em',
        textAlign: 'left',
        color: 'grey',
        display: 'flex',
        flexWrap: 'wrap',
        whiteSpace: 'pre',
    },
    details: {
        fontSize: '1em',
        color: 'grey',
        marginTop: '5px'
    },
    segmentName: {
        textAlign: 'left',
        fontSize: '1.25em'
    },
    exportButton: {
        height: '45px'
    },
    medianText: {
        fontSize: '1em',
        color: 'blue',
        textAlign: 'left',
        fontWeight: 'bold'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const makeDescription = (description) => {
    let sections = description.split('*');
    if (sections.length == 1) return <div>{description}</div>
    return sections.map((text, index) => {
        if (index % 2 == 0) return <div key={index}>{text}</div>
        return <b key={index}>{text}</b>
    })
}

export default function SegmentSummary(props){
    const {segmentInfo, colors, analysisId, profile} = props
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);

    const {segmentName, segmentLabel, segmentDetails, segmentValueRange, segmentDescription, segmentSpentValue} = segmentInfo;
    const {labelColor, rangeColor} = colors;
    const mailChimpConnected = profile && profile.status && profile.status.MailChimpState == 'connected';
    return (
        <div className={classes.root}>
            <div className={classes.leftSection}>
                <div className={classes.label} style={{backgroundColor: labelColor}}>{segmentLabel}</div>
                <div className={classes.details}>{segmentDetails}</div>
            </div>
            <div className={classes.rightSection}>
                <b className={classes.segmentName}>{segmentName}</b>
                <div className={classes.valueText} style={{color: rangeColor}}>{segmentValueRange}</div>
                <div className={classes.description}>{makeDescription(segmentDescription)}</div>
                {segmentSpentValue ? 
                    <div className={classes.medianText}>{segmentSpentValue}</div>
                    : null}
                <Button className={classes.exportButton} variant='outlined' startIcon={<CloudDownloadIcon />} size='small'
                    onClick={() => {
                        openExternalUrl(exportUserList(analysisId, segmentLabel))
                        trackSubsegmentDownload(segmentLabel)
                    } }>
                    Download This Segment
                </Button>
            </div>
        </div>
    );

}