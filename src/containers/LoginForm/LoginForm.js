import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import $ from "jquery";
import "./LoginForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogo from "../../images/google-brands.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import * as accountService from "../../services/accountService";
import * as actions from "../../store/actions";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [errorMessages, setErrorMessages] = useState();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState(" ");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (event) => {
    setErrorMessages("");
    setIsSubmitted(false);
    console.log("success");
    accountService
      .signIn(event.email, event.password)
      .then((response) => {
        const data = response.data;
        console.log(data);
        dispatch(
          actions.login(
            data.id,
            data.firstName,
            data.lastName,
            data.email,
            data.role,
            data.token
          )
        );
        setIsLoading(true);
        redirectTo();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setErrorMessages(err.data || "Email or password is incorrect");
      });

    // if(data != null){

    // }else{
    //   setErrorMessages(event.error);
    // }
  };

  const login = (id, name, lastname, email, role, token) => {
    localStorage.setItem("token", token);
  };
  const redirectTo = () => {
    setIsLoading(false);
    history("/client", { replace: true });
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 ">
          <form
            className="login100-form validate-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <span className="login100-form-title p-b-49">
              Hekurudha - Login
            </span>

            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Username is required"
            >
              <span className="label-input100">Email</span>
              <Controller
                render={({ field }) => (
                  <TextField
                    label="Type your Email"
                    id="standard-basic"
                    variant="standard"
                    className="input100"
                    name="email"
                    {...field}
                  />
                )}
                name="email"
                type="text"
                rules={{
                  required: true,
                }}
                control={control}
              />
              {errors.email?.type === "required" && (
                <p className="error">Please enter your Email</p>
              )}
              {emailError && <p className="error">{emailError}</p>}
              {errorMessages && <p className="error">{errorMessages}</p>}
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <span className="label-input100">Password</span>
              <Controller
                render={({ field }) => (
                  <TextField
                    label="Type your password"
                    id="standard-basic"
                    variant="standard"
                    className="input100"
                    type="password"
                    name="password"
                    {...field}
                  />
                )}
                name="password"
                type="password"
                rules={{
                  required: true,
                  minLength: 6,
                }}
                control={control}
              />
              {errors.password?.type === "required" && (
                <p className="error">Please enter your password</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="error">
                  Password should be at least 6 characters
                </p>
              )}
            </div>

            <div className="text-right p-t-8 p-b-31">
              <a href="/">Forgot password?</a>
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn">Login</button>
              </div>
            </div>

            <div className="txt1 text-center p-t-54 p-b-20">
              <span>Or Sign Up Using</span>
            </div>

            <div className="flex-c-m">
              <a href="/" className="login100-social-item bg3">
                <img src={GoogleLogo} alt="" className="social-item" />
              </a>
            </div>

            <div className="flex-col-c p-t-155">
              <span className="txt1 p-b-17">Or Sign Up Using</span>
              <Link to="/register">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
