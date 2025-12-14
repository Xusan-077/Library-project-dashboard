import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";

export default function BookItem({ book }) {
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/book/${book?.id}`)}
      className={`${
        theme == "light"
          ? "bg-white border-[#D5D5D5]"
          : "bg-[#252E3EFF] border-b-[#323D4EFF]"
      } border-b p-[0_20px] cursor-pointer grid grid-cols-[60px_1fr_1fr_1fr_130px_100px] items-center`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${
          theme == "light" ? "" : "text-gray-300"
        } text-[14px] w-full cursor-pointer font-bold p-5`}
      >
        <i className={`bi bi-heart text-[16px]`}></i>
      </button>
      <h2
        className={`${
          theme == "light" ? "" : "text-gray-300"
        } text-[14px]  font-bold p-5`}
      >
        {book?.name}
      </h2>
      <h2
        className={`${
          theme == "light" ? "" : "text-gray-300"
        } text-[14px]  font-bold p-5`}
      >
        {book?.author}
      </h2>
      <h2
        className={`${
          theme == "light" ? "" : "text-gray-300"
        } text-[14px]  font-bold p-5`}
      >
        {book?.publisher}
      </h2>
      <h2
        className={`${
          theme == "light" ? "" : "text-gray-300"
        } text-[14px]  font-bold p-5`}
      >
        {book?.quantity_in_library}
      </h2>
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${
          theme == "light" ? "" : "text-gray-300"
        } text-[14px] cursor-pointer font-bold p-5 flex justify-center`}
      >
        <i className={` text-[20px] bi bi-three-dots`}></i>
      </button>
    </li>
  );
}
