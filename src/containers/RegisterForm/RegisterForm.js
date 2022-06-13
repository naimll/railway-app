import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import $ from "jquery";
import "./RegisterForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogo from "../../images/google-brands.svg";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@material-ui/core";
import * as accountService from "../../services/accountService";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [fieldRequired, setFieldRequired] = useState();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const history = useNavigate();

  console.log(error, "HEYYYY");
  const onSubmit = (data) => {
    console.log(error, "HELLO");
    setIsLoading(true);
    setError("");
    setEmailError("");

    if (!isValidEmail(data.email)) {
      setEmailError("Please enter a valid Email");
    } else {
      setEmailError("");
    }

    accountService
      .signUp(data.name, data.lastname, data.email, data.password, 1)
      .then((response) => {
        accountService
          .signIn(data.email, data.password, false)
          .then((response) => {
            const { data } = response;
            console.log(error);
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
            history("/success", { replace: true });
          })
          .catch((err) => {
            setIsLoading(false);
            setError("There was an error signing in!");
          });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        onSignUpFailure(err);
      });
  };
  const isValidEmail = (email) => {
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };
  const onSignUpFailure = (err) => {
    const serverResponse = err.response;
    if (!serverResponse) {
      setError("Unable to connect to server");
      return;
    }
    setError("One or more validation errors occurred!");

    const errors = err.response.data?.errors;
    if (!errors) return;
    const emailErrors = errors.Email;
    if (emailErrors) {
      setEmailError(
        emailErrors.reduce((acc, currentError) => acc + currentError + "\n", "")
      );
    }
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
              Hekurudha - Register
            </span>

            <div className="wrap-input100 validate-input m-b-23">
              <span className="label-input100">First Name</span>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    label="Type your First Name"
                    id="standard-basic"
                    variant="standard"
                    className="input100"
                    {...field}
                  />
                )}
              />
              {errors.name?.type === "required" && (
                <p className="error">Please enter your name</p>
              )}
            </div>
            <div className="wrap-input100 validate-input m-b-23">
              <span className="label-input100">Last Name</span>
              <Controller
                render={({ field }) => (
                  <TextField
                    label="Type your Last Name"
                    id="standard-basic"
                    variant="standard"
                    className="input100"
                    name="name"
                    {...field}
                  />
                )}
                name="lastname"
                type="text"
                rules={{
                  required: true,
                }}
                control={control}
              />
              {errors.name?.type === "required" && (
                <p className="error">Please enter your lastname</p>
              )}
            </div>
            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Email is required"
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
            </div>
            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Email is required"
            >
              <span className="label-input100">Confirm Email</span>
              <Controller
                render={({ field }) => (
                  <TextField
                    label="Confirm your Email"
                    id="standard-basic"
                    variant="standard"
                    className="input100"
                    name="confirmEmail"
                    {...field}
                  />
                )}
                name="confirmEmail"
                type="text"
                rules={{
                  required: true,
                }}
                control={control}
              />
              {errors.confirmEmail?.type === "required" && (
                <p className="error">Please confirm your Email</p>
              )}
              {emailError && <p className="error">{emailError}</p>}
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

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn">Register</button>
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
              <span className="txt1 p-b-17">Or if you have an account</span>

              <a href="/" className="txt2">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
