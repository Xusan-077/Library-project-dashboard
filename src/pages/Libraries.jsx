import { useQuery } from "@tanstack/react-query";
import { useThemeStore } from "../store/useThemeStore";
import { API } from "../../API/API";
import { useState } from "react";
import LibraryItem from "../components/LibraryItem";
import Sikleton from "../components/Sikleton";

export default function Libraries() {
  const { theme } = useThemeStore();
  const [tabs, setTabs] = useState("Active");

  const { data: libraries, isLoading: librariesLoading } = useQuery({
    queryFn: async () => {
      const res = await API.get(`libraries/libraries/`);

      return res?.data;
    },

    queryKey: ["libraries"],
  });

  const LibrariesSort = (() => {
    if (!libraries) return [];

    const list = [...libraries];

    if (tabs === "Active") {
      return list.filter((el) => el.is_active === true);
    }

    if (tabs === "Not active") {
      return list.filter((el) => el.is_active !== true);
    }

    if (tabs === "Lot books") {
      return list.sort((a, b) => b.total_books - a.total_books);
    }

    if (tabs === "A-Z") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (tabs === "Z-A") {
      return list.sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  })();

  const [page, setPage] = useState(1);
  const pageSize = 9;
  const totalPage = LibrariesSort?.length;

  const start = pageSize * page;
  const end = start + pageSize;

  const pagination = LibrariesSort?.slice(start, end);

  return (
    <div className="">
      <div className="">
        <h2
          className={`${
            theme == "light" ? "text-black" : "text-white"
          } text-[32px] font-bold mb-[27px]`}
        >
          Libraries
        </h2>

        <div className="">
          <div className="">
            <div className="">
              <div
                className={`${
                  theme == "light"
                    ? "bg-white border-gray-300"
                    : "border-gray-600"
                } grid border  rounded-lg mb-6 grid-cols-[50px_1fr_1fr_1fr_1fr_1fr] max-w-[700px] w-full`}
              >
                <div
                  className={`${
                    theme == "light"
                      ? "border-l-gray-300"
                      : "bg-[#273142FF] border-gray-600"
                  } flex items-center justify-center rounded-l-lg`}
                >
                  <i
                    class={`${
                      theme == "light" ? "" : "text-gray-300"
                    } text-[20px] bi bi-funnel-fill`}
                  ></i>
                </div>
                {["Active", "Not active", "Lot books", "A-Z", "Z-A"].map(
                  (el) => (
                    <div
                      key={el}
                      onClick={() => {
                        setTabs(el);
                        setPage(1);
                      }}
                      className={`${
                        theme == "light"
                          ? " border-l-gray-300"
                          : "bg-[#273142FF] border-gray-600 text-gray-300"
                      } ${el == "Z-A" ? " rounded-r-lg" : ""} ${
                        el == tabs ? "text-gray-600" : ""
                      } p-[15px_20px] border-l text-center font-semibold cursor-pointer`}
                    >
                      {el}
                    </div>
                  )
                )}
              </div>
              <div className="">
                <div
                  className={`${
                    theme == "light"
                      ? "bg-[#FCFDFD] border-b-[#D5D5D5] border-none"
                      : "bg-[#323D4EFF]"
                  } p-[0_20px] rounded-t-lg border-b  grid grid-cols-[60px_1fr_3fr_150px_120px] items-center`}
                >
                  <span
                    className={`${
                      theme == "light" ? "" : "text-gray-300"
                    } px-4 py-3 text-[14px] font-bold`}
                  >
                    Like
                  </span>
                  <span
                    className={`${
                      theme == "light" ? "" : "text-gray-300"
                    } px-4 py-3 text-[14px] font-bold`}
                  >
                    NAME
                  </span>
                  <span
                    className={`${
                      theme == "light" ? "" : "text-gray-300"
                    } px-4 py-3 text-[14px] font-bold`}
                  >
                    ADDRESS
                  </span>
                  <span
                    className={`${
                      theme == "light" ? "" : "text-gray-300"
                    } px-4 py-3 text-[14px] font-bold`}
                  >
                    TOTAl
                  </span>
                  <span
                    className={`${
                      theme == "light" ? "" : "text-gray-300"
                    } px-4 py-3 text-[14px] font-bold`}
                  >
                    STATUS
                  </span>
                </div>
                <ul className="">
                  {librariesLoading ? (
                    Array.from({ length: 10 }).map((el, index) => (
                      <Sikleton key={index} />
                    ))
                  ) : pagination.length ? (
                    pagination?.map((el) => (
                      <LibraryItem key={el.id} library={el} />
                    ))
                  ) : (
                    <div className="">Libraies not found</div>
                  )}
                </ul>
                <div className="flex items-center justify-between mt-5">
                  <span
                    className={`${
                      theme == "light" ? "text-[#202224]" : "text-[#979797]"
                    } text-[14px] font-semibold `}
                  >
                    Showing {page}-{page * pageSize} of {""}
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
                        theme == "light" ? "border-gray-300" : "border-gray-500"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
