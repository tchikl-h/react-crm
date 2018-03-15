import { CALL_API } from "../middleware/api";
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

// Bot actions

export function loadBots(filters) {
  return {
    [CALL_API]: {
      endpoint: "bots",
      bots: [],
      filters: filters,
      types: [
        LOAD_BotS_REQUEST,
        LOAD_BotS_SUCCESS,
        LOAD_BotS_FAILURE
      ]
    }
  };
}

export function getBot(id) {
  return {
    [CALL_API]: {
      endpoint: `bots/${id}`,
      bot: {},
      types: [GET_Bot_REQUEST, GET_Bot_SUCCESS, GET_Bot_FAILURE]
    }
  };
}

export function updateBot(bot) {
  return {
    [CALL_API]: {
      endpoint: `bots/${bot.id}`,
      data: bot,
      method: "PUT",
      authenticated: true,
      updateSuccess: false,
      types: [
        UPDATE_Bot_REQUEST,
        UPDATE_Bot_SUCCESS,
        UPDATE_Bot_FAILURE
      ]
    }
  };
}

export function addBot(bot) {
  return {
    [CALL_API]: {
      endpoint: `bots`,
      data: bot,
      method: "POST",
      authenticated: true,
      addSuccess: false,
      types: [ADD_Bot_REQUEST, ADD_Bot_SUCCESS, ADD_Bot_FAILURE]
    }
  };
}

export function deleteBot(id) {
  return {
    [CALL_API]: {
      endpoint: `bots/${id}`,
      method: "DELETE",
      authenticated: true,
      types: [
        DELETE_Bot_REQUEST,
        DELETE_Bot_SUCCESS,
        DELETE_Bot_FAILURE
      ]
    }
  };
}

export function newBot() {
  return {
    type: NEW_Bot_REQUEST
  };
}
