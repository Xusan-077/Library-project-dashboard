import { NavLink } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";

import Logo from "../assets/images/Logo.png";
import { useTranslation } from "react-i18next";

export default function LeftComponent() {
  const { theme } = useThemeStore();

  const { t } = useTranslation();

  return (
    <aside className="">
      <div className="p-[24px_0]">
        <div className="mb-[30px]">
          <div className="flex justify-center gap-2">
            <img src={Logo} alt="" className="w-10 h-10" />
            <span
              className={`${
                theme == "light" ? "text-[#202224]" : "text-white"
              } text-[24px] font-bold text-center`}
            >
              LibraSpace
            </span>
          </div>
        </div>
        <div className="p-[0_24px]">
          <nav className="">
            {[
              {
                to: "/books",
                label: t("leftComponent.books"),
                icon: "bi bi-journal",
              },
              {
                to: "/libraries",
                label: t("leftComponent.libraries"),
                icon: "bi bi-journal-bookmark-fill",
              },
              {
                to: "/favorites",
                label: t("leftComponent.favorites"),
                icon: "bi bi-star",
              },
              {
                to: "/addlibrary",
                label: t("leftComponent.AddToLibrary"),
                icon: "bi bi-building-add",
              },
              {
                to: "/profile",
                label: t("leftComponent.profile"),
                icon: "bi bi-person-lines-fill",
              },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${isActive ? "bg-[#4880FF] text-white" : ""} 
       ${theme === "light" ? "text-[#202224] hover:text-white" : "text-white"} 
       py-5 px-4 rounded-lg transition-all hover:bg-[#487fffc7] duration-200 
       flex gap-4 text-[16px] font-semibold mb-2 w-full text-center`
                }
              >
                <i className={item.icon}></i>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
