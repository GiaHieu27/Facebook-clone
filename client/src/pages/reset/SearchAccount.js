import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import * as Yup from "yup";
import axios from "axios";
import LoginInput from "../../components/Inputs/LoginInput";

function SearchAccount({ email, ...props }) {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Hãy nhập email của bạn")
      .email("Hay nhập đúng định dạng email")
      .max(50, "Tối đa 50 kí tự"),
  });

  const handleSubmit = async () => {
    try {
      props.setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        { email }
      );
      props.setUserInfos(data);
      props.setVisible(1);
      props.setError("");
      props.setLoading(false);
    } catch (error) {
      props.setLoading(false);
      props.setError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="reset_form">
        <div className="reset_form_header">Tìm tài khoản của bạn</div>
        <div className="reset_form_text">Nhập email của bạn vào đây nhé</div>
        <Formik
          enableReinitialize
          initialValues={{ email }}
          validationSchema={validateEmail}
          onSubmit={() => {
            handleSubmit();
          }}
        >
          {(formik) => (
            <Form>
              <LoginInput
                type="text"
                name="email"
                onChange={(e) => props.setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
              />
              {props.error && <div className="error_text">{props.error}</div>}
              <div className="reset_form_btns">
                <Link to="/login" className="gray_btn">
                  Cancel
                </Link>
                <button type="submit" className="blue_btn">
                  Gửi
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {props.loading && <HashLoader color="blue" size={30} />}
    </>
  );
}

export default SearchAccount;
