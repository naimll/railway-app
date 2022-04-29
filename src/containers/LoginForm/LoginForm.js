import React from "react";
import $ from "jquery";
import "./LoginForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogo from "../../images/google-brands.svg";
import { Link } from "react-router-dom";

import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  (function ($) {
    // validimet dhe responsiviteti
    $(".input100").each(function () {
      $(this).on("blur", function () {
        if ($(this).val().trim() != "") {
          $(this).addClass("has-val");
        } else {
          $(this).removeClass("has-val");
        }
      });
    });

    var input = $(".validate-input .input100");

    $(".validate-form").on("submit", function () {
      var check = true;

      for (var i = 0; i < input.length; i++) {
        if (validate(input[i]) === false) {
          showValidate(input[i]);
          check = false;
        }
      }

      return check;
    });

    $(".validate-form .input100").each(function () {
      $(this).focus(function () {
        hideValidate(this);
      });
    });

    function validate(input) {
      if (
        $(input).attr("type") === "email" ||
        $(input).attr("name") === "email"
      ) {
        if (
          $(input)
            .val()
            .trim()
            .match(
              /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
            ) == null
        ) {
          return false;
        }
      } else {
        if ($(input).val().trim() === "") {
          return false;
        }
      }
    }

    function showValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).addClass("alert-validate");
    }

    function hideValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).removeClass("alert-validate");
    }
  })($);

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 ">
          <form className="login100-form validate-form">
            <span className="login100-form-title p-b-49">
              Hekurudha - Login
            </span>

            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Username is required"
            >
              <span className="label-input100">Username</span>
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Type your username"
              />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <span className="label-input100">Password</span>
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Type your password"
              />
              <span className="focus-input100" data-symbol="&#xf190;"></span>
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
