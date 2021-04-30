import axios from 'axios';
const authUrl = "https://multitud.auth.us-east-1.amazoncognito.com/logout?client_id=";
const configs = {
  prod : {url: 'https://app.multitud.ai/', clientId : 'p3c9n65b7qrs4dio2527ijkm7',},
  dev : {url: 'https://odaia-webserver-multitud-dev-lb-808684968.us-east-1.elb.amazonaws.com/', clientId: '6fm6uspug21tvfc95kdhhoq3ro'},
  demo : {url: 'https://odaia-webserver-multitud-dev-lb-808684968.us-east-1.elb.amazonaws.com/', clientId: '6fm6uspug21tvfc95kdhhoq3ro'},
}

// API Gateway url for mailchimp lambdas
const mailchimpBaseAPIGatewayUrl = "https://1qhg9q6cgl.execute-api.us-east-1.amazonaws.com/"

/*******************************
    CONFIGURATION SETTING
*********************************/
const configSetting = 'dev';
/*********************************/

const isProd = configSetting === 'prod';
const baseURL = configs[configSetting].url;
const clientId = configs[configSetting].clientId;
const logoutUrl = authUrl + clientId + "&logout_uri=" + baseURL + "index.html";

const baseInstance = axios.create({
  baseURL: baseURL,
  timeout: 300000,
  headers: {
    "Access-Control-Allow-Methods": 'POST,GET,OPTIONS',
    "Access-Control-Allow-Origin": '*'
  },
  config: {timeout: 300000, },

});

const mailchimpInstance = axios.create({
  baseURL: mailchimpBaseAPIGatewayUrl,
  timeout: 300000,
  headers: {
    "Access-Control-Allow-Methods": 'POST,GET,OPTIONS',
    "Access-Control-Allow-Origin": '*'
  },
  config: {timeout: 300000, },
});

baseInstance.defaults.timeout = 300000;
export { baseInstance, baseURL, clientId, isProd, configSetting, logoutUrl, mailchimpBaseAPIGatewayUrl, mailchimpInstance};