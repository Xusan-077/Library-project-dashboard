import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../API/API";
import { toast } from "react-toastify";
import { queryClient } from "../main";
import { useFavoriteStore } from "../store/useFavoriteStore";
import { useTranslation } from "react-i18next";

export default function LibraryItem({
  library,
  activeItemId,
  setActiveItemId,
  fav,
}) {
  const isOpen = activeItemId === library.id;

  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const { FavoriteLibrarys, toggleLibraryToFavorite } = useFavoriteStore();
  const navigate = useNavigate();

  const { mutate: activateLibrary } = useMutation({
    mutationFn: async ({ id, body }) => {
      const res = await API.patch(`/libraries/library/activate/${id}/`, body);
      return res?.data;
    },
    onSuccess: () => {
      toast.success("Library activated successfully");
      setActiveItemId(null);
      queryClient.invalidateQueries(["libraries"]);
    },
    onError: () => {
      toast.error("Failed to activate library");
    },
  });

  const { mutate: deactivateLibrary } = useMutation({
    mutationFn: async ({ id, body }) => {
      const res = await API.patch(`/libraries/library/deactivate/${id}/`, body);
      return res?.data;
    },
    onSuccess: () => {
      toast.success("Library deactivated successfully");
      setActiveItemId(null);
      queryClient.invalidateQueries(["libraries"]);
    },
    onError: () => {
      toast.error("Failed to deactivate library");
    },
  });

  function handleActivate() {
    activateLibrary({
      id: library?.id,
      body: { is_active: true },
    });
  }

  function handleDeactivate() {
    deactivateLibrary({
      id: library?.id,
      body: { is_active: false },
    });
  }

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
      } ${
        !fav
          ? "grid-cols-[60px_1fr_3fr_150px_120px_100px]"
          : "grid-cols-[60px_1fr_3fr_150px_120px]"
      } border-b relative p-[0_20px] cursor-pointer grid  items-center`}
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
        {Boolean(library?.is_active)
          ? t("common.active")
          : t("common.notActive")}
      </span>

      {!fav && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveItemId((prev) =>
                prev === library.id ? null : library.id
              );
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

                Boolean(library?.is_active)
                  ? handleDeactivate()
                  : handleActivate();
              }}
              className={`${
                theme == "light" ? "bg-white " : "bg-gray-700"
              } absolute -bottom-5 z-10 -right-2 p-3 transition-all duration-300 shadow-lg rounded`}
            >
              <button>
                <span
                  className={`${
                    theme == "light" ? "text-gray-600" : "text-white"
                  } block cursor-pointer text-[14px]  rounded-lg`}
                >
                  {library?.is_active
                    ? t("common.Deactivate")
                    : t("common.Activation")}
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </li>
  );
}
