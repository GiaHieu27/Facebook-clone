import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import userSlice from "../../redux/slices/userSlice";
import SearchAccount from "./SearchAccount";
import SendMail from "./SendMail";
import CodeVerification from "./CodeVerification";
import Footer from "../../components/Form/Footer";
import ChangePassword from "./ChangePassword";

function ResetPassword() {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [userInfos, setUserInfos] = useState("");

  const logOut = () => {
    Cookies.set("user", "");
    dispatch(userSlice.actions.LOGOUT());
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  return (
    <div className="reset">
      <div className="reset_header">
        <Link to="/">
          <img src="../../../icons/facebook.svg" alt="" />
        </Link>
        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user?.picture} alt="avatar" />
            </Link>
            <button className="blue_btn" onClick={logOut}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            loading={loading}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            setUserInfos={setUserInfos}
          />
        )}
        {visible === 1 && userInfos && (
          <SendMail
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            setVisible={setVisible}
            setLoading={setLoading}
            userInfos={userInfos}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            code={code}
            setCode={setCode}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            userInfos={userInfos}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            conf_password={conf_password}
            setConf_password={setConf_password}
            setPassword={setPassword}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            userInfos={userInfos}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
