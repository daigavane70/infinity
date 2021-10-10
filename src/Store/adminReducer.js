import * as Actions from "./adminActions";
import defaultState from "./defaultState";

const reducer = (state = defaultState.admin, action) => {
  switch (action.type) {
    case Actions.LOGIN: {
      return {
        ...state,
        loggedIn: true,
        data: action.payload,
      };
    }

    case Actions.LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        data: null,
      };
    }

    case Actions.ENDPCSESSION: {
      let pc = state.pc;
      pc[action.payload] = {
        ...pc[action.payload],
        state: 1,
        sessionStart: null,
        sessionEnd: null,
        userID: null,
      };

      return {
        ...state,
        pc,
      };
    }

    case Actions.HALTPC: {
      let pc = state.pc;
      pc[action.payload] = {
        ...pc[action.payload],
        state: 3,
        sessionStart: null,
        sessionEnd: null,
        userID: null,
      };

      return {
        ...state,
        pc,
      };
    }

    case Actions.REMOVEPCFROMHALT: {
      let pc = state.pc;
      pc[action.payload] = {
        ...pc[action.payload],
        state: 1,
        sessionStart: null,
        sessionEnd: null,
        userID: null,
      };

      return {
        ...state,
        pc,
      };
    }

    case Actions.SETALLPC: {
      return {
        ...state,
        pc: [...action.payload],
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
