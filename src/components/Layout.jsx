import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LeftComponent from "./LeftComponent";
import { useThemeStore } from "../store/useThemeStore";

export default function Layout() {
  const { theme } = useThemeStore();

  return (
    <div
      className={`${
        theme == "light" ? "bg-[#F5F6FAFF]" : "bg-[#1B2431FF]"
      } min-h-screen flex flex-col`}
    >
      <aside
        className={`${
          theme == "light" ? " bg-white" : "bg-[#273142FF] border-none"
        } max-[1150px]:hidden fixed top-[75px] left-0 h-screen w-60 z-20`}
      >
        <LeftComponent />
      </aside>

      <header
        className={`${
          theme == "light"
            ? "border-gray-300 bg-white"
            : "bg-[#273142FF] border-none"
        } max-[1150px]:w-full max-[1150px]:top-0 max-[1150px]:left-0 fixed top-0 shadow-bottom left-0 w-full z-110`}
      >
        <Header />
      </header>

      <main className="p-[30px_30px_0_30px] ml-60 max-[1150px]:ml-0 mt-20 max-[1150px]:mt-25">
        <Outlet />
      </main>
    </div>
  );
}
