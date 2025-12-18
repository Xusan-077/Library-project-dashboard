import { useTranslation } from "react-i18next";
import { useThemeStore } from "../store/useThemeStore";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../API/API";
import { useEffect, useState } from "react";
import Sikleton from "../components/Sikleton";
import BookItem from "../components/BookItem";

export default function Dashboard() {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const [ActiveLibraries, setActiveLibraries] = useState(0);

  const [deleteItemId, setDeleteItemId] = useState(null);

  const {
    data: books,
    isLoading: BookssLoading,
    error: booksError,
  } = useQuery({
    queryFn: async () => {
      const res = await API.get(`books/books`);

      return res?.data;
    },

    queryKey: ["books"],
  });

  const { data: libraries, isLoading: LibrariesLoading } = useQuery({
    queryFn: async () => {
      const res = await API.get(`libraries/libraries/`);
      return res?.data;
    },
    queryKey: ["libraries"],
  });

  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPage = books?.length;

  const start = pageSize * page;
  const end = start + pageSize;

  const pagination = books?.slice(start, end);

  useEffect(() => {
    const count = libraries?.filter((lib) => lib.is_active).length || 0;
    setActiveLibraries(count);
  }, [libraries]);

  return (
    <div className="">
      <div className="">
        <h2
          className={`${
            theme == "light" ? "text-black" : "text-white"
          } text-[32px] font-bold mb-[27px]`}
        >
          {t("dashboard.title")}
        </h2>

        <div className="">
          <div className="grid grid-cols-3 gap-5 items-center justify-between mb-6 ">
            <div
              className={`${
                theme === "light"
                  ? "bg-white"
                  : "bg-[#273142FF] border border-[#313D4F]"
              } rounded-lg p-4`}
            >
              <div className="flex justify-between">
                <div className="">
                  <h3
                    className={`text-[16px] ${
                      theme == "light" ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {t("dashboard.totalLibrary")}
                  </h3>

                  <span
                    className={`${
                      theme == "light" ? "text-black" : "text-white"
                    } text-[28px] block mt-4 font-bold`}
                  >
                    {libraries ? libraries?.length : 0}
                  </span>
                </div>
                <div className="bg-[#FEC53D] w-[60px] h-[60px] flex items-center justify-center rounded-lg">
                  <i
                    className={`text-white text-[24px] bi bi-building-fill`}
                  ></i>
                </div>
              </div>
              <span
                className={`text-[16px] block mt-5 ${
                  theme == "light" ? "" : "text-gray-300"
                }`}
              >
                {t("dashboard.ourTotalLibrary")}
              </span>
            </div>
            <div
              className={`${
                theme === "light"
                  ? "bg-white"
                  : "bg-[#273142FF] border border-[#313D4F]"
              } rounded-lg p-4`}
            >
              <div className="flex justify-between">
                <div className="">
                  <h3
                    className={`${
                      theme == "light" ? "text-gray-500" : "text-gray-400"
                    } text-[16px] `}
                  >
                    {t("dashboard.ActiveLibrary")}
                  </h3>

                  <span
                    className={`${
                      theme == "light" ? "text-black" : "text-white"
                    } text-[28px] block mt-4 font-bold`}
                  >
                    {ActiveLibraries || 0}
                  </span>
                </div>
                <div className="bg-[#4AD991] w-[60px] h-[60px] flex items-center justify-center rounded-lg">
                  <i
                    className={`text-[#D9F7E7FF] text-[24px] bi bi-graph-up-arrow`}
                  ></i>
                </div>
              </div>
              <span
                className={`text-[16px] block mt-5 ${
                  theme == "light" ? "" : "text-gray-300"
                }`}
              >
                {t("dashboard.ourTotalLibrary")}
              </span>
            </div>
            <div
              className={`${
                theme === "light"
                  ? "bg-white"
                  : "bg-[#273142FF] border border-[#313D4F]"
              } rounded-lg p-4`}
            >
              <div className="flex justify-between">
                <div className="">
                  <h3
                    className={`${
                      theme == "light" ? "text-gray-500" : "text-gray-400"
                    } text-[16px] `}
                  >
                    {t("dashboard.totalBooks")}
                  </h3>

                  <span
                    className={`${
                      theme == "light" ? "text-black" : "text-white"
                    } text-[28px] block mt-4 font-bold`}
                  >
                    {books?.length || 0}
                  </span>
                </div>
                <div className="bg-[#8280FF] w-[60px] h-[60px] flex items-center justify-center rounded-lg">
                  <i
                    className={`text-[#D9F7E7FF] text-[24px] bi bi-journal-text`}
                  ></i>
                </div>
              </div>
              <span
                className={`text-[16px] block mt-5 ${
                  theme == "light" ? "" : "text-gray-300"
                }`}
              >
                {t("dashboard.OurTotalBooks")}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`${
            theme === "light"
              ? "bg-white"
              : "bg-[#273142FF] border border-[#313D4F]"
          } rounded-lg p-4`}
        >
          <div className="">
            <h2
              className={`${
                theme == "light" ? "text-[#202224]" : "text-white"
              }  text-[24px] font-semibold mb-4.5`}
            >
              {t("dashboard.DealsDetails")}
            </h2>

            <div className="">
              <div className="">
                <div
                  className={`${
                    theme == "light"
                      ? "bg-[#FCFDFD] border-b-[#D5D5D5] "
                      : "bg-[#323D4EFF] border-none"
                  } p-[0_20px] rounded-t-lg border-b  grid grid-cols-[60px_1fr_1fr_1fr_130px] items-center`}
                >
                  <span
                    className={`${
                      theme == "light" ? "" : "text-gray-300"
                    } px-4 py-3 text-[14px] font-bold`}
                  >
                    {t("common.like")}
                  </span>
                  <span
                    className={`${
                      theme == "light" ? "" : "text-gray-300"
                    } px-4 py-3 text-[14px] font-bold`}
                  >
                    {t("common.name")}
                  </span>
                  <span
                    className={`${
                      theme == "light" ? "" : "text-gray-300"
                    } px-4 py-3 text-[14px] font-bold`}
                  >
                    {t("common.author")}
                  </span>
                  <span
                    className={`${
                      theme == "light" ? "" : "text-gray-300"
                    } px-4 py-3 text-[14px] font-bold`}
                  >
                    {t("common.publisher")}
                  </span>
                  <span
                    className={`${
                      theme == "light" ? "" : "text-gray-300"
                    } px-4 py-3 text-[14px] font-bold`}
                  >
                    {t("common.total")}
                  </span>
                </div>

                {booksError ? (
                  <div className="flex h-[500px] items-center justify-center gap-3">
                    <i className="text-red-700 text-[30px]  bi bi-search"></i>
                    <span className="text-red-500 text-[30px]">
                      {t("books.notFound")}
                    </span>
                  </div>
                ) : (
                  <div className="">
                    <ul className="">
                      {BookssLoading ? (
                        Array.from({ length: 10 }).map((el, index) => (
                          <Sikleton key={index} />
                        ))
                      ) : pagination.length ? (
                        pagination?.map((el) => (
                          <BookItem
                            setDeleteItemId={setDeleteItemId}
                            deleteItemId={deleteItemId}
                            key={el.id}
                            fav
                            dash
                            book={el}
                          />
                        ))
                      ) : (
                        <div className="flex h-[500px] items-center justify-center gap-3">
                          <i className="text-red-700 text-[30px]  bi bi-search"></i>
                          <span className="text-red-500 text-[30px]">
                            Book not found
                          </span>
                        </div>
                      )}
                    </ul>
                    <div className="flex items-center justify-between mt-5">
                      <span
                        className={`${
                          theme == "light" ? "text-[#202224]" : "text-[#979797]"
                        } text-[14px] font-semibold `}
                      >
                        {t("common.showing")} {page}-{page * pageSize}{" "}
                        {t("common.of")} {""}
                        {Math.ceil(totalPage / pageSize) - 1}
                      </span>
                      <div
                        className={`${
                          theme == "light"
                            ? "border-gray-300"
                            : "bg-[#323D4EFF] border-gray-500"
                        } flex justify-end max-w-[90px] w-full items-center border  rounded-lg box-border`}
                      >
                        <button
                          disabled={page == 1}
                          onClick={() => setPage((p) => p - 1)}
                          className={`${
                            theme == "light"
                              ? "border-gray-300"
                              : "border-gray-500"
                          } w-[45px] h-10 border-r disabled:opacity-50 cursor-pointer flex items-center justify-center`}
                        >
                          <i
                            className={`${
                              theme == "light" ? "text-[#202224]" : "text-white"
                            } text-[18px] font-blod bi bi-arrow-left`}
                          ></i>
                        </button>
                        <button
                          disabled={page == Math.ceil(totalPage / pageSize) - 1}
                          onClick={() => setPage((p) => p + 1)}
                          className="w-[45px] h-10 cursor-pointer disabled:opacity-50  flex items-center justify-center"
                        >
                          <i
                            className={`${
                              theme == "light" ? "text-[#202224]" : "text-white"
                            } text-[18px] font-blod bi bi-arrow-right`}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
