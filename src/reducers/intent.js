import {
  LOAD_INTENTS_REQUEST,
  LOAD_INTENTS_SUCCESS,
  LOAD_INTENTS_FAILURE,
  GET_INTENT_REQUEST,
  GET_INTENT_SUCCESS,
  GET_INTENT_FAILURE,
  UPDATE_INTENT_REQUEST,
  UPDATE_INTENT_SUCCESS,
  UPDATE_INTENT_FAILURE,
  ADD_INTENT_REQUEST,
  ADD_INTENT_SUCCESS,
  ADD_INTENT_FAILURE,
  DELETE_INTENT_REQUEST,
  DELETE_INTENT_SUCCESS,
  DELETE_INTENT_FAILURE,
  NEW_INTENT_REQUEST
} from "../constants";

export function intentReducer(
  state = {
    isFetching: false,
    // intent: {},
    intentList: [],
    isAuthenticated: localStorage.getItem("token") ? true : false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    updateSuccess: false,
    addSuccess: false,
    deleteSuccess: false,
    errorMessage: null
  },
  action
) {
  console.log(action.type);
  switch (action.type) {
    case LOAD_INTENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        filters: action.filters
      });
    case LOAD_INTENTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        intentList: JSON.parse(action.response).filter(e => {
          if (action.filters) {
            if (action.filters.product)
              return e.product.indexOf(action.filters.product) > -1;
          }
          return true;
        }),
        authenticated: action.authenticated || false,
        updateSuccess: false,
        addSuccess: false,
        deleteSuccess: false,
        errorMessage: null
      });
    case LOAD_INTENTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });

    case GET_INTENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        authenticated: action.authenticated || false
      });
    case GET_INTENT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        intent: JSON.parse(action.response),
        authenticated: action.authenticated || false
      });
    case GET_INTENT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });

    case UPDATE_INTENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case UPDATE_INTENT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        // intent:{},
        // intent: intent,
        updateSuccess: true,
        authenticated: action.authenticated || false
      });
    case UPDATE_INTENT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        intent: {},
        errorMessage: action.error.statusText || action.error.status,
        updateSuccess: false
      });
    case NEW_INTENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: false,
        intent: {}
      });
    case ADD_INTENT_REQUEST:
      console.log("ADD Object");
      return Object.assign({}, state, {
        isFetching: true
      });
    case ADD_INTENT_SUCCESS:
      console.log("SUCCESS Object");
      return Object.assign({}, state, {
        isFetching: false,
        addSuccess: true,
        authenticated: action.authenticated || false
      });
    case ADD_INTENT_FAILURE:
      console.log("FAILURE Object");
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error.statusText || action.error.status,
        addSuccess: false
      });
    case DELETE_INTENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case DELETE_INTENT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        // intent: intent,
        deleteSuccess: true,
        action: action,
        authenticated: action.authenticated || false
      });
    case DELETE_INTENT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        deleteSuccess: false,
        errorMessage: action.error.statusText || action.error.status
      });
    default:
      return state;
  }
}
