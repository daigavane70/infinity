import { Link, useHistory } from "react-router-dom";
import "./optionForm.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import Rozarpay from "../../components/razorpay";
import { Loader, Requests } from "../../commons";
import moment from "moment";
import { startSession } from "../../Store/userActions";
import { connect } from "react-redux";

const OptionForm = (props) => {
  const history = useHistory();
  const [pcList, setpcList] = useState([]);
  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(1);

  const getAvailablePC = () => {
    return pcList.map((pc, index) => {
      if (pc.state === 1)
        return <option value={pc._id}>PC: {index + 1}</option>;
    });
  };

  useEffect(async () => {
    setloading(true);
    try {
      const res = await Requests.getAllPCs();
      if (res.status === 200) {
        console.log(res.data.data);
        setpcList(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
    setloading(false);
  }, []);

  function increase() {
    setCount(count + 1);
  }
  function decrease() {
    if (count === 1) return;
    setCount(count - 1);
  }
  return (
    <div className="user-options">
      {loading ? (
        <Loader></Loader>
      ) : (
        <Formik
          initialValues={{
            pcId: "",
            duration: 0,
          }}
          validationSchema={Yup.object({
            pcId: Yup.string().required("Please select the PC"),
            duration: Yup.string().required("Please select the Duration"),
          })}
          onSubmit={(values) => {
            const date = new Date(moment.utc().format());
            const session_start = date;
            date.setHours(date.getHours() + values.duration);
            const session_end = date;
            console.log({
              ...values,
              date: moment().format("ddd MMM DD YYYY"),
              session_start,
              session_end,
              cost: 100 * parseInt(values.duration),
              transactionId: "123",
            });

            try {
              const res = Requests.startSession({
                ...values,
                date: moment().format("ddd MMM DD YYYY"),
                session_start,
                session_end,
                cost: 100 * parseInt(values.duration),
                transactionId: "123",
              });
              console.log(res);
              props.startSession(
                {
                  ...values,
                  date: moment().format("ddd MMM DD YYYY"),
                  session_start,
                  session_end,
                  cost: 100 * parseInt(values.duration),
                  transactionId: "123",
                },
                values.duration
              );
            history.push(`/user/${props.user._id}`);
            } catch (err) {
              console.log(err);
            }

            // props.startSession(
            //   {
            //     ...values,
            //     date: moment().format("ddd MMM DD YYYY"),
            //     session_start,
            //     session_end,
            //     cost: 100 * parseInt(values.duration),
            //     transactionId: "123",
            //   },
            //   values.duration
            // );

            // history.push(`/user/${props.user._id}`);
          }}
        >
          {(formik) => {
            return (
              <div className="form-box">
                <div className="title">Enter Details</div>
                <div className="input-box">
                  <label for="pc">Choose Your PC:</label>
                  <select
                    name="pcId"
                    value={formik.values.pcId}
                    onChange={formik.handleChange}
                    id="PCID"
                  >
                    <option value="null" selected>
                      Select
                    </option>
                    {getAvailablePC()}
                  </select>
                  <div className="text-danger">{formik.errors.pcId}</div>
                </div>
                <div className="input-box">
                  <label for="time-duration">Choose Duration(in hrs):</label>
                  <select
                    name="duration"
                    id="duration"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                  >
                    <option value="null" selected>
                      Select
                    </option>
                    <option value="1">One Hour</option>
                    <option value="2">Two Hour</option>
                  </select>
                  <div className="text-danger">{formik.errors.duration}</div>
                </div>
                <div className="submit-button">
                  <button onClick={formik.handleSubmit} type="submit">
                    <b>Pay Rs.{parseInt(formik.values.duration) * 100} </b>
                  </button>
                </div>
              </div>
            );
          }}
        </Formik>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = (dispatch) => {
  return {
    startSession: (data, duration) => dispatch(startSession(data, duration)),
  };
};

export default connect(mapStateToProps, mapActionToProps)(OptionForm);
