import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import LoginInput from "../../components/Inputs/LoginInput";
import * as Yup from "yup";
import axios from "axios";

function CodeVerification({ code, ...props }) {
  const { email } = props.userInfos;
  const handleSubmit = async () => {
    try {
      props.setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validateResetPassword`,
        { email, code }
      );

      props.setError("");
      props.setVisible(3);
      props.setLoading(false);
    } catch (error) {
      props.setLoading(false);
      props.setError(error.response.data.message);
    }
  };

  const validationSchema = Yup.object({
    code: Yup.string().required("Hãy nhập code").min(5, "Ít nhât 5"),
  });

  return (
    <>
      <div className="reset_form">
        <div className="reset_form_header">Mã xác thực</div>
        <div className="reset_form_text">
          Nhập mã xác thực của bạn vào đây nhé
        </div>
        <Formik
          enableReinitialize
          initialValues={{ code }}
          validationSchema={validationSchema}
          onSubmit={() => {
            handleSubmit();
          }}
        >
          {(formik) => (
            <Form>
              <LoginInput
                type="text"
                name="code"
                onChange={(e) => props.setCode(e.target.value)}
                placeholder="Nhập mã xác thực của bạn"
              />
              {props.error && <div className="error_text">{props.error}</div>}
              <div className="reset_form_btns">
                <Link to="/" className="gray_btn">
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

export default CodeVerification;
