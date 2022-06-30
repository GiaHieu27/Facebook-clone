// import lib
import { Form, Formik } from "formik";
import * as Yub from "yup";
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// import project
import RegisterInput from "../Inputs/RegisterInput";
import DateOfBirthSelect from "../Inputs/SelectInput/DateOfBirthSelect";
import GenderSelect from "../Inputs/RadioInput/GenderRadio";
import userReducer from "../../redux/reducers/userReducer";

function RegisterForm({ setVisible }) {
  const dispatch = useDispatch();
  useSelector((state) => console.log(state));
  const navigate = useNavigate();

  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDate: new Date().getDate(),
    gender: "",
  };

  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [user, setUser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDate,
    gender,
  } = user;

  const [error, setError] = useState("");
  const [success, setSuccessse] = useState("");
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDate,
          gender,
        }
      );

      setError("");
      setSuccessse(data.message);

      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch(userReducer.actions.LOGIN(rest));
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccessse("");
      setError(error.response.data.message);
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => currentYear - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDates = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDates()), (val, index) => 1 + index);

  const RegisterValidation = Yub.object({
    first_name: Yub.string()
      .required("Hãy nhập họ")
      .max(30, "Tối đa 30 kí tự")
      .min(2, "Tối thiểu 2 lý tự")
      .matches(/^[aA-zZ]+$/, "Tên không được chứa số"),
    last_name: Yub.string()
      .required("Hãy nhập tên")
      .max(30, "Tối đa 30 kí tự")
      .min(2, "Tối thiểu 2 lý tự")
      .matches(/^[aA-zZ]+$/, "Tên không được chứa số"),
    email: Yub.string()
      .required(
        "Bạn cần có email để đăng ký tài khoản và sử dụng HCMUNRE Social"
      )
      .email("Không đúng định dạng email")
      .max(100, "Tối đa 100 kí tự"),
    password: Yub.string()
      .required(
        "Mật khẩu ít nhất 6 ký tự (số, chữ và ký tự đặt biệt như ! hay $)"
      )
      .max(30, "Tối đa 30 kí tự")
      .min(6, "Tối thiểu 6 lý tự"),
  });

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i
            className="exit_icon"
            onClick={() => {
              setVisible(false);
            }}
          ></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDate,
            gender,
          }}
          validationSchema={RegisterValidation}
          onSubmit={() => {
            let currentDate = new Date();
            let pickedDate = new Date(bYear, bMonth - 1, bDate);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (currentDate - pickedDate < atleast14) {
              setDateError(
                "Co ve ban da nhap sai ngay sinh, dam bao ban nhap dung ngay sinh"
              );
            } else if (currentDate - pickedDate > noMoreThan70) {
              setDateError(
                "Co ve ban da nhap sai ngay sinh, dam bao ban nhap dung ngay sinh"
              );
            } else {
              setDateError("");
            }

            if (gender === "") {
              setGenderError("Hay chon gioi tinh");
            } else {
              setGenderError("");
            }

            registerSubmit();
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bYear={bYear}
                  bDate={bDate}
                  bMonth={bMonth}
                  handleRegisterChange={handleRegisterChange}
                  years={years}
                  months={months}
                  days={days}
                  dateError={dateError}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  genderError={genderError}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup">Sign Up</button>
              </div>

              <HashLoader color="green" loading={loading} size={30} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterForm;
