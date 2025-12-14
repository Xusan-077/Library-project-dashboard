import { useState } from "react";
import { useFavoriteStore } from "../store/useFavoriteStore";
import { useThemeStore } from "../store/useThemeStore";
import BookItem from "../components/BookItem";
import LibraryItem from "../components/LibraryItem";

export default function Favorites() {
  const { theme } = useThemeStore();
  const { FavoriteBooks, FavoriteLibrarys } = useFavoriteStore();

  const [activeItemId, setActiveItemId] = useState(null);
  const [tabs, setTabs] = useState("books");

  return (
    <div className="">
      <div className="">
        <h2
          className={`${
            theme == "light" ? "text-black" : "text-white"
          } text-[32px] font-bold mb-[27px]`}
        >
          Favorites
        </h2>
        <div
          className={`${
            theme == "light" ? "bg-white border-gray-300" : "border-gray-600"
          } grid border  mb-6 rounded-lg grid-cols-[50px_1fr_1fr] max-w-[700px] w-full`}
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
          <div
            onClick={() => setTabs("books")}
            className={`${
              theme == "light"
                ? " border-l-gray-300"
                : "bg-[#273142FF] border-gray-600 text-gray-300"
            } ${
              "books" == tabs ? "text-gray-600" : ""
            } p-[15px_20px] border-l text-center font-semibold cursor-pointer`}
          >
            My favorite books
          </div>
          <div
            onClick={() => setTabs("library")}
            className={`${
              theme == "light"
                ? " border-l-gray-300"
                : "bg-[#273142FF] border-gray-600 text-gray-300"
            } ${
              "library" == tabs ? "text-gray-600" : ""
            } p-[15px_20px] border-l text-center font-semibold cursor-pointer`}
          >
            My favorite Library
          </div>
        </div>

        <div className="">
          {tabs == "books" && (
            <div className="">
              <div
                className={`${
                  theme == "light"
                    ? "bg-[#FCFDFD] border-b-[#D5D5D5] "
                    : "bg-[#323D4EFF] border-none"
                } p-[0_20px] rounded-t-lg border-b grid grid-cols-[60px_1fr_1fr_1fr_130px_100px] items-center`}
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
                {FavoriteBooks.length ? (
                  FavoriteBooks.map((el) => <BookItem key={el.id} book={el} />)
                ) : (
                  <div className="flex h-[500px] items-center justify-center gap-3">
                    <i className="text-red-700 text-[30px]  bi bi-search"></i>
                    <span className="text-red-500 text-[30px]">
                      Book not found
                    </span>
                  </div>
                )}
              </ul>
            </div>
          )}
          {tabs == "library" && (
            <div className="">
              <div
                className={`${
                  theme == "light"
                    ? "bg-[#FCFDFD] border-b-[#D5D5D5] "
                    : "bg-[#323D4EFF] border-none"
                } p-[0_20px] rounded-t-lg border-b grid grid-cols-[60px_1fr_1fr_1fr_130px_100px] items-center`}
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
                {FavoriteLibrarys.length ? (
                  FavoriteLibrarys.map((el) => (
                    <LibraryItem
                      activeItemId={activeItemId}
                      setActiveItemId={setActiveItemId}
                      F
                      key={el.id}
                      library={el}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
