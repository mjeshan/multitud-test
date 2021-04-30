import { baseInstance, baseURL, clientId, configSetting, mailchimpBaseAPIGatewayUrl, mailchimpInstance} from './config';
import {getCurrentUser} from './requests';

export function getAnalysis(analysisId, href=null){
  if (analysisId){
    return baseInstance.get('alb2apigw-proxy-lm/analysis/'+ analysisId, {
      timeout: 30000,
    }, {
      timeout: 30000,
    });
  }else if(href){
    return baseInstance.get(href, {
      timeout: 30000,
    }, {
      timeout: 30000,
    });
  }else{
    return baseInstance.get('alb2apigw-proxy-lm/analysis', {
      timeout: 30000,
    }, {
      timeout: 30000,
    });
  }
}

export function postAnalysis(requestBody){
  return baseInstance.post('alb2apigw-proxy-lm/analysis',
  requestBody,
  {
    timeout: 30000,
  });
}

export function exportUserList(analysisId, segmentName) {
  let params = '?analysisId=' + analysisId + '&analysisValue=' + encodeURIComponent(segmentName) + '&analysisType=' + 'customer_segment';
  return baseInstance.get('alb2apigw-proxy-lm/export' + params, {timeout: 30000});
}

//==================================== MailChimp ====================================
// Trigger mailchimpInitialize-lm (this works)
export function triggerMailChimpAuth(userName, userGroup) {
  let target = configSetting.toUpperCase();
  let params = '?user_name=' + userName + '&user_group=' + userGroup + '&target=' + target;
  let url = mailchimpBaseAPIGatewayUrl + 'mailchimpInitialize-lm' + params;
  return fetch(url).then(res => {
    console.log("mailchimp oauth response: ", res);
    window.open(res.url, '_blank');
  }).catch(err =>{
  })
}

// Trigger mailchimpActivate-lm. 1st flow: GET campaigns and audiences. 2nd flow: Activate on sub-segment
/*export function activateMailChimp(requestType, subSegment, userName, userGroup) {
  let target = configSetting.toUpperCase();
  let params = '?user_name=' + userName + '&user_group=' + userGroup + '&target=' + target;
  params += '&request_type=' + requestType + '&sub_segment=' + encodeURIComponent(subSegment);
  return mailchimpInstance.get('mailchimpActivate-lm' + params, {
    timeout: 15000,
  }).catch(error => {
    console.log(error);
  });
}*/

export function getMailChimpCampaigns(){
  //'alb2apigw-proxy-lm/marketing/email/mailchimp/campaigns'
  return baseInstance.get('alb2apigw-proxy-lm/shopifyMarketing/email/mailchimp/campaigns', {
    timeout: 30000,
  }, {
    timeout: 30000,
  });
}

export function postMailChimpActivation(campaignId, requestBody){
  //'alb2apigw-proxy-lm/marketing/email/mailchimp/campaigns/'
  return baseInstance.post('alb2apigw-proxy-lm/shopifyMarketing/email/mailchimp/campaigns/' + campaignId,
  requestBody,
  {
    timeout: 30000,
  });
}