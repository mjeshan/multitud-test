import ReactGA from 'react-ga';


export function initializeReactGA() {
    const trackingId = "UA-183638773-1";
    ReactGA.initialize(trackingId);
}

export function trackPrivacyAgreement(actionName) {
    ReactGA.event( {
        category: 'privacy_agreement',
        action: actionName
    })
}

export function trackTabNavigation(tabName) {
    ReactGA.event({
        category: 'tab_navigation',
        action: 'click',
        label: tabName
    });
}

export function trackSubsegmentDownload(subsegmentName) {
    ReactGA.event( {
        category: 'segment_download',
        action: 'click',
        label: subsegmentName
    })
}

export function trackSignInOrOut(value) {
    ReactGA.event( {
        category: 'sign_in_or_out',
        action: value
    })
}