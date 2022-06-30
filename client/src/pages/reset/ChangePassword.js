import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

import LoginInput from "../../components/Inputs/LoginInput";

function ChangePassword({ password, conf_password, ...props }) {
  const navigate = useNavigate();

  const { email } = props.userInfos;

  const handleSubmit = async () => {
    try {
      props.setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {
        email,
        password,
      });

      props.setError("");
      props.setLoading(false);
      navigate("/login");
    } catch (error) {
      props.setLoading(false);
      props.setError(error.response.data.message);
    }
  };

  const validateChange = Yup.object({
    password: Yup.string()
      .required(
        "Mật khẩu ít nhất 6 ký tự (số, chữ và ký tự đặt biệt như ! hay $)"
      )
      .min(6, "Ít nhất 6")
      .max(36, "Nhiều nhất 30"),
    conf_password: Yup.string()
      .required("Nhập lại mật khẩu")
      .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp"),
  });

  return (
    <>
      <div className="reset_form">
        <div className="reset_form_header">Thay đổi mật khẩu</div>
        <div className="reset_form_text">Chọn mật khẩu mới</div>
        <Formik
          enableReinitialize
          initialValues={{ password, conf_password }}
          validationSchema={validateChange}
          onSubmit={() => {
            handleSubmit();
          }}
        >
          {(formik) => (
            <Form>
              <LoginInput
                type="password"
                name="password"
                onChange={(e) => props.setPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới của bạn"
              />
              <LoginInput
                type="password"
                name="conf_password"
                onChange={(e) => props.setConf_password(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                bottom
              />
              {props.error && <div className="error_text">{props.error}</div>}
              <div className="reset_form_btns">
                <Link to="./login" className="gray_btn">
                  Cancel
                </Link>
                <button type="submit" className="blue_btn">
                  Tiếp tục
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {}
    </>
  );
}

export default ChangePassword;
