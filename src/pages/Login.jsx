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
      login(data);

      navigate("/", {
        replace: true,
      });
      toast.success("Login to profile success");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to login profile");
    },
  });

  function handleLogin(data) {
    loginToProfile(data);
  }

  return (
    <section className="flex items-center justify-center h-screen bg-[#4880FF]">
      <div className=" max-w-[630px] w-full bg-white rounded-2xl p-[90px_57px_90px_57px]">
        <div className="mb-[35px]">
          <h3 className="text-center text-[32px] text-[#202224] font-bold mb-[15px]">
            Login to Account
          </h3>
          <p className="text-center text-[18px] font-semibold">
            Please enter your email and password to continue
          </p>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col">
          <label className="mb-10 flex flex-col">
            <span className="text-[18px] font-semibold text-[#202224] mb-[15px]">
              Phone:
            </span>
            <input
              type="text"
              className="h-15 p-[0_15px] border-[#D8D8D8] outline-none  border rounded-lg bg-[#F1F4F9]"
              name="phone"
              {...register("phone")}
              placeholder="Enter phone"
            />
            <span className="">{errors?.phone?.message}</span>
          </label>
          <label className="mb-[55px] flex flex-col">
            <span className="text-[18px] font-semibold text-[#202224] mb-[15px]">
              Password:
            </span>
            <input
              type="password"
              className="h-15 p-[0_15px] border-[#D8D8D8]  outline-none border rounded-lg bg-[#F1F4F9]"
              name="password"
              {...register("password")}
              placeholder="Enter password"
            />
            <span className="">{errors?.password?.message}</span>
          </label>
          <button
            className="w-full bg-[#4880FF] p-[15px_0] text-[20px] font-bold text-white rounded-lg"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
