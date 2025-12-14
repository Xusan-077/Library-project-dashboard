import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const { theme } = useThemeStore();
  const { user, setIsAuth, setUser, logout } = useAuthStore();
  const [logOut, setLogOut] = useState(false);

  const { data: userAction } = useQuery({
    queryFn: async () => {
      const res = await API.get("/auth/admin/profile/");

      return res?.data;
    },
    queryKey: ["user Data"],
  });

  const navigate = useNavigate();

  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  useEffect(() => {
    if (refresh && access) {
      setUser(userAction);
      setIsAuth(true);
    }
  }, [access, refresh]);

  return (
    <div className="">
      {logOut && (
        <div className="fixed top-0 left-0 bg-[#0007] w-full flex items-center justify-center h-screen z-200">
          <div className={`bg-white max-w-[400px] w-full p-[25px] rounded-lg`}>
            <div className="flex justify-between items-center border-b border-b-[#e5e7eb] mb-2">
              <span className={`text-[18px]`}>Log out</span>
              <span
                onClick={() => setLogOut(false)}
                className={`cursor-pointer text-[25px]`}
              >
                &times;
              </span>
            </div>
            <div className="">
              <p className="mb-3 text-[18px] text-center">
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

      <div className="">
        <h2
          className={`${
            theme == "light" ? "text-black" : "text-white"
          } text-[32px] font-bold mb-[27px]`}
        >
          Profile
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
              <button className="p-[8px_20px] flex items-center gap-3 cursor-pointer bg-yellow-700 rounded-lg ">
                <span className="text-[16px]">
                  <i
                    className={`text-white text-[16px] bi bi-pencil-square`}
                  ></i>
                </span>
                <span className="text-white text-[16px]">Edit Profile</span>
              </button>
              <button
                onClick={() => setLogOut(true)}
                className="p-[8px_20px] flex items-center gap-3 cursor-pointer bg-red-700 rounded-lg"
              >
                <span className="text-[16px]">
                  <i className="text-white text-[16px] bi bi-box-arrow-right"></i>
                </span>
                <span className="text-white text-[16px]"> Log out</span>
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
                  Name
                </span>
                <span
                  className={`${
                    theme == "light" ? "" : "text-gray-300"
                  } text-[18px] font-bold`}
                >
                  {user?.name}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[55px] h-[55px] bg-[#CCF0EBFF] rounded-[50%] flex items-center justify-center">
                <i className="text-[24px] bi bi-telephone text-[#00B69BFF]"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] text-[#979797] font-semibold mb-1">
                  Phone
                </span>
                <span
                  className={`${
                    theme == "light" ? "" : "text-gray-300"
                  } text-[18px] font-bold`}
                >
                  {user?.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
