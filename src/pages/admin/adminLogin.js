import { Link, useHistory } from "react-router-dom";
import "./adminLogin.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Requests } from "../../commons";
import { useEffect, useState } from "react";
import { login, setALLPC } from "../../Store/adminActions";
import { connect } from "react-redux";
import axios from "axios";

const AdminLogin = (props) => {
  const history = useHistory();
  const [loading, setloading] = useState(false);

  // useEffect(async () => {
  //   const token = localStorage.getItem("gamify-admin-token");

  //   if (token) {
  //     var config = {
  //       method: "get",
  //       url: "https://game-ify.herokuapp.com/api/admin",
  //       headers: {
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTYxZGE4NjRmMDE5MmViYmEyY2YzN2YiLCJpYXQiOjE2MzM4MDI5MjB9.6cDsRE4GoXmThFvZ0EycwP3B8zqVb7AKIy_TH3b5pB4",
  //       },
  //     };
  //     const res = await Requests.getAdmin();
  //     history.push(`/admin/${res.data.data._id}`);
  //     console.log(res.data.data);
  //   }
  // });

  return (
    <div className="admin-login">
      <Formik
        initialValues={{
          email: "admin-1@email.com",
          password: "admin-1-password",
        }}
        validationSchema={Yup.object({
          email: Yup.string().required("This field is required"),
          password: Yup.string().required("This field is required"),
        })}
        onSubmit={async (values) => {
          setloading(true);
          try {
            const res = await Requests.adminLogin(values);
            if (res.status == 200) {
              props.login({
                ...res.data.data.admin,
                token: res.data.data.token,
              });
              localStorage.setItem("gamify-admin-token", res.data.data.token);
              try {
                const pc = await Requests.getAllPCs();
                if (res.status === 200) {
                  props.setALLPC(pc.data.data);
                  history.push(`/admin/${res.data.data.admin._id}`);
                }
              } catch (err) {
                console.log(err);
              }
            }
          } catch (err) {
            console.log(err);
          }
          setloading(false);
        }}
      >
        {(formik) => {
          return (
            <div className="form-box">
              <div className="title">Admin Login</div>
              <div className="input-box">
                <label name="name">Name</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Steve Rogers"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <div className="text-danger">{formik.errors.email}</div>
              </div>
              <div className="input-box">
                <label>Password</label>
                <input
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type="password"
                  placeholder="********"
                />
                <div className="text-danger">{formik.errors.password}</div>
              </div>
              {!loading ? (
                <div className="submit-button" onClick={formik.handleSubmit}>
                  <button>Login</button>
                </div>
              ) : (
                <div class="d-flex justify-content-center mt-5">
                  <div class="spinner-border" role="status"></div>
                </div>
              )}
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { ...state.admin };
};

const mapActionToProps = (dispatch) => {
  return {
    login: (data = {}) => dispatch(login(data)),
    setALLPC: (list) => dispatch(setALLPC(list)),
  };
};

export default connect(mapStateToProps, mapActionToProps)(AdminLogin);
