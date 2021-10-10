export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SETALLPC = "SETALLPC";
export const HALTPC = "HALTPC";
export const STARTSESSION = "STARTSESSION";

export const login = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const startSession = (data, duration) => {
  return {
    type: STARTSESSION,
    payload: { data, duration },
  };
};

export const setALLPC = (data) => {
  return {
    type: SETALLPC,
    payload: {
      data,
    },
  };
};
