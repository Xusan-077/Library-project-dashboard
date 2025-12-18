import { useQuery } from "@tanstack/react-query";
import { useThemeStore } from "../store/useThemeStore";
import { API } from "../../API/API";
import { useState, useMemo, useEffect } from "react";
import LibraryItem from "../components/LibraryItem";
import Sikleton from "../components/Sikleton";
import { useTranslation } from "react-i18next";

export default function Libraries() {
  const { theme } = useThemeStore();
  const { t } = useTranslation();

  const [tabs, setTabs] = useState(t("common.active"));
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [activeItemId, setActiveItemId] = useState(null);

  const pageSize = 8;

  const {
    data: libraries,
    isLoading: librariesLoading,
    error: libraryError,
  } = useQuery({
    queryFn: async () => {
      const res = await API.get(`libraries/libraries/`);
      return res?.data;
    },
    queryKey: ["libraries"],
  });

  useEffect(() => {
    setTabs(t("common.active"));
  }, [t("common.active")]);

  const LibrariesSort = useMemo(() => {
    if (!libraries) return [];

    let list = [...libraries];

    if (search.trim() !== "") {
      const term = search.trim().toLowerCase();
      list = list.filter((el) => el.name.toLowerCase().includes(term));
      return list;
    }

    if (tabs === t("common.active")) {
      return list.filter((el) => el.is_active === true);
    }

    if (tabs === t("common.notActive")) {
      return list.filter((el) => el.is_active !== true);
    }

    if (tabs === t("common.lotNook")) {
      return list.sort((a, b) => b.total_books - a.total_books);
    }

    if (tabs === "A-Z") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (tabs === "Z-A") {
      return list.sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }, [libraries, tabs, search]);

  const totalItems = LibrariesSort.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pagination = LibrariesSort.slice(start, end);

  return (
    <div className="">
      <div className="">
        <h2
          className={`${
            theme == "light" ? "text-black" : "text-white"
          } text-[32px] font-bold mb-[27px]`}
        >
          {t("libraries.title")}
        </h2>

        <div className="">
          <div className="">
            <div className="">
              <div className="flex gap-5 items-center justify-between mb-6">
                <div
                  className={`${
                    theme == "light"
                      ? "bg-white border-gray-300"
                      : "border-gray-600"
                  } grid border rounded-lg grid-cols-[50px_1fr_1fr_1fr_1fr_1fr] max-w-[700px] w-full`}
                >
                  <div
                    className={`${
                      theme == "light"
                        ? "border-l-gray-300"
                        : "bg-[#273142FF] border-gray-600"
                    } flex items-center justify-center rounded-l-lg`}
                  >
                    <i
                      className={`${
                        theme == "light" ? "" : "text-gray-300"
                      } text-[20px] bi bi-funnel-fill`}
                    ></i>
                  </div>

                  {[
                    t("common.active"),
                    t("common.notActive"),
                    t("common.lotNook"),
                    "A-Z",
                    "Z-A",
                  ].map((el) => (
                    <div
                      key={el}
                      onClick={() => {
                        setTabs(el);
                        setPage(1);
                      }}
                      className={`${
                        theme == "light"
                          ? "border-l-gray-300"
                          : "bg-[#273142FF] border-gray-600 text-gray-300"
                      } ${el == "Z-A" ? "rounded-r-lg" : ""} ${
                        el == tabs ? "text-gray-600" : ""
                      } p-[15px_20px] border-l text-center font-semibold cursor-pointer`}
                    >
                      {el}
                    </div>
                  ))}
                </div>

                {/* SEARCH FIELD */}
                <div className="max-w-[300px] w-full">
                  <div
                    className={`${
                      theme == "light" ? "border-[#D5D5D5]" : "border-[#CFCFCF]"
                    } p-[15px_0_15px_30px] flex gap-5 items-center rounded-2xl w-full border`}
                  >
                    <i
                      className={`${
                        theme == "light" ? "" : "text-[#CFCFCF]"
                      } bi bi-search`}
                    ></i>

                    <input
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                      }}
                      type="text"
                      className={`${
                        theme == "light"
                          ? ""
                          : "placeholder:text-[#CFCFCF] text-[#CFCFCF]"
                      } outline-none`}
                      placeholder={t("libraries.search")}
                    />
                  </div>
                </div>
              </div>

              <div className="">
                <div
                  className={`${
                    theme == "light"
                      ? "bg-[#FCFDFD] border-b-[#D5D5D5] "
                      : "bg-[#323D4EFF] border-none"
                  } p-[0_20px] rounded-t-lg border-b grid grid-cols-[60px_1fr_3fr_150px_120px_100px] items-center`}
                >
                  {[
                    t("common.like"),
                    t("common.name"),
                    t("common.address"),
                    t("common.total"),
                    t("common.status"),
                    t("common.actions"),
                  ].map((el) => (
                    <span
                      key={el}
                      className={`${theme == "light" ? "" : "text-gray-300"} ${
                        el == "ACTIONS" ? "text-center" : ""
                      } px-4 py-3 text-[14px] font-bold`}
                    >
                      {el}
                    </span>
                  ))}
                </div>

                {libraryError ? (
                  <div className="flex h-[500px] items-center justify-center gap-3">
                    <i className="text-red-700 text-[30px]  bi bi-search"></i>
                    <span className="text-red-500 text-[30px]">
                      {t("libraries.notFound")}
                    </span>
                  </div>
                ) : (
                  <div className="">
                    <ul className="">
                      {librariesLoading ? (
                        Array.from({ length: 10 }).map((_, index) => (
                          <Sikleton key={index} />
                        ))
                      ) : LibrariesSort.length ? (
                        pagination.map((el) => (
                          <LibraryItem
                            activeItemId={activeItemId}
                            setActiveItemId={setActiveItemId}
                            key={el.id}
                            library={el}
                          />
                        ))
                      ) : (
                        <div className="flex h-[500px] items-center justify-center gap-3">
                          <i className="text-red-700 text-[30px]  bi bi-search"></i>
                          <span className="text-red-500 text-[30px]">
                            {t("libraries.notFound")}
                          </span>
                        </div>
                      )}
                    </ul>
                    <div className="flex items-center justify-between mt-5">
                      <span
                        className={`${
                          theme == "light" ? "text-[#202224]" : "text-[#979797]"
                        } text-[14px] font-semibold`}
                      >
                        {t("common.showing")} {start + 1}-
                        {Math.min(end, totalItems)} {t("common.of")}{" "}
                        {totalItems}
                      </span>

                      <div
                        className={`${
                          theme == "light"
                            ? "border-gray-300"
                            : "bg-[#323D4EFF] border-gray-500"
                        } flex justify-end max-w-[90px] w-full items-center border rounded-lg`}
                      >
                        <button
                          disabled={page === 1}
                          onClick={() => setPage((p) => p - 1)}
                          className={`${
                            theme == "light"
                              ? "border-gray-300"
                              : "border-gray-500"
                          } w-[45px] h-10 border-r disabled:opacity-50 flex items-center justify-center`}
                        >
                          <i
                            className={`${
                              theme == "light" ? "text-[#202224]" : "text-white"
                            } text-[18px] bi bi-arrow-left`}
                          ></i>
                        </button>

                        <button
                          disabled={page === totalPages}
                          onClick={() => setPage((p) => p + 1)}
                          className="w-[45px] h-10 disabled:opacity-50 flex items-center justify-center"
                        >
                          <i
                            className={`${
                              theme == "light" ? "text-[#202224]" : "text-white"
                            } text-[18px] bi bi-arrow-right`}
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
