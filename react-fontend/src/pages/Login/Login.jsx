import { useState } from "react";
import { Field, Formik, ErrorMessage, Form } from "formik";
import { Link } from "react-router-dom";

import "./Login.scss";
import Logo from "../../assets/imgs/LogoHit.png";
import ShowPassword from "../../assets/imgs/ShowPassword.png";
import HiddenPassword from "../../assets/imgs/HiddenPassword.png";
import ImgLogin from "../../assets/imgs/ImgLogin.png";
import loginValidate from "../../utlis/loignValidate";

const Login = () => {
  const [typePassword, setTypePassword] = useState(false);

  //handle chuyển type password
  const handleTypePassword = (e) => {
    e.preventDefault();
    setTypePassword(!typePassword);
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="login_formsInput">
          <div className="login_formsInput--logo">
            <img src={Logo} alt="" />
          </div>

          <div className="login_formsInput--title">
            <p>Đăng Nhập</p>
          </div>

          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={loginValidate}
            onSubmit={handleSubmit}
          >
            <Form className="login_formsInput--input">
              <label>Tên đăng nhập</label>

              <div className="boxUserName">
                <Field name="username" type="text" placeholder="Username" />
              </div>

              <ErrorMessage
                name="username"
                component="div"
                className="validate"
              />
              <div className="labelBoxPassword">
                <label>Mật khẩu</label>
              </div>

              <div className="boxPassword">
                <Field
                  name="password"
                  type={typePassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                />

                <button onClick={handleTypePassword}>
                  <img
                    src={typePassword ? HiddenPassword : ShowPassword}
                    alt=""
                  />
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="validate"
              />

              <button className="buttonLogin" type="submit">
                Đăng Nhập
              </button>
            </Form>
          </Formik>

          <div className={"forgotPassword"}>
            <p>
              Bạn không nhớ mật khẩu?
              <span>
                <Link className="Link" to="/ForgotPassword">
                  Quên mật khẩu
                </Link>
              </span>
            </p>
          </div>
        </div>

        <div className="login_imgRight">
          <img src={ImgLogin} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
