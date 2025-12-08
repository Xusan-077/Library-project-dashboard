import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../API/API";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Login() {
  const navigate = useNavigate();

  const { login, user } = useAuthStore();

  console.log("user", user);

  const schema = yup
    .object({
      phone: yup.string().required(),
      password: yup.string().min(6).required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate: loginToProfile } = useMutation({
    mutationFn: async (body) => {
      const res = await API.post("/auth/login/", body);

      return res?.data;
    },
    onSuccess: (data) => {
      toast.success("Login to profile success");
      login(data);

      navigate("/", {
        replace: true,
      });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to login profile");
    },
  });

  function handleLogin(data) {
    loginToProfile(data);
  }

  return (
    <section className="">
      <div className="container">
        <div className="">
          <form onSubmit={handleSubmit(handleLogin)} className="">
            <label className="">
              <span className="">Phone</span>
              <input
                type="text"
                className=""
                name="phone"
                {...register("phone")}
                placeholder="Enter phone"
              />
              <span className="">{errors?.phone?.message}</span>
            </label>
            <label className="">
              <span className="">Password</span>
              <input
                type="text"
                className=""
                name="password"
                {...register("password")}
                placeholder="Enter password"
              />
              <span className="">{errors?.password?.message}</span>
            </label>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
}
