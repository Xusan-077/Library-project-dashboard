import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../API/API";
import { toast } from "react-toastify";
import { queryClient } from "../main";
import { useFavoriteStore } from "../store/useFavoriteStore";
import { useEffect } from "react";

export default function LibraryItem({
  library,
  activeItemId,
  setActiveItemId,
}) {
  const isOpen = activeItemId === library.id;

  const { theme } = useThemeStore();
  const { FavoriteLibrarys, toggleLibraryToFavorite } = useFavoriteStore();
  const navigate = useNavigate();

  const { mutate: activateLibrary } = useMutation({
    mutationFn: async (activateId) => {
      const res = await API.patch(`/libraries/library/activate/${activateId}/`);

      return res?.data;
    },
    onSuccess: () => {
      toast.success("Success activate library");
      setActiveItemId(null);
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      toast.error("Failed to activate library");
    },
  });

  const { mutate: deactivateLibrary } = useMutation({
    mutationFn: async (Id) => {
      const res = await API.patch(`/libraries/library/deactivate/${Id}/`);

      return res?.data;
    },
    onSuccess: () => {
      toast.success("Success deactivate library");
      setActiveItemId(null);
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("Failed to deactivate library");
    },
  });

  return (
    <li
      onClick={() => {
        {
          navigate(`/library/${library?.id}`);
        }
      }}
      className={`${
        theme == "light"
          ? "bg-white border-[#D5D5D5]"
          : "bg-[#252E3EFF] border-b-[#323D4EFF]"
      } border-b relative p-[0_20px] cursor-pointer grid grid-cols-[60px_1fr_3fr_150px_120px_100px] items-center`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();

          toggleLibraryToFavorite(library);
        }}
        className={`${
          theme == "light" ? "" : "text-gray-300"
        } text-[14px] w-full cursor-pointer font-bold p-5`}
      >
        <i
          className={`bi ${
            FavoriteLibrarys.find((el) => el.id == library?.id)
              ? "bi bi-heart-fill text-red-500"
              : "bi bi-heart"
          } text-[16px]`}
        ></i>
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
      <button
        onClick={(e) => {
          e.stopPropagation();
          setActiveItemId((prev) => (prev === library.id ? null : library.id));
        }}
        className="cursor-pointer p-5"
      >
        <i
          className={`${
            theme == "light" ? "" : "text-gray-300"
          } bi bi-three-dots`}
        ></i>
      </button>

      {isOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`${
            theme == "light" ? "bg-white " : "bg-gray-700"
          } absolute -bottom-5 z-10 -right-2 p-3 transition-all duration-300 shadow-lg rounded`}
        >
          <button
            onClick={() => {
              Boolean(library?.is_active)
                ? deactivateLibrary(library?.id)
                : activateLibrary(library?.id);
            }}
          >
            <span
              className={`${
                theme == "light" ? "text-gray-600" : "text-white"
              } block cursor-pointer text-[14px]  rounded-lg`}
            >
              {library?.is_active ? "Deactivate" : "Activation"}
            </span>
          </button>
        </div>
      )}
    </li>
  );
}
