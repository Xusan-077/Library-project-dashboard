import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { API } from "../../API/API";
import { queryClient } from "../main";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { theme } = useThemeStore();
  const { t } = useTranslation();

  const { setIsAuth, setUser, logout } = useAuthStore();
  const [logOut, setLogOut] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const access = localStorage.getItem("access");

  const { data: userAction } = useQuery({
    queryFn: async () => {
      const res = await API.get("/auth/admin/profile/");

      return res?.data;
    },
    queryKey: ["user Data"],
    enabled: !!access,
  });

  const { mutate: editProfile } = useMutation({
    mutationFn: async (body) => {
      const res = await API.patch(`/auth/admin/profile/`, body);

      return res?.data;
    },

    onSuccess: () => {
      toast.success("Success edit profile");
      setEditModal(false);
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("Failed to edit profile");
    },
  });

  const navigate = useNavigate();

  const refresh = localStorage.getItem("refresh");

  useEffect(() => {
    if (refresh && access) {
      setUser(userAction);
      setIsAuth(true);
    }
  }, [access, refresh]);

  const schema = yup
    .object({
      name: yup.string().required(),
      phone: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userAction?.name,
      phone: userAction?.phone,
    },
    resolver: yupResolver(schema),
  });

  function handleEdit(data) {
    editProfile(data);
  }

  return (
    <div className="">
      {logOut && (
        <div className="fixed top-0 left-0 bg-[#0007] w-full flex items-center justify-center h-screen z-200">
          <div
            className={`${
              theme == "light" ? "bg-white" : "bg-[#323D4EFF]"
            } max-w-[400px] w-full p-[25px] rounded-lg`}
          >
            <div className="flex justify-between items-center border-b border-b-[#e5e7eb] mb-2">
              <span
                className={`${
                  theme == "light" ? "text-[#202224]" : "text-gray-300"
                } text-[18px]`}
              >
                {t("profile.logout")}
              </span>
              <span
                onClick={() => setLogOut(false)}
                className={`${
                  theme == "light" ? "text-[#202224]" : "text-gray-300"
                } cursor-pointer text-[25px]`}
              >
                &times;
              </span>
            </div>
            <div className="">
              <p
                className={`${
                  theme == "light" ? "text-[#202224]" : "text-gray-300"
                } mb-3 text-[18px] text-center`}
              >
                Are you sure to log out
              </p>
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => {
                    toast.success("Success log out");
                    logout();
                    navigate("/login");
                  }}
                  className="cursor-pointer p-[8px_20px] bg-red-500 text-white rounded-lg"
                >
                  log out
                </button>
                <button
                  onClick={() => setLogOut(false)}
                  className="cursor-pointer p-[8px_20px] bg-gray-400 text-white rounded-lg"
                >
                  cancle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed top-0 left-0 bg-[#0004] w-full flex items-center justify-center h-screen z-200">
          <div
            className={`${
              theme == "light" ? "bg-white" : "bg-[#323D4EFF]"
            }  max-w-[550px] w-full p-[25px] rounded-lg`}
          >
            <div className="flex justify-between items-center border-b border-b-[#e5e7eb] mb-2">
              <span
                className={`${
                  theme == "light" ? "text-[#202224]" : "text-gray-300"
                } text-[18px]`}
              >
                Edit profile
              </span>
              <span
                onClick={() => setEditModal(false)}
                className={`${
                  theme == "light" ? "text-[#202224]" : "text-gray-300"
                } cursor-pointer text-[25px]`}
              >
                &times;
              </span>
            </div>
            <div className="">
              <form
                onSubmit={handleSubmit(handleEdit)}
                className="flex flex-col"
              >
                <label className="mb-3 flex flex-col">
                  <span
                    className={`${
                      theme == "light" ? "text-[#202224]" : "text-gray-300"
                    } text-[18px] font-semibold text-[#202224] mb-[15px]`}
                  >
                    Name:
                  </span>
                  <input
                    type="text"
                    className={`${
                      theme == "light"
                        ? "bg-[#F1F4F9]"
                        : "text-white placeholder:text-white"
                    } h-15 p-[0_15px] border-[#D8D8D8] outline-none  border rounded-lg`}
                    name="name"
                    {...register("name")}
                    defaultValue={userAction?.name}
                    placeholder="Enter name"
                  />
                  <span className="">{errors?.name?.message}</span>
                </label>
                <label className="mb-3 flex flex-col">
                  <span
                    className={`${
                      theme == "light" ? "text-[#202224]" : "text-gray-300"
                    } text-[18px] font-semibold  mb-[15px]`}
                  >
                    Phone:
                  </span>
                  <input
                    type="phone"
                    className={`${
                      theme == "light"
                        ? "bg-[#F1F4F9]"
                        : "text-white placeholder:text-white"
                    } h-15 p-[0_15px] border-[#D8D8D8]  outline-none border rounded-lg`}
                    name="text"
                    {...register("phone")}
                    defaultValue={userAction?.phone}
                    placeholder="Enter phone"
                  />
                  <span className="">{errors?.phone?.message}</span>
                </label>
                <button
                  className="w-full bg-[#4880FF] p-[15px_0] text-[16px] font-bold text-white rounded-lg"
                  type="submit"
                >
                  Edit profile
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="">
        <h2
          className={`${
            theme == "light" ? "text-black" : "text-white"
          } text-[32px] font-bold mb-[27px]`}
        >
          {t("profile.title")}
        </h2>

        <div
          className={`${
            theme == "light" ? "bg-white" : "bg-[#273142FF]"
          }  p-10 rounded-lg w-full`}
        >
          <div className="flex items-center justify-between mb-10 border-b border-b-[#979797]">
            <div className="">
              <i
                className={`${
                  theme == "light" ? "text-[#979797]" : "text-gray-300"
                } text-[100px] bi bi-person-circle`}
              ></i>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditModal(true)}
                className="p-[8px_20px] flex items-center gap-3 cursor-pointer bg-yellow-700 rounded-lg "
              >
                <span className="text-[16px]">
                  <i
                    className={`text-white text-[16px] bi bi-pencil-square`}
                  ></i>
                </span>
                <span className="text-white text-[16px]">
                  {t("profile.edit")}
                </span>
              </button>
              <button
                onClick={() => setLogOut(true)}
                className="p-[8px_20px] flex items-center gap-3 cursor-pointer bg-red-700 rounded-lg"
              >
                <span className="text-[16px]">
                  <i className="text-white text-[16px] bi bi-box-arrow-right"></i>
                </span>
                <span className="text-white text-[16px]">
                  {t("profile.logout")}
                </span>
              </button>
            </div>
          </div>
          <div className="">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-[55px] h-[55px] bg-[#CCF0EBFF] rounded-[50%] flex items-center justify-center">
                <i className="text-[24px] bi bi-person text-[#00B69BFF]"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] text-[#979797] font-semibold mb-1">
                  {t("profile.name")}
                </span>
                <span
                  className={`${
                    theme == "light" ? "" : "text-gray-300"
                  } text-[18px] font-bold`}
                >
                  {userAction?.name}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[55px] h-[55px] bg-[#CCF0EBFF] rounded-[50%] flex items-center justify-center">
                <i className="text-[24px] bi bi-telephone text-[#00B69BFF]"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] text-[#979797] font-semibold mb-1">
                  {t("profile.phone")}
                </span>
                <span
                  className={`${
                    theme == "light" ? "" : "text-gray-300"
                  } text-[18px] font-bold`}
                >
                  {userAction?.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
