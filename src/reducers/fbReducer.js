import produce from "immer";

const initState = {
  pageLoading: true,
  loading: true,
  introStepsCompleted: false,
  storeName: null,
  fb: {
    userId: null,
    accessToken: null,
    businessId: null,
    vertical: null,
    adAccountId: null,
    pageId: null,
    step: "connect",
    completed: false,
    nextStep: null,
  },
  initializatiopnCompleted: false,
  intro_steps: 1,
  step: "facebook",
  fbStep: "connect",
  audiences: [],
};

export default produce((draftState = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "INTRO_FB_CREDS_FETCHED_PENDING":
      draftState.loading = true;
      return draftState;

    case "INTRO_FB_CREDS_FETCHED_FULFILLED":
      draftState.loading = false;
      draftState.storeName = payload.storeName;
      if (payload.fbAccessToken) {
        draftState.fb.step = "business";
        draftState.fb.userId = payload.fbUserId;
        draftState.fb.accessToken = payload.fbAccessToken;
      } else {
        draftState.fb.completed = true;
        draftState.intro_step = 2;
      }
      return draftState;

    case "INTRO_FB_CREDS_FETCHED_REJECTED":
      draftState.fb.completed = true;
      draftState.intro_step = 2;
      return draftState;

    case "INTRO_FB_FETCH_ALL_BUSINESS_PENDING":
      draftState.loading = true;
      return draftState;

    case "INTRO_FB_FETCH_ALL_BUSINESS_FULFILLED":
      draftState.loading = false;
      draftState.listData = payload;
      return draftState;

    case "INTRO_FB_SELECT_BUSINESS":
      draftState.loading = false;
      draftState.fb.businessId = payload.id;
      draftState.fb.step = "ad_account";
      return draftState;

    case "INTRO_FB_FETCH_ALL_AD_ACCOUNTS_PENDING":
      draftState.loading = true;
      return draftState;

    case "INTRO_FB_FETCH_ALL_AD_ACCOUNTS_FULFILLED":
      draftState.loading = false;
      draftState.listData = payload;
      return draftState;

    case "INTRO_FB_SELECT_AD_ACCOUNTS":
      draftState.loading = false;
      draftState.fb.adAccountId = payload.id;
      draftState.fb.step = "page";
      return draftState;

    case "INTRO_FB_FETCH_ALL_PAGES_PENDING":
      draftState.loading = true;
      return draftState;

    case "INTRO_FB_FETCH_ALL_PAGES_FULFILLED":
      draftState.loading = false;
      draftState.listData = payload;
      return draftState;

    case "INTRO_FB_SELECT_PAGE":
      draftState.loading = false;
      draftState.fb.pageId = payload.id;
      draftState.fb.completed = true;
      draftState.intro_step = 2;
      return draftState;

    case "CRUNCHING_COMPLETED":
      draftState.initializatiopnCompleted = true;
      draftState.intro_step = 3;
      return draftState;

    case "INTRO_COMPLETED":
      draftState.introStepsCompleted = true;
      return draftState;

    case "FETCH_AUDIENCES":
      draftState.audiences = payload;
      return draftState;

    case "OPEN_AUDIENCE_CREATION_POPUP":
      draftState.selected_segment_id = payload.segment_id;
      draftState.audienceDialogOpen = true;
      return draftState;

    case "CLOSE_AUDIENCE_CREATION_POPUP":
      draftState.selected_segment_id = null;
      draftState.audienceDialogOpen = false;
      return draftState;

    case "CREATE_AUDIENCES_PENDING":
      draftState.audienceCreationLoading = true;
      return draftState;

    case "CREATE_AUDIENCES_FULFILLED":
      draftState.audienceCreationLoading = false;
      draftState.audienceDialogOpen = true;
      draftState.createUserCount = payload.num_received;
      return draftState;

    default:
      return draftState;
  }
});
