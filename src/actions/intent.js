import { CALL_API } from "../middleware/api";
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

// Intent actions

export function loadIntents(filters, nb, mode) {
  let endpoint = `intents?_expand=intentName`;
  if (mode == true) {
    endpoint = `bot/${nb}/intents?_expand=intentName`;
  }
  return {
    [CALL_API]: {
      endpoint: endpoint,
      intents: [],
      filters: filters,
      types: [LOAD_INTENTS_REQUEST, LOAD_INTENTS_SUCCESS, LOAD_INTENTS_FAILURE]
    }
  };
}

export function getIntent(id, nb) {
  return {
    [CALL_API]: {
      endpoint: `bot/${nb}/intents/${id}?_expand=intentName`,
      intent: {},
      types: [GET_INTENT_REQUEST, GET_INTENT_SUCCESS, GET_INTENT_FAILURE]
    }
  };
}

export function updateIntent(intent) {
  return {
    [CALL_API]: {
      endpoint: `intents/${intent.id}`,
      data: intent,
      method: "PUT",
      authenticated: true,
      updateSuccess: false,
      types: [UPDATE_INTENT_REQUEST, UPDATE_INTENT_SUCCESS, UPDATE_INTENT_FAILURE]
    }
  };
}

export function addIntent(intent) {
  return {
    [CALL_API]: {
      endpoint: `bot/${intent.nb}/intents`,
      data: intent,
      method: "POST",
      authenticated: true,
      addSuccess: false,
      types: [ADD_INTENT_REQUEST, ADD_INTENT_SUCCESS, ADD_INTENT_FAILURE]
    }
  };
}

export function newIntent() {
  return {
    type: NEW_INTENT_REQUEST
  };
}

export function deleteIntent(id, nb) {
  return {
    [CALL_API]: {
      endpoint: `intents/${id}`,
      method: "DELETE",
      authenticated: true,
      types: [DELETE_INTENT_REQUEST, DELETE_INTENT_SUCCESS, DELETE_INTENT_FAILURE]
    }
  };
}
