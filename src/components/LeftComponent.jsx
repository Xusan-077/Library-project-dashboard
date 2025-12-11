import { NavLink } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";

import Logo from "../assets/images/Logo.png";

export default function LeftComponent() {
  const { theme } = useThemeStore();

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
            <NavLink
              to="/books"
              className={({ isActive }) =>
                `${isActive ? "bg-[#4880FF] text-white" : ""} 
     ${theme === "light" ? "text-black hover:text-white" : "text-white"} 
     py-5 px-4 rounded-lg transition-all hover:bg-[#487fffc7] duration-200 
     flex gap-4 text-[16px] font-semibold mb-2 w-full text-center`
              }
            >
              <i class="bi bi-journal"></i>
              Books
            </NavLink>

            <NavLink
              to="/libraries"
              className={({ isActive }) =>
                `${isActive ? "bg-[#4880FF] text-white" : ""} 
     ${theme === "light" ? "text-[#202224] hover:text-white" : "text-white"} 
     py-5 px-4 rounded-lg transition-all hover:bg-[#487fffc7] duration-200 
     flex gap-4 text-[16px] group font-semibold mb-2 w-full text-center`
              }
            >
              <i className={`bi bi-journal-bookmark-fill`}></i>
              Libraries
            </NavLink>

            <NavLink
              to="/addlibrary"
              className={({ isActive }) =>
                `${isActive ? "bg-[#4880FF] text-white" : ""} 
     ${theme === "light" ? "text-[#202224] hover:text-white" : "text-white"} 
     py-5 px-4 rounded-lg transition-all hover:bg-[#487fffc7] duration-200 
     flex gap-4 text-[16px] font-semibold mb-2 w-full text-center`
              }
            >
              <i class="bi bi-building-add"></i>
              Add Library
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${isActive ? "bg-[#4880FF] text-white" : ""} 
     ${theme === "light" ? "text-[#202224] hover:text-white" : "text-white"} 
     py-5 px-4 rounded-lg transition-all hover:bg-[#487fffc7] duration-200 
     flex gap-4 text-[16px] font-semibold mb-2 w-full text-center`
              }
            >
              <i class="bi bi-person-lines-fill"></i>
              Profile
            </NavLink>
          </nav>
        </div>
      </div>
    </aside>
  );
}
