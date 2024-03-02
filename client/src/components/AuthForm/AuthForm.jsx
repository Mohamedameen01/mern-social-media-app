import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

import { GoogleLogin } from "@react-oauth/google";

import { AUTH } from "../../redux/auth/actionTypes";
import { signIn, signUp } from "../../redux/auth/authAction";


function AuthForm() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm();

  const [isSign, setisSign] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearInputs = () => {
    setFormData(initialFormData);
  };

  const onhandleSubmit = () => {
    if (isSign) {
      dispatch(signUp(formData, navigate));
      clearInputs();
    } else {
      dispatch(signIn(formData, navigate));
      clearInputs();
    }
  };

  const googleLogin = async (res) => {
    const token = await res.credential;
    const data = await jwtDecode(res.credential);

    dispatch({ type: AUTH, payload: { token, data } });
    navigate("/");
  };

  return (
    <div className=" mx-auto p-3 border border-blue-400 shadow-lg shadow-slate-700 rounded-lg">
      <h1 className="text-2xl font-bold tracking-wider text-center m-3">
        {isSign ? "Sign up" : "Sign in"}
      </h1>
      <form
        className="grid gap-4"
        action=""
        onSubmit={handleSubmit(onhandleSubmit)}
        autoComplete="off"
        noValidate
      >
        {isSign && (
          <div className="grid md:grid-cols-2 gap-3">
            <div className="grid gap-2">
              <input
                className="rounded-md p-2 outline outline-2 outline-offset-1 outline-blue-500"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                {...register("firstName", {
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Must be more than 3 characters",
                  },
                  maxLength: {
                    value: 7,
                    message: "Must be less than 7 characters",
                  },
                })}
                onChange={handleChange}
              />
              {errors.firstName && <small>{errors.firstName?.message}</small>}
            </div>
            <div className="grid gap-2">
              <input
                className="rounded-md p-2 outline outline-2 outline-offset-1 outline-blue-500"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                {...register("lastName", {
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Must be more than 3 characters",
                  },
                  maxLength: {
                    value: 7,
                    message: "Must be less than 7 characters",
                  },
                })}
                onChange={handleChange}
              />
              {errors.lastName && <small>{errors.lastName?.message}</small>}
            </div>
          </div>
        )}
        <input
          className="rounded-md p-2 outline outline-2 outline-offset-1 outline-blue-500"
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          onChange={handleChange}
        />
        {errors.email && <small>{errors.email?.message}</small>}
        <input
          className="rounded-md p-2 outline outline-2 outline-offset-1 outline-blue-500"
          type="password"
          autoComplete="off"
          placeholder="Password"
          name="password"
          value={formData.password}
          {...register("password", {
            required: "This field is required",
            minLength: { value: 4, message: "Must be more than 4 characters" },
            maxLength: {
              value: 10,
              message: "Must be less than 10 characters",
            },
          })}
          onChange={handleChange}
        />
        {errors.password && <small>{errors.password?.message}</small>}
        {isSign && (
          <input
            className="rounded-md p-2 outline outline-2 outline-offset-1 outline-blue-500"
            type="password"
            autoComplete="off"
            placeholder="Confirm Password"
            name="rePassword"
            value={formData.rePassword}
            {...register("rePassword", {
              required: "This field is required",
              minLength: {
                value: 4,
                message: "Must be more than 4 characters",
              },
              maxLength: {
                value: 10,
                message: "Must be less than 10 characters",
              },
              validate: (value) =>
                value === watch("password", "") ||
                "The passwords do not match ",
            })}
            onChange={handleChange}
          />
        )}
        {errors.rePassword && <small>{errors.rePassword?.message}</small>}
        <button className="font-semibold tracking-wide bg-green-600 text-white mx-2 py-1 rounded-md">
          {isSign ? "Sign up" : "Sign in"}
        </button>
        <div className="flex justify-center items-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              googleLogin(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
        <button>
          {isSign ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => setisSign(!isSign)}
            className="text-blue-600 font-semibold"
          >
            {isSign ? " Sign in" : " Sign up"}
          </span>
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
