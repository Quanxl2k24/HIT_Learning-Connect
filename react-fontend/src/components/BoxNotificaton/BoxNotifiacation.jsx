import TickConfirm from "../../assets/imgs/TickConfirm.png";

const BoxNotification = ({ notification }) => {
  return (
    <div className="BoxNotification-container">
      <div className="boxnotification">
        <div className="boxnotification_box">
          <div className="boxnotification_box--TickConfirm">
            <img src={TickConfirm} alt="" />
          </div>

          <div className="boxnotification_box--description">
            <h1>{notification}</h1>
          </div>

          <div className="boxnotification_box--button"></div>
        </div>
      </div>
    </div>
  );
};

export default BoxNotification;
