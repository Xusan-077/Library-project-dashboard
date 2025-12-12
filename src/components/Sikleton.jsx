import { useThemeStore } from "../store/useThemeStore";

export default function Sikleton() {
  const { theme } = useThemeStore();

  return (
    <div className="">
      <div
        className={`${
          theme == "light" ? "bg-gray-100 border-b-[#D5D5D5]" : "bg-gray-700"
        } gap-5 p-[0_20px] grid grid-cols-[60px_1fr_1fr_1fr_130px_60px] items-center border-b  w-full h-[61px]`}
      >
        <div
          className={`${
            theme == "light" ? "bg-gray-200" : "bg-gray-600"
          } w-full h-[21px] rounded-lg`}
        ></div>
        <div
          className={`${
            theme == "light" ? "bg-gray-200" : "bg-gray-600"
          } w-full h-[21px] rounded-lg`}
        ></div>
        <div
          className={`${
            theme == "light" ? "bg-gray-200" : "bg-gray-600"
          } w-full h-[21px] rounded-lg`}
        ></div>
        <div
          className={`${
            theme == "light" ? "bg-gray-200" : "bg-gray-600"
          } w-full h-[21px] rounded-lg`}
        ></div>
        <div
          className={`${
            theme == "light" ? "bg-gray-200" : "bg-gray-600"
          } w-full h-[21px] rounded-lg`}
        ></div>
      </div>
    </div>
  );
}
