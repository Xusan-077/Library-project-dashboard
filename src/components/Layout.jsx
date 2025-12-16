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
        } max-[1200px]:hidden fixed top-0 left-0 h-screen w-60 z-20`}
      >
        <LeftComponent />
      </aside>

      <header
        className={`${
          theme == "light"
            ? "border-gray-300 bg-white"
            : "bg-[#273142FF] border-none"
        } max-[1200px]:w-full max-[1200px]:top-0 max-[1200px]:left-0 fixed top-0 shadow-bottom left-60 w-[calc(100%-240px)] z-110`}
      >
        <Header />
      </header>

      <main className="p-[30px] ml-60 mt-20 max-[1200px]:mb-25">
        <Outlet />
      </main>
    </div>
  );
}
