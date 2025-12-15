import { useQuery } from "@tanstack/react-query";
import { useThemeStore } from "../store/useThemeStore";
import { API } from "../../API/API";
import { useState } from "react";
import BookItem from "../components/BookItem";
import Sikleton from "../components/Sikleton";

export default function Books() {
  const { theme } = useThemeStore();
  const [tabs, setTabs] = useState("All Books");
  const [search, setSearch] = useState("");

  const [deleteItemId, setDeleteItemId] = useState(null);

  const { data: books, isLoading: librariesLoading } = useQuery({
    queryFn: async () => {
      const res = await API.get(`/books/books`);

      return res?.data;
    },

    queryKey: ["books"],
  });

  const BookssSort = (() => {
    if (!books) return [];

    const list = [...books];

    if (search !== "") {
      const filtered = list.filter((el) =>
        el.name.toLowerCase().includes(search.trim().toLowerCase())
      );

      return filtered;
    }

    if (tabs === "All Books") {
      return list;
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
  const pageSize = 8;
  const totalPage = BookssSort?.length;

  const start = pageSize * page;
  const end = start + pageSize;

  const pagination = BookssSort?.slice(start, end);

  return (
    <div className="">
      <div className="">
        <h2
          className={`${
            theme == "light" ? "text-black" : "text-white"
          } text-[32px] font-bold mb-[27px]`}
        >
          Books
        </h2>

        <div className="">
          <div className="">
            <div className="flex items-center justify-between mb-6 ">
              <div
                className={`${
                  theme == "light"
                    ? "bg-white border-gray-300"
                    : "border-gray-600"
                } grid border  rounded-lg grid-cols-[50px_1fr_1fr_1fr] max-w-[700px] w-full`}
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
                {["All Books", "A-Z", "Z-A"].map((el) => (
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
                ))}
              </div>
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
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className={`${
                      theme == "light"
                        ? ""
                        : "placeholder:text-[#CFCFCF] text-[#CFCFCF]"
                    } outline-none`}
                    placeholder="search book"
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
                } p-[0_20px] rounded-t-lg border-b  grid grid-cols-[60px_1fr_1fr_1fr_130px_100px] items-center`}
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
                <span
                  className={`${
                    theme == "light" ? "" : "text-gray-300"
                  } px-4 py-3 text-center text-[14px] font-bold`}
                >
                  ACTIONS
                </span>
              </div>
              <ul className="">
                {librariesLoading ? (
                  Array.from({ length: 10 }).map((el, index) => (
                    <Sikleton key={index} />
                  ))
                ) : pagination.length ? (
                  pagination?.map((el) => (
                    <BookItem
                      setDeleteItemId={setDeleteItemId}
                      deleteItemId={deleteItemId}
                      key={el.id}
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
  );
}
