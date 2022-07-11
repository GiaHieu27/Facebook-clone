import { Link } from "react-router-dom";

function HelpSupport({ setVisible }) {
  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        Help &amp; Support
      </div>
      <Link to="/reset" className="mmenu_item hover3">
        <div className="small_circle">
          <i className="help_center_icon"></i>
        </div>
        <span>Forgot Password</span>
      </Link>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="email_icon"></i>
        </div>
        <span>Support Inbox</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="info_filled_icon"></i>
        </div>
        <span>Report a Problem</span>
      </div>
    </div>
  );
}

export default HelpSupport;
