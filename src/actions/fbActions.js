import * as requests from "../request/fbRequests";
import { audiences } from "../data/audiences";

export function getFBCredentials() {
  return {
    type: "INTRO_FB_CREDS_FETCHED",
    payload: requests.getFBCredentials().then((response) => {
      let responseJson = {};
      try {
        responseJson = JSON.parse(response.data);
        return responseJson;
      } catch (e) {
        throw new Error(e.message);
      }
    }),
  };
}

export function fetchAllFbBusiness(accessToken) {
  return {
    type: "INTRO_FB_FETCH_ALL_BUSINESS",
    payload: requests.fetchAllFbBusiness(accessToken).then((response) => {
      let responseJson = {};
      try {
        responseJson = response.data;
        return responseJson;
      } catch (e) {
        throw new Error(e.message);
      }
    }),
  };
}

export function slectFBBusiness(business) {
  return {
    type: "INTRO_FB_SELECT_BUSINESS",
    payload: business,
  };
}

export function fetchAllFbAdAccounts(accessToken, businessId) {
  return {
    type: "INTRO_FB_FETCH_ALL_AD_ACCOUNTS",
    payload: requests
      .fetchAllFbAdAccounts(accessToken, businessId)
      .then((response) => {
        let responseJson = {};
        try {
          responseJson = response.data;
          return responseJson;
        } catch (e) {
          throw new Error(e.message);
        }
      }),
  };
}

export function selectFBAdAccount(adAccount) {
  return {
    type: "INTRO_FB_SELECT_AD_ACCOUNTS",
    payload: adAccount,
  };
}

export function fetchAllFbPages(accessToken, businessId) {
  return {
    type: "INTRO_FB_FETCH_ALL_PAGES",
    payload: requests
      .fetchAllFbPages(accessToken, businessId)
      .then((response) => {
        let responseJson = {};
        try {
          responseJson = response.data;
          return responseJson;
        } catch (e) {
          throw new Error(e.message);
        }
      }),
  };
}

export function selectFBPage(page) {
  return {
    type: "INTRO_FB_SELECT_PAGE",
    payload: page,
  };
}

export function fetchAudiences() {
  return {
    type: "FETCH_AUDIENCES",
    payload: audiences,
  };
}

export function openAdcreationPopup(segement_id) {
  return {
    type: "OPEN_AUDIENCE_CREATION_POPUP",
    payload: {
      segement_id: segement_id,
    },
  };
}

export function closeAdcreationPopup() {
  return {
    type: "CLOSE_AUDIENCE_CREATION_POPUP",
    payload: {},
  };
}

export function createAudiences(access_token, ad_account_id, title) {
  return {
    type: "CREATE_AUDIENCES",
    payload: requests
      .createFbAudiences(access_token, ad_account_id, title)
      .then((response) => {
        let responseJson = {};
        try {
          responseJson = response.data;
          return responseJson;
        } catch (e) {
          throw new Error(e.message);
        }
      }),
  };
}
