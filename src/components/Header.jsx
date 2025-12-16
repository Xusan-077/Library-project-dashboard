import { useQuery } from "@tanstack/react-query";
import { API } from "../../API/API";
import { useEffect, useState } from "react";

import en from "../assets/icons/usa.png";
import uz from "../assets/icons/uzb.png";
import ru from "../assets/icons/rus.png";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [lang, setLang] = useState("en");
  const [langModal, setLangModal] = useState(false);

  const { setUser, setIsAuth, user } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

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

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <div className="flex items-center justify-between p-5">
      <button>
        <i
          className={`${
            theme == "light" ? "" : "text-white"
          } cursor-pointer text-[30px] bi bi-list`}
        ></i>
      </button>

      <div className="flex items-center gap-5">
        <button
          onClick={() => setTheme()}
          className="rounded-[50%] w-[35px] flex  transition-all duration-300 items-center justify-center cursor-pointer h-[35px]"
        >
          {theme == "light" ? (
            <i className="text-[18px]  transition-all duration-300 bi bi-sun"></i>
          ) : (
            <i
              className={`${
                theme == "light" ? "" : "text-white"
              } text-[18px]  transition-all duration-300 bi bi-moon-fill`}
            ></i>
          )}
        </button>

        <div className="relative">
          <div className="">
            <div
              onClick={() =>
                langModal ? setLangModal(false) : setLangModal(true)
              }
              className="flex cursor-pointer items-center gap-5"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    lang == "uz"
                      ? uz
                      : lang == "en"
                      ? en
                      : lang == "ru"
                      ? ru
                      : ""
                  }
                  alt=""
                  className="w-11 h-[30px]"
                />
                <span
                  className={`${
                    theme == "light" ? "" : "text-[#F2F2F2]"
                  } text-[14px] w-10`}
                >
                  {lang == "uz"
                    ? "Uzbek"
                    : lang == "en"
                    ? "English"
                    : lang == "ru"
                    ? "Russian"
                    : ""}
                </span>
              </div>
              <div className="">
                <i
                  className={`${
                    theme == "light" ? "text-[#646464]" : "text-[#D5D5D5]"
                  }  bi bi-caret-down`}
                ></i>
              </div>
            </div>
          </div>
          {langModal && (
            <div
              className={`${
                theme == "light" ? "bg-white" : "bg-[#273142FF]"
              } absolute z-1000 top-[45px]  w-[250px] shadow-2xl left-[-75px] rounded-lg p-4`}
            >
              <div className="">
                <span
                  className={`${
                    theme == "light" ? "" : "text-gray-200"
                  } block border-b -mx-4 px-4 border-b-[#979797] mb-3 pb-3`}
                >
                  Select Language
                </span>
              </div>
              <div
                onClick={() => {
                  setLang("en");
                  setLangModal(false);
                }}
                className="flex p-[15px_0] cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img src={en} alt="" className="w-11 h-[30px]" />
                  <span
                    className={`${
                      theme == "light" ? "" : "text-gray-300"
                    } text-[14px]`}
                  >
                    English
                  </span>
                </div>
                {lang == "en" ? (
                  <div className="">
                    <i
                      className={`${
                        theme == "light" ? "" : "text-white"
                      } text-[20px] bi bi-check-lg`}
                    ></i>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                onClick={() => {
                  setLang("uz");
                  setLangModal(false);
                }}
                className="flex p-[15px_0] cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img src={uz} alt="" className="w-11 h-[30px]" />
                  <span
                    className={`${
                      theme == "light" ? "" : "text-gray-300"
                    } text-[14px]`}
                  >
                    Uzbek
                  </span>
                </div>
                {lang == "uz" ? (
                  <div className="">
                    <i
                      className={`${
                        theme == "light" ? "" : "text-white"
                      } text-[20px] bi bi-check-lg`}
                    ></i>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                onClick={() => {
                  setLang("ru");
                  setLangModal(false);
                }}
                className="flex p-[15px_0] cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img src={ru} alt="" className="w-11 h-[30px]" />
                  <span
                    className={`${
                      theme == "light" ? "" : "text-gray-300"
                    } text-[14px]`}
                  >
                    Russian
                  </span>
                </div>
                {lang == "ru" ? (
                  <div className="">
                    <i
                      className={`${
                        theme == "light" ? "" : "text-white"
                      } text-[20px] bi bi-check-lg`}
                    ></i>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </div>

        <div onClick={() => navigate("/profile")} className="">
          <div className="flex cursor-pointer items-center gap-3">
            <i
              className={`${
                theme == "light" ? "" : "text-gray-300"
              } text-[30px] bi bi-person-circle`}
            ></i>
            <div className="">
              <h2
                className={`${
                  theme == "light" ? "text-black" : "text-gray-200"
                } text-[14px] font-bold`}
              >
                {user?.name || "User"}
              </h2>
              <h3
                className={`${
                  theme == "light" ? "text-black" : "text-gray-300"
                } text-[14px] font-semibold`}
              >
                Admin
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
