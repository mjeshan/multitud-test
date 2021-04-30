import { menuStructure } from "../models/navModels";
import samplePic from "../assets/demo/sampleProfile.png";

const initState = Object.freeze({
  errorMessage: null,
  isBusy: false,
  menuStructure: menuStructure,
  selectedMenu: null,
  profileLoaded: false,
  profile: {
    profileId: "a343b902bf342",
    name: "Kristine Abrams",
    title: "Sales Associate",
    role: {
      type: "FIELD",
      subType: "SALES",
      permission: "",
    },
    imageUri: samplePic,
  },
  eula: null,
  analysis: null,
  currentAnalysis: null,
  emailMarketingConnected: false,
  emailCampaignBusy: false,
  emailCampaigns: [],
  emailLists: [],
});

const errorProfile = Object.freeze({
  profileId: "unknown",
  name: "Unknown",
  title: "Error loading profile",
  role: {
    type: "UNKNOWN",
    subType: "UNKNOWN",
    permission: "UNKNOWN",
  },
  imageUri: null,
});

const loadingProfile = Object.freeze({
  profileId: "Loading",
  name: "Loading",
  title: "",
  status: {
    eulaSigned: false,
    intializationComplete: false,
    fetchingFBCredentials: false,
    initializeFBComplete: false,
  },
  role: {
    type: "UNKNOWN",
    subType: "UNKNOWN",
    permission: "UNKNOWN",
  },
  imageUri: null,
});

const defaultError =
  "Oops sorry, we are having some trouble, please try again later.";

export default function reducer(state = initState, action, status) {
  switch (action.type) {
    case "PROJECT_GO_TO_TAB":
      return { ...state, currentTab: action.payload, errorMessage: null };

    case "APP_LOGOUT_FULFILLED":
      window.location.reload();
      return { ...initState };

    case "APP_LOGOUT_REJECTED":
    case "APP_GET_EULA_REJECTED":
    case "APP_POST_EULA_REJECTED":
    case "APP_START_INITIALIZATION_REJECTED":
    case "APP_GET_ANALYSIS_REJECTED":
    case "APP_GET_ANALYSIS_ITEM_REJECTED":
    case "APP_AUTH_EMAIL_MARKETING_REJECTED":
      return { ...state, isBusy: false, errorMessage: defaultError };
    case "APP_POST_EMAIL_CAMPAIGN_REJECTED":
      return { ...state, emailCampaignBusy: false, errorMessage: defaultError };
    case "APP_GET_EMAIL_CAMPAIGNS_REJECTED":
      return {
        ...state,
        emailCampaignBusy: false,
        emailCampaigns: [],
        emailLists: [],
        errorMessage: defaultError,
      };

    case "APP_LOGOUT_PENDING":
    case "APP_GET_EULA_PENDING":
    case "APP_POST_EULA_PENDING":
    case "APP_START_INITIALIZATION_PENDING":
    case "APP_GET_ANALYSIS_PENDING":
    case "APP_AUTH_EMAIL_MARKETING_PENDING":
      return { ...state, isBusy: true, errorMessage: null };
    case "APP_GET_ANALYSIS_ITEM_PENDING": {
      return {
        ...state,
        isBusy: true,
        currentAnalysis: null,
        errorMessage: null,
      };
    }
    case "APP_POST_EMAIL_CAMPAIGN_PENDING":
    case "APP_GET_EMAIL_CAMPAIGNS_PENDING":
      return { ...state, emailCampaignBusy: true, errorMessage: defaultError };

    case "APP_GET_CURRENT_USER_FULFILLED": {
      try {
        return {
          ...state,
          profile: action.payload,
          profileLoaded: true,
          isBusy: false,
          errorMessage: null,
        };
      } catch {
        return {
          ...state,
          profile: { ...errorProfile },
          profileLoaded: false,
          isBusy: false,
          errorMessage: defaultError,
        };
      }
    }

    case "APP_GET_CURRENT_USER_PENDING": {
      return {
        ...state,
        profile: { ...loadingProfile },
        isBusy: true,
        errorMessage: null,
      };
    }

    case "APP_GET_CURRENT_USER_REJECTED":
      return {
        ...state,
        profile: { ...errorProfile },
        profileLoaded: false,
        isBusy: false,
        errorMessage: defaultError,
      };

    case "APP_GET_EULA_FULFILLED":
      return {
        ...state,
        eula: action.payload,
        isBusy: false,
        errorMessage: null,
      };

    case "APP_POST_EULA_FULFILLED": {
      return {
        ...state,
        profile: action.payload,
        profileLoaded: true,
        isBusy: false,
        errorMessage: null,
      };
    }

    case "APP_START_INITIALIZATION_FULFILLED": {
      return {
        ...state,
        profile: action.payload,
        isBusy: false,
        errorMessage: null,
      };
    }
    case "APP_INCREMENT": {
      let newProfile = { ...state.profile };
      if (newProfile.status.intializationProgress === null) {
        newProfile.status.intializationProgress = 0;
      } else if (newProfile.status.intializationProgress < 100) {
        newProfile.status.intializationProgress += 10;
      }
      if (newProfile.status.intializationProgress >= 100) {
        newProfile.status.intializationProgress = 100;
        newProfile.status.intializationComplete = true;
      }
      return {
        ...state,
        profile: newProfile,
        profileLoaded: true,
        isBusy: false,
        errorMessage: null,
      };
    }

    case "APP_GET_ANALYSIS_FULFILLED":
      return {
        ...state,
        analysis: action.payload,
        isBusy: false,
        errorMessage: null,
      };

    case "APP_GET_ANALYSIS_ITEM_FULFILLED": {
      return {
        ...state,
        currentAnalysis: action.payload,
        isBusy: false,
        errorMessage: null,
      };
    }

    case "APP_AUTH_EMAIL_MARKETING_FULFILLED": {
      return {
        ...state,
        emailMarketingConnected: true,
        isBusy: false,
        errorMessage: null,
      };
    }

    case "APP_AUTH_EMAIL_MARKETING_FULFILLED":
      return { ...state, emailCampaignBusy: false, errorMessage: defaultError };
    case "APP_GET_EMAIL_CAMPAIGNS_FULFILLED":
      return {
        ...state,
        emailCampaignBusy: false,
        emailCampaigns: action.payload.campaigns,
        emailLists: action.payload.lists,
        errorMessage: defaultError,
      };

    default:
      return state;
  }
}
