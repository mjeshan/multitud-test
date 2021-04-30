import {getLogout, getClearCookie} from '../request/requests';
import * as requests from '../request/requests';
import * as projectRequests from '../request/projectRequests';

export function clearCookie(){
  return {
    type: 'APP_CLEAR_COOKIE',
    payload: getClearCookie(),
  }
}

export function logOut(){
  return {
    type: 'APP_LOGOUT',
    payload: getLogout(),
  }
}


export function getCurrentUser(){
  return {
    type : 'APP_GET_CURRENT_USER',
    payload : 
      requests.getCurrentUser().then(response => {
        let responseJson ={};
        try {
          responseJson = JSON.parse(response.data);
          return responseJson;
        }catch(e){
          throw new Error(e.message);
        }
      }
    ),
  }
}

export function getEULA(){
  return {
    type : 'APP_GET_EULA',
    payload : requests.getEULA().then(response => {
        let responseJson ={};
        try {
          responseJson = JSON.parse(response.data);
          return responseJson;
        }catch(e){
          throw new Error(e.message);
        }
      }
    ),
  }
}

export function signEULA(userId, userProfile){
  return{
    type : 'APP_POST_EULA',
    payload: requests.postEULA(userId, userProfile).then(response =>{
      let responseJson ={};
      try {
        responseJson = JSON.parse(response.data);

        return responseJson;
      }catch(e){
        throw new Error(e.message);
      }
    }),
  };

}

export function startInitialization(){
  return {
    type : 'APP_START_INITIALIZATION',
    payload : requests.triggerShopifyIngestion().then(response => {
        let responseJson ={};
        try {
          responseJson = JSON.parse(response.data);
          return responseJson;
        }catch(e){
          throw new Error(e.message);
        }
      }
    ),
  }
}


export function incrementInit(){
  return {
    type: 'APP_INCREMENT',
    payload: "",
  }
}


export function getAnalysis(analysisId){
  if(analysisId){
    return {
      type : 'APP_GET_ANALYSIS_ITEM',
      payload : projectRequests.getAnalysis(analysisId).then(response => {
          let responseJson ={};
          try {
            responseJson = JSON.parse(response.data);
            return responseJson;
          }catch(e){
            throw new Error(e.message);
          }
        }
      ),
    }
  }
  else{
    return {
      type : 'APP_GET_ANALYSIS',
      payload : projectRequests.getAnalysis(null).then(response => {
          let responseJson ={};
          try {
            responseJson = JSON.parse(response.data);
            return responseJson;
          }catch(e){
            throw new Error(e.message);
          }
        }
      ),
    }
  }
}

export function authEmailMarketing(userName, userGroup){
  return {
    type : 'APP_AUTH_EMAIL_MARKETING',
    payload : projectRequests.triggerMailChimpAuth(userName, userGroup).then(response => {
        let responseJson ={};
        try {
          //responseJson = JSON.parse(response.data);
          return responseJson;
        }catch(e){
          throw new Error(e.message);
        }
      }
    ),
  }
}

export function sendEmailCampaign(campaignId, segments){
  return{
    type : 'APP_POST_EMAIL_CAMPAIGN',
    payload: projectRequests.postMailChimpActivation(campaignId, segments).then(response =>{
      let responseJson ={};
      try {
        //responseJson = JSON.parse(response.data);

        return responseJson;
      }catch(e){
        throw new Error(e.message);
      }
    }),
  };
}
export function getEmailCampaigns(){
  return {
    type : 'APP_GET_EMAIL_CAMPAIGNS',
    payload : projectRequests.getMailChimpCampaigns().then(response => {
        let responseJson ={};
        try {
          responseJson = JSON.parse(response.data);
          return responseJson;
        }catch(e){
          //throw new Error(e.message);
        }
      }
    ),
  }
}