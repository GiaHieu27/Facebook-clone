import axios from "axios";
import { Link } from "react-router-dom";

function SendMail({ email, ...props }) {
  const senCodeResetEmail = async () => {
    try {
      props.setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
        { email }
      );

      props.setError("");
      props.setVisible(2);
      props.setLoading(false);
    } catch (error) {
      props.setLoading(false);
      props.setError(error.response.data.message);
    }
  };

  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Đặt lại mật khẩu</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">Bạn muốn dùng cách nào</div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Gửi code qua email</span>
              <span>{props.userInfos.email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={props.userInfos?.picture} alt="" />
          <span>{props.userInfos?.email}</span>
          <span>HCMUNRE user</span>
        </div>
      </div>
      {props.error && (
        <div className="error_text" style={{ padding: "10px" }}>
          {props.error}
        </div>
      )}
      <div className="reset_form_btns">
        <Link to="/login" className="gray_btn">
          Not now
        </Link>
        <button
          onClick={() => {
            senCodeResetEmail();
          }}
          className="blue_btn"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

export default SendMail;
