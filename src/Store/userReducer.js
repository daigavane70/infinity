import * as Actions from "./userActions";
import defaultState from "./defaultState";

const reducer = (state = defaultState.user, action) => {
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
        data: {},
      };
    }

    case Actions.STARTSESSION: {
      return {
        ...state,
        session: action.payload.data,
        duration: action.payload.duration*3600,
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
