import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";
import { useFavoriteStore } from "../store/useFavoriteStore";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../API/API";
import { toast } from "react-toastify";
import { queryClient } from "../main";
import { useState } from "react";

export default function BookItem({ book, deleteItemId, setDeleteItemId }) {
  const { theme } = useThemeStore();
  const { FavoriteBooks, toggleBookToFavorite } = useFavoriteStore();
  const [deleteModal, setDeleteModal] = useState(false);

  const navigate = useNavigate();

  const isOpen = deleteItemId == book?.id;

  const { mutate: bookDelete } = useMutation({
    mutationFn: async (id) => {
      const res = await API.delete(`/books/book/${id}/`);

      return res?.data;
    },

    onSuccess() {
      toast.success("Delete book success");
      setDeleteModal(false);
      setDeleteItemId(null);
      queryClient.invalidateQueries();
    },
    onError(err) {
      toast.success(err || "Failed to delete book");
    },
  });

  return (
    <li
      onClick={(e) => {
        e.stopPropagation();

        navigate(`/book/${book?.id}`);
      }}
      className={`${
        theme == "light"
          ? "bg-white border-[#D5D5D5]"
          : "bg-[#252E3EFF] border-b-[#323D4EFF]"
      } border-b p-[0_20px] relative cursor-pointer grid grid-cols-[60px_1fr_1fr_1fr_130px_100px] items-center`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();

          toggleBookToFavorite(book);
        }}
        className={`${
          theme == "light" ? "" : "text-gray-300"
        } text-[14px] w-full cursor-pointer font-bold p-5`}
      >
        <i
          className={`bi ${
            FavoriteBooks.find((el) => el.id == book?.id)
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

      {isOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setDeleteModal(true);
          }}
          className={`${
            theme == "light" ? "bg-white " : "bg-gray-700"
          } absolute -bottom-5 z-10 -right-4 p-3 transition-all duration-300 shadow-lg rounded`}
        >
          <button>
            <span
              className={`${
                theme == "light" ? "text-gray-600" : "text-white"
              } block cursor-pointer text-[14px]  rounded-lg`}
            >
              Delete book
            </span>
          </button>
        </div>
      )}

      {deleteModal && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed top-0 left-0 bg-[#0004] w-full flex items-center justify-center h-screen z-200"
        >
          <div
            className={`${
              theme == "light" ? "bg-white" : "bg-[#323D4EFF]"
            } max-w-[400px] w-full p-[25px] rounded-lg`}
          >
            <div className="flex justify-between items-center border-b border-b-[#e5e7eb] mb-2">
              <span
                className={`${
                  theme == "light" ? "text-[#202224]" : "text-gray-300"
                } text-[18px]`}
              >
                Delete book
              </span>
              <span
                onClick={() => setDeleteModal(false)}
                className={`${
                  theme == "light" ? "text-[#202224]" : "text-gray-300"
                } cursor-pointer text-[25px]`}
              >
                &times;
              </span>
            </div>
            <div className="">
              <p
                className={`${
                  theme == "light" ? "text-[#202224]" : "text-gray-300"
                } mb-3 text-[18px] text-center`}
              >
                Are you sure to delete book
                <span className="text-red-500 underline ml-2">
                  {book?.name}
                </span>
              </p>
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => bookDelete(book?.id)}
                  className="cursor-pointer p-[8px_20px] bg-red-500 text-white rounded-lg"
                >
                  delete
                </button>
                <button
                  onClick={() => {
                    setDeleteModal(false);
                    setDeleteItemId(null);
                  }}
                  className="cursor-pointer p-[8px_20px] bg-gray-400 text-white rounded-lg"
                >
                  cancle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();

          setDeleteItemId(book?.id);
        }}
        className={`${
          theme == "light" ? "" : "text-gray-300"
        } text-[14px] cursor-pointer font-bold p-5 flex justify-center`}
      >
        <i className={`text-[20px] bi bi-three-dots`}></i>
      </button>
    </li>
  );
}
