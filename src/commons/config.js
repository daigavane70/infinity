import axios from "axios";

const adminBackend = axios.create({
  baseURL: "https://game-ify.herokuapp.com/api",
});

export const getAllPCs = () => {
  return adminBackend.get("/common/all-pcs");
};

export const adminLogin = (data) => {
  return adminBackend.post("/admin/signin", data);
};

export const userSignIn = (data) => {
  return adminBackend.post("/user/signin", data);
};

export const getAdmin = (token) => {
  var config = {
    method: "get",
    url: "https://game-ify.herokuapp.com/api/admin",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("gamify-admin-token")}`,
    },
  };
  return axios(config);
};

export const putPcToMaintainance = (id) => {
  var data = JSON.stringify({
    pcId: id,
  });

  var config = {
    method: "patch",
    url: "https://game-ify.herokuapp.com/api/admin/pc-maintainance",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("gamify-admin-token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const removePcFromMaintainance = (id) => {
  var data = JSON.stringify({
    pcId: id,
  });

  var config = {
    method: "patch",
    url: "https://game-ify.herokuapp.com/api/admin/remove-pc-maintainance",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("gamify-admin-token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
};

export const startSession = (values) => {
  var data = JSON.stringify({
    ...values,
    // "pcId": "616165540a81ae3651d60fef",
    // "duration": 1,
    // "date": "Sat Oct 09 2021",
    // "session_start": "Sat Oct 09 2021 05:32:02 GMT+0000 (Coordinated Universal Time",
    // "session_end": "Sat Oct 10 2021 05:32:02 GMT+0000 (Coordinated Universal Time",
    // "cost": 123,
    // "transactionId": "12345"
  });

  var config = {
    method: "post",
    url: "https://game-ify.herokuapp.com/api/user/start",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("gamify-user-token")}`,
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};
