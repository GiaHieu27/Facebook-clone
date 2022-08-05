// import lib
import { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import Cookies from "js-cookie";
import * as Yub from "yup";

// import project
import LoginInput from "../../components/Inputs/LoginInput";
import userReducer from "../../redux/slices/userSlice";

const loginInfo = {
  email: "",
  password: "",
};

function LoginForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState(loginInfo);
  const { email, password } = login;

  const [error, setError] = useState("");
  const [success, setSuccessse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        { email, password }
      );
      setError("");

      setTimeout(() => {
        dispatch(userReducer.actions.LOGIN(data));
        Cookies.set("user", JSON.stringify(data));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccessse("");
      setError(error.response.data.message);
    }
  };

  const loginValidation = Yub.object({
    email: Yub.string()
      .required("Email là bắt buộc")
      .email("Phải là email")
      .max(100, "Tối đa 100 kí tự"),
    password: Yub.string().required("Password là bắt buộc"),
  });

  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => loginSubmit()}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleChangeLogin}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChangeLogin}
                  bottom
                />

                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/reset" className="forgot_password">
            Forgotten password ?
          </Link>

          <HashLoader color="blue" loading={loading} size={30} />
          {error && <div className="error_text">{error}</div>}
          {success && <div className="success_text">{success}</div>}

          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a Page</b>
          for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
