import {
  LOAD_BotS_REQUEST,
  LOAD_BotS_SUCCESS,
  LOAD_BotS_FAILURE,
  GET_Bot_REQUEST,
  GET_Bot_SUCCESS,
  GET_Bot_FAILURE,
  UPDATE_Bot_REQUEST,
  UPDATE_Bot_SUCCESS,
  UPDATE_Bot_FAILURE,
  ADD_Bot_REQUEST,
  ADD_Bot_SUCCESS,
  ADD_Bot_FAILURE,
  DELETE_Bot_REQUEST,
  DELETE_Bot_SUCCESS,
  DELETE_Bot_FAILURE,
  NEW_Bot_REQUEST
} from "../constants";

export function botReducer(
  state = {
    isFetching: false,
    botList: [],
    authenticated: localStorage.getItem("token") ? true : false,
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
  switch (action.type) {
    case LOAD_BotS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        filters: action.filters
      });
    case LOAD_BotS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        botList: action.response
          ? JSON.parse(action.response).filter(e => {
              if (action.filters) {
                if (action.filters.name)
                  return (
                    e.name.indexOf(action.filters.name) > -1
                  );
                else if (action.filters.name)
                  return e.name.indexOf(action.filters.name) > -1;
              }
              return true;
            })
          : [],
        updateSuccess: false,
        addSuccess: false,
        deleteSuccess: false,
        errorMessage: null
      });
    case LOAD_BotS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    case GET_Bot_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        authenticated: action.authenticated || false
      });
    case GET_Bot_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        bot: JSON.parse(action.response),
        authenticated: action.authenticated || false
      });
    case GET_Bot_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    case UPDATE_Bot_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case UPDATE_Bot_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        updateSuccess: true,
        authenticated: action.authenticated || false,
        updateError: null
      });
    case UPDATE_Bot_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        bot: {},
        errorMessage: action.error.statusText || action.error.status,
        updateSuccess: false,
        updateError: action.message
      });
    case NEW_Bot_REQUEST:
      return Object.assign({}, state, {
        isFetching: false,
        bot: {},
        errorMessage: action.message
      });
    case ADD_Bot_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ADD_Bot_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        addSuccess: true,
        authenticated: action.authenticated || false
      });
    case ADD_Bot_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error.statusText || action.error.status,
        addSuccess: false
      });
    case DELETE_Bot_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case DELETE_Bot_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        // bot: bot,
        deleteSuccess: true,
        action: action,
        authenticated: action.authenticated || false
      });
    case DELETE_Bot_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error.statusText || action.error.status,
        deleteSuccess: false
      });
    default:
      return state;
  }
}
