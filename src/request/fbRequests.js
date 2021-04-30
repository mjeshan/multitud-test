import { baseInstance } from "./config";
import axios from "axios";

export function getFBCredentials() {
  return baseInstance.get("alb2apigw-proxy-lm/facebookAdCreator", {
    timeout: 15000,
  });
}

export function fetchAllFbBusiness(accessToken) {
  return axios.get(
    `https://graph.facebook.com/v10.0/me/businesses?access_token=${accessToken}`
  );
}

export function fetchAllFbAdAccounts(accessToken, businessId) {
  return axios.get(
    `https://graph.facebook.com/v10.0/${businessId}/owned_ad_accounts?fields=name&access_token=${accessToken}`
  );
}

export function fetchAllFbPages(accessToken, businessId) {
  return axios.get(
    `https://graph.facebook.com/v10.0/${businessId}/owned_pages?fields=name&access_token=${accessToken}`
  );
}

export function createFbAudiences(access_token, ad_account_id, title) {
  return axios.post("http://localhost:5000/create-audience", {
    access_token,
    ad_account_id,
    title,
  });
}
