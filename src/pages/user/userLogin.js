import { Link, useHistory } from "react-router-dom";
import "./userLogin.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { login, startSession } from "../../Store/userActions";
import { connect } from "react-redux";
import { Requests } from "../../commons";

const SignInForm = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  return (
    <div className="user-login">
      <Formik
        initialValues={{
          email: "vedant@gmail.com",
          password: "vedant",
        }}
        validationSchema={Yup.object({
          email: Yup.string().email("Enter correct email!"),
          password: Yup.string().required("This field is required"),
        })}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            const res = await Requests.userSignIn(values);
            if (res.status === 200) {
              console.log(res);
              const user = res.data.data.user;
              const token = res.data.data.token;
              localStorage.setItem("gamify-user-token", token);
              props.login(user);
              history.push(`/user/${user._id}/select`);
            }
          } catch (err) {
            console.log(err);
          }
          setLoading(false);
        }}
      >
        {(formik) => {
          return (
            <div className="form-box">
              <div className="title">User Login</div>
              <div className="input-box">
                <label name="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="steverogers@email.com"
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
              <br />
              {loading ? (
                <div class="d-flex justify-content-center mt-5">
                  <div class="spinner-border" role="status"></div>
                </div>
              ) : (
                <div className="submit-button" onClick={formik.handleSubmit}>
                  <button>Login</button>
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
  return state.user;
};

const mapActionToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
    startSession: (data = {}, duration = 2) =>
      dispatch(startSession(data, duration)),
  };
};

export default connect(mapStateToProps, mapActionToProps)(SignInForm);
