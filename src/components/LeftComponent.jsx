import { NavLink } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";

import { useTranslation } from "react-i18next";
import { useLeftComponent } from "../store/useLeftComponent";

export default function LeftComponent() {
  const { theme } = useThemeStore();

  const { t } = useTranslation();

  return (
    <aside className="">
      <div className="p-[24px_0]">
        <div className="p-[0_24px]">
          <nav className="">
            {[
              {
                to: "/",
                label: t("leftComponent.dashboard"),
                icon: "bi bi-border-all",
              },
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
