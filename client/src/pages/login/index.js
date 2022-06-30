import LoginForm from "../../components/Form/LoginForm";
import Footer from "../../components/Form/Footer";
import RegisterForm from "../../components/Form/RegisterForm";
import { useState } from "react";

function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
        <Footer />
      </div>
    </div>
  );
}

export default Login;
