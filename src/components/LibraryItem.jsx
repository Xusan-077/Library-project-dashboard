import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";

export default function LibraryItem({ library }) {
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/library/${library?.id}`)}
      className={`${
        theme == "light"
          ? "bg-white border-[#D5D5D5]"
          : "bg-[#252E3EFF] border-b-[#323D4EFF]"
      } border-b p-[0_20px] cursor-pointer grid grid-cols-[60px_1fr_3fr_150px_120px] items-center`}
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
        {library?.name}
      </h2>
      <h2
        className={`${
          theme == "light" ? "" : "text-gray-300"
        } text-[14px]  font-bold p-5`}
      >
        {library?.address}
      </h2>
      <h2
        className={`${
          theme == "light" ? "" : "text-gray-300"
        } text-[14px]  font-bold p-5`}
      >
        {library?.total_books}
      </h2>
      <span
        className={`${
          library?.is_active
            ? `${
                theme == "light"
                  ? "text-[#00B69B] bg-[#CCF0EBFF]"
                  : "text-white bg-[#00B69BFF]"
              } `
            : `${
                theme == "light"
                  ? "text-[#EF3826] bg-[#FCD7D4FF]"
                  : "text-white bg-[#EF3826FF]"
              } `
        } px-4 py-[5px] text-center  rounded-lg`}
      >
        {library?.is_active ? "active" : "not active"}
      </span>
    </li>
  );
}
