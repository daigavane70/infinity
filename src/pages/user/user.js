// import UserSignInForm from "../../UserSignInForm";
// import SignInForm from "../../components/SignInForm";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { connect } from "react-redux";
import "./user.css";
function User(props) {
  const UrgeWithPleasureComponent = (timeDuration) => {
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
        onComplete={() => {}}
      >
        {({ remainingTime }) => {
          const hours = Math.floor(remainingTime / 3600);
          const minutes = Math.floor((remainingTime % 3600) / 60);
          const seconds = remainingTime % 60;

          return (
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

  return (
    <div className="container text-center">
      <div className="row d-flex justify-centent-center">
        <div className="col-12 my-2">
          <h1>
            Welcome to Gameify! <i>{props.user.data.name}</i>
          </h1>
          <div className="col-12 text-success my-5">
            <h3>Your Session Has Started</h3>
          </div>
          <div className="col-12 d-flex justify-content-center">
            {UrgeWithPleasureComponent(props.user.duration)}
          </div>
          <div className='text-primary'>Time Remaining</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(User);
