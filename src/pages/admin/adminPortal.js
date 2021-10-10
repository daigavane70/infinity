import "./adminPortal.css";
import { GetPCState, Requests } from "../../commons";
import ComputerSvg from "../../assets/computer.svg";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { NavLink, useHistory } from "react-router-dom";
import {
  setALLPC,
  endPCSession,
  setPCOnHalt,
  removePcFromHalt,
} from "../../Store/adminActions";
import { connect } from "react-redux";
import moment from "moment";

function Admin(props) {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [pcList, setpcList] = useState([]);

  useEffect(() => {
    setpcList(props.pc);
  });

  const UrgeWithPleasureComponent = (timeDuration, id) => {
    const [state, setState] = useState("asd");
    return (
      <CountdownCircleTimer
        isPlaying
        duration={timeDuration}
        colors={[
          ["#004777", 0.33],
          ["#F7B801", 0.33],
          ["#A30000", 0.33],
        ]}
        size={120}
        onComplete={() => {
          // props.endPCSession(id);
          // setState("Available");
          console.log("completed", id);
        }}
      >
        {({ remainingTime }) => {
          const hours = Math.floor(remainingTime / 3600);
          const minutes = Math.floor((remainingTime % 3600) / 60);
          const seconds = remainingTime % 60;

          return remainingTime === 0 ? (
            <div className="text-success fw-bold">
              <i class="bi bi-patch-check"></i>
            </div>
          ) : (
            <div>
              <div>
                {hours}:{minutes}:{seconds}
              </div>
              <div>Hours</div>
            </div>
          );
        }}
      </CountdownCircleTimer>
    );
  };

  const getPCList = () => {
    return props.pc.map((pc, index) => {
      const getPCTimer = (sessionEnd) => {
        const date = new Date();

        const curr = moment(date).utc().format("MMMM Do YYYY, h:mm:ss");
        const end = moment(sessionEnd).utc().format("MMMM Do YYYY, h:mm:ss");

        // console.log(curr, end, moment(sessionEnd).diff(date));

        var duration = moment.duration(moment(sessionEnd).diff(date));

        const diff = duration.asSeconds();

        return diff > 0 ? Math.floor(diff) : 0;
      };

      return (
        <div className="pc">
          <div className=" row d-flex align-items-center">
            <div className="col-3">
              {UrgeWithPleasureComponent(
                pc.state === 2 ? getPCTimer(pc.session_end) : 0,
                index
              )}
            </div>
            <div className="col-3 pc-image">
              <img alt="" src={ComputerSvg} />
            </div>
            <div className="col-6">
              <div className="row p-2">
                <div className="col-7 text-end fw-bold">PC ID :-</div>
                <div className="col-5 text-start">{index + 1}</div>
                <div className="col-7 text-end fw-bold">state :-</div>
                <div className="col-5 text-start">{GetPCState(pc.state)}</div>
                {pc.userId && (
                  <>
                    <div className="col-7 text-end fw-bold">
                      Customer Name :-
                    </div>
                    <div className="col-5 text-start">{pc.userId}</div>{" "}
                  </>
                )}
                {pc.state !== 2 && (
                  <>
                    {props.pc[index].state < 3 ? (
                      <div
                        className="btn btn-success"
                        onClick={async (e) => {
                          try {
                            const res = await Requests.putPcToMaintainance(
                              pc._id
                            );
                            if (res.status === 200) {
                              console.log(res);
                              props.setPCOnHalt(index);
                              history.push(`/admin/${props.data._id + 1}`);
                            }
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        Start Maintainance
                      </div>
                    ) : (
                      <div
                        className="btn btn-primary"
                        onClick={async () => {
                          try {
                            const res = await Requests.removePcFromMaintainance(
                              pc._id
                            );
                            console.log(res);
                            props.removePcFromHalt(index);
                            history.push(`/admin/${props.data._id}`);
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        Stop Maintainance
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="admin">
      <div className="navbar">
        <div className="logo">Logo</div>
        <div className="name">Beyond Infinity</div>
        <button className="btn btn-success mx-2">
          <NavLink to="/"> Home </NavLink>
        </button>
        <button className="btn btn-success mx-2">
          <NavLink to="/reports"> Session Report </NavLink>
        </button>
      </div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="container pt-3">
          <div className="pc-container">{getPCList()}</div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.admin;
};

const mapActionToProps = (dispatch) => {
  return {
    setALLPC: (list) => dispatch(setALLPC(list)),
    endPCSession: (id) => dispatch(endPCSession(id)),
    setPCOnHalt: (id) => dispatch(setPCOnHalt(id)),
    removePcFromHalt: (id) => dispatch(removePcFromHalt(id)),
  };
};

export default connect(mapStateToProps, mapActionToProps)(Admin);
