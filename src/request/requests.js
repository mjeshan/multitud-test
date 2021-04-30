import {
  baseInstance,
  baseURL,
  clientId,
  configSetting,
  mailchimpBaseAPIGatewayUrl,
  mailchimpInstance,
} from "./config";
import axios from "axios";

function getPreflight() {
  return baseInstance
    .get("preflight")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

function getClearCookie() {
  return baseInstance
    .get("alb2apigw-proxy-lm/logout")
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

function getLogout() {
  return axios.get("https://odaia.auth.us-east-1.amazoncognito.com/logout", {
    params: {
      client_id: clientId,
      logout_uri: baseURL + "index.html",
    },
  });
}

function getLogin() {
  return baseInstance
    .get("login")
    .then((response) => {
      console.log(response.data);
      throw new Error("Most likely hitting login page return");
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 404) {
          console.log("Received 404 on login request, consider it success!");
          return;
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        console.log(error.message);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      throw error;
    });
}

function getCurrentUser() {
  return baseInstance.get("alb2apigw-proxy-lm/users/current-user", {
    timeout: 15000,
  });
}

function getEULA() {
  return baseInstance.get("alb2apigw-proxy-lm/eula", {
    timeout: 15000,
  });
}

function postEULA(userId, requestBody) {
  return baseInstance.post("alb2apigw-proxy-lm/eula/" + userId, requestBody, {
    timeout: 30000,
  });
}

function triggerShopifyIngestion() {
  return baseInstance
    .get("alb2apigw-proxy-lm/shopifyDatasets", {
      timeout: 15000,
    })
    .catch((error) => {
      console.log(error);
    });
}

export {
  getCurrentUser,
  getLogin,
  getLogout,
  getClearCookie,
  getPreflight,
  getEULA,
  postEULA,
  triggerShopifyIngestion,
};
