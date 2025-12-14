import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { useEffect } from "react";

export default function Profile() {
  const { theme } = useThemeStore();
  const { user, setIsAuth, setUser } = useAuthStore();

  const { data: userAction } = useQuery({
    queryFn: async () => {
      const res = await API.get("/auth/admin/profile/");

      return res?.data;
    },
    queryKey: ["user Data"],
  });

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
              <button className="p-[8px_20px] flex items-center gap-3 cursor-pointer bg-red-700 rounded-lg">
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
