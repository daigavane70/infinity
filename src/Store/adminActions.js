export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SETALLPC = "SETALLPC";
export const HALTPC = "HALTPC";
export const ENDPCSESSION = "ENDPCSESSION";
export const REMOVEPCFROMHALT = "REMOVEPCFROMHALT";

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

export const setALLPC = (data) => {
  return {
    type: SETALLPC,
    payload: data,
  };
};

export const setPCOnHalt = (id) => {
  return {
    type: HALTPC,
    payload: id,
  };
};

export const endPCSession = (id) => {
  return {
    type: ENDPCSESSION,
    payload: id,
  };
};

export const removePcFromHalt = (id) => {
  return {
    type: REMOVEPCFROMHALT,
    payload: id,
  };
};
