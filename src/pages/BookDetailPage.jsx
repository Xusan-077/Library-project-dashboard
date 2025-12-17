import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../../API/API";
import { useNavigate, useParams } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";
import { toast } from "react-toastify";
import { useState } from "react";

export default function BookDetailPage() {
  const { theme } = useThemeStore();
  const { bookId } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);

  const isTheme = theme == "light";
  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryFn: async () => {
      const res = await API.get(`books/book/${bookId}/`);

      return res?.data;
    },
    queryKey: ["book", bookId],
  });

  const { mutate: bookDelete } = useMutation({
    mutationFn: async (id) => {
      const res = await API.delete(`/books/book/${id}/`);

      return res?.data;
    },

    onSuccess() {
      toast.success("Delete book success");
      setDeleteModal(false);
      navigate("/books");
    },
    onError(err) {
      toast.success(err || "Failed to delete book");
    },
  });

  if (error) {
    return <div className="">Book not found</div>;
  }

  return (
    <section className="">
      {deleteModal && (
        <div className="fixed top-0 left-0 bg-[#0004] w-full flex items-center justify-center h-screen z-200">
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
                  {data?.name}
                </span>
              </p>
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => bookDelete(bookId)}
                  className="cursor-pointer p-[8px_20px] bg-red-500 text-white rounded-lg"
                >
                  delete
                </button>
                <button
                  onClick={() => setDeleteModal(false)}
                  className="cursor-pointer p-[8px_20px] bg-gray-400 text-white rounded-lg"
                >
                  cancle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="">
        <div className="">
          <h2
            className={`${
              theme == "light" ? "text-black" : "text-white"
            } text-[32px] font-bold mb-[27px]`}
          >
            Book Detail
          </h2>

          <div
            className={`${
              theme == "light" ? "bg-white" : "bg-[#273142FF]"
            }  p-10 rounded-lg w-full`}
          >
            <div
              className={`  border-b ${
                isTheme ? "border-[#e5e7eb]" : "border-[#979797]"
              } pb-3 mb-5 flex items-center justify-between`}
            >
              <div className="flex items-center gap-5">
                <i
                  className={`${
                    isTheme ? "text-[#4880FF]" : "text-gray-300"
                  } text-[40px] bi bi-journal-bookmark-fill`}
                ></i>
                <span
                  className={`${
                    isTheme ? "" : "text-gray-300"
                  } text-[30px] font-bold`}
                >
                  {data?.name}
                </span>
              </div>
              <div className="">
                <button
                  className="bg-[#4880FF] flex items-center gap-3 p-[8px_20px]  rounded-lg cursor-pointer"
                  onClick={() => setDeleteModal(true)}
                >
                  <i className="text-white bi bi-trash3"></i>
                  <span className={` text-white  text-[16px]`}>
                    delete book
                  </span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div
                className={`${
                  isTheme ? "border-[#e5e7eb]" : "border-[#979797]"
                } border rounded-lg p-5`}
              >
                <div className="flex items-start gap-4">
                  <i
                    className={`${
                      isTheme ? "text-[#4880FF]" : "text-gray-300"
                    } text-[26px] bi bi-person`}
                  ></i>
                  <div className="">
                    <h3
                      className={`${
                        isTheme ? "text-gray-700" : "text-gray-300"
                      } text-[14px] font-medium`}
                    >
                      Author
                    </h3>
                    <span
                      className={`${
                        isTheme ? "text-gray-700" : "text-gray-300"
                      } text-[18px] font-semibold`}
                    >
                      {data?.author}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  isTheme ? "border-[#e5e7eb]" : "border-[#979797]"
                } border rounded-lg p-5`}
              >
                <div className="flex items-start gap-4">
                  <i
                    className={`${
                      isTheme ? "text-[#4880FF]" : "text-gray-300"
                    } text-[26px] bi bi-shop-window`}
                  ></i>
                  <div className="">
                    <h3
                      className={`${
                        isTheme ? "text-gray-700" : "text-gray-300"
                      } text-[14px] font-medium`}
                    >
                      Publisher
                    </h3>
                    <span
                      className={`${
                        isTheme ? "text-gray-700" : "text-gray-300"
                      } text-[18px] font-semibold`}
                    >
                      {data?.publisher}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  isTheme ? "border-[#e5e7eb]" : "border-[#979797]"
                } border rounded-lg p-5`}
              >
                <div className="flex items-start gap-4">
                  <i
                    className={`${
                      isTheme ? "text-[#4880FF]" : "text-gray-300"
                    } text-[26px] bi bi-copy`}
                  ></i>
                  <div className="">
                    <h3
                      className={`${
                        isTheme ? "text-gray-700" : "text-gray-300"
                      } text-[14px] font-medium`}
                    >
                      Quantity
                    </h3>
                    <span
                      className={`${
                        isTheme ? "text-gray-700" : "text-gray-300"
                      } text-[18px] font-semibold`}
                    >
                      {data?.quantity_in_library}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  isTheme ? "border-[#e5e7eb]" : "border-[#979797]"
                } border rounded-lg p-5`}
              >
                <div
                  onClick={() => navigate(`/library/${data?.library}`)}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <i
                    className={`${
                      isTheme ? "text-[#4880FF]" : "text-gray-300"
                    } text-[26px] bi bi-shop-window`}
                  ></i>
                  <div className="">
                    <h3
                      className={`${
                        isTheme ? "text-gray-700" : "text-gray-300"
                      } text-[14px] font-medium`}
                    >
                      Library
                    </h3>
                    <span
                      className={`${
                        isTheme ? "text-[#4880FF] " : "text-gray-300"
                      } text-[18px] font-semibold group-hover:underline`}
                    >
                      Library №{data?.library}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
