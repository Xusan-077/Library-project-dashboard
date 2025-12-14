import { useQuery } from "@tanstack/react-query";
import { API } from "../../API/API";
import { useParams } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";

import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
  GeolocationControl,
  ZoomControl,
} from "@pbe/react-yandex-maps";

import BookItem from "../components/BookItem";

export default function LibraryDetailPage() {
  const { theme } = useThemeStore();
  const { libraryId } = useParams();

  const isTheme = theme == "light";

  const { data } = useQuery({
    queryFn: async () => {
      const res = await API.get(`/libraries/library/${libraryId}/`);

      return res?.data;
    },
    queryKey: ["library", libraryId],
  });

  console.log(data);

  return (
    <section className="">
      <div className="">
        <div className="">
          <h2
            className={`${
              theme == "light" ? "text-black" : "text-white"
            } text-[32px] font-bold mb-[27px]`}
          >
            Library Detail
          </h2>

          <div className="grid grid-cols-2 gap-5 mb-5">
            <div className="flex flex-col h-full gap-5">
              <div className="mb-[30px]">
                <div
                  className={`${
                    theme == "light" ? "bg-white" : "bg-[#273142FF]"
                  } p-[25px] rounded-lg`}
                >
                  <div className="flex items-center gap-3 pb-5 mb-5 border-b border-b-[#979797] ">
                    <i
                      className={`${
                        isTheme ? "text-[#4880FF]" : "text-white"
                      } text-[26px] bi bi-house-door-fill`}
                    ></i>
                    <h2
                      className={`${
                        isTheme ? "" : "text-white"
                      } text-[22px] font-semibold`}
                    >
                      info about library
                    </h2>
                  </div>

                  <div className="">
                    <div
                      className={`${
                        isTheme ? "bg-gray-100" : "bg-[#323D4EFF]"
                      } rounded-lg mb-3 py-3 px-5 transition-all duration-300 flex items-center gap-2`}
                    >
                      <span
                        className={`${
                          isTheme ? "text-gray-700" : "text-gray-300"
                        } text-[14px] font-medium min-w-[120px]`}
                      >
                        Address:
                      </span>
                      <span
                        className={`${
                          isTheme ? "text-gray-700" : "text-gray-300"
                        } text-[14px] max-w-[340px] font-semibold`}
                      >
                        {data?.results?.library?.address}
                      </span>
                    </div>
                    <div
                      className={`${
                        isTheme ? "bg-gray-100" : "bg-[#323D4EFF]"
                      } rounded-lg py-3 px-5 transition-all duration-300 flex items-center gap-2`}
                    >
                      <span
                        className={`${
                          isTheme ? "text-gray-700" : "text-gray-300"
                        } text-[14px] font-medium min-w-[120px]`}
                      >
                        Phone:
                      </span>
                      <span
                        className={`${
                          isTheme ? "text-gray-700" : "text-gray-300"
                        } text-[14px] max-w-[340px] font-semibold`}
                      >
                        {data?.results?.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <div
                  className={`${
                    theme == "light" ? "bg-white" : "bg-[#273142FF]"
                  } p-[25px] rounded-lg`}
                >
                  <div className="flex items-center gap-3 pb-5 mb-5 border-b border-b-[#979797] ">
                    <i
                      className={`${
                        isTheme ? "text-[#4880FF]" : "text-white"
                      } text-[26px] bi bi-threads`}
                    ></i>
                    <h2
                      className={`${
                        isTheme ? "" : "text-white"
                      } text-[22px] font-semibold`}
                    >
                      social networks
                    </h2>
                  </div>

                  <div className="">
                    <a
                      href={data?.results?.library?.social_media?.instagram}
                      className={`${
                        isTheme ? "bg-gray-100" : "bg-[#323D4EFF]"
                      } rounded-lg mb-3 py-3 px-5 transition-all duration-300 flex items-center gap-5`}
                    >
                      <span
                        className={`${
                          isTheme ? "text-gray-700" : "text-gray-300"
                        } text-[20px]`}
                      >
                        <i
                          className={`${
                            isTheme ? "text-gray-600" : ""
                          } bi bi-instagram`}
                        ></i>
                      </span>
                      <span
                        className={`${
                          isTheme ? "text-gray-700" : "text-gray-300"
                        } text-[18px] max-w-[340px] font-semibold`}
                      >
                        instagram
                      </span>
                    </a>
                    <a
                      href={data?.results?.library?.social_media?.telegram}
                      className={`${
                        isTheme ? "bg-gray-100" : "bg-[#323D4EFF]"
                      } rounded-lg mb-3 py-3 px-5 transition-all duration-300 flex items-center gap-5`}
                    >
                      <span
                        className={`${
                          isTheme ? "text-gray-700" : "text-gray-300"
                        } text-[20px]`}
                      >
                        <i
                          className={`${
                            isTheme ? "text-gray-600" : ""
                          } bi bi-telegram`}
                        ></i>
                      </span>
                      <span
                        className={`${
                          isTheme ? "text-gray-700" : "text-gray-300"
                        } text-[18px] max-w-[340px] font-semibold`}
                      >
                        telegram
                      </span>
                    </a>
                    <a
                      href={data?.results?.library?.social_media?.facebook}
                      className={`${
                        isTheme ? "bg-gray-100" : "bg-[#323D4EFF]"
                      } rounded-lg mb-3 py-3 px-5 transition-all duration-300 flex items-center gap-5`}
                    >
                      <span
                        className={`${
                          isTheme ? "text-gray-700" : "text-gray-300"
                        } text-[20px]`}
                      >
                        <i
                          className={`${
                            isTheme ? "text-gray-600" : ""
                          } bi bi-facebook`}
                        ></i>
                      </span>
                      <span
                        className={`${
                          isTheme ? "text-gray-700" : "text-gray-300"
                        } text-[18px] max-w-[340px] font-semibold`}
                      >
                        Facebook
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div
                className={`${
                  theme == "light" ? "bg-white" : "bg-[#273142FF]"
                } h-full p-[25px] rounded-lg flex flex-col`}
              >
                <div className="flex items-center gap-3 pb-5 mb-5 border-b border-b-[#979797] ">
                  <i
                    className={`${
                      isTheme ? "text-[#4880FF]" : "text-white"
                    } text-[26px] bi bi-geo-alt`}
                  ></i>
                  <h2
                    className={`${
                      isTheme ? "" : "text-white"
                    } text-[22px] font-semibold`}
                  >
                    Library Address
                  </h2>
                </div>
                <div className="flex-1">
                  <YMaps
                    query={{ apikey: import.meta.env.VITE_YANDEX_API_KEY }}
                  >
                    <Map
                      className="w-full h-full"
                      defaultState={{
                        center: [
                          data?.results?.library?.latitude,
                          data?.results?.library?.longitude,
                        ],
                        zoom: 11,
                      }}
                    >
                      <Placemark
                        geometry={[
                          data?.results?.library?.latitude,
                          data?.results?.library?.longitude,
                        ]}
                      />

                      <GeolocationControl options={{ float: "left" }} />
                      <ZoomControl options={{ float: "right" }} />
                    </Map>
                  </YMaps>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              theme == "light" ? "bg-white" : "bg-[#273142FF]"
            } p-[25px] mb-5 flex items-center gap-5 rounded-lg`}
          >
            <div className="">
              <i
                className={`${
                  isTheme ? "text-[#4880FF]" : "text-gray-300"
                } text-[40px] bi bi-journal-bookmark-fill`}
              ></i>
            </div>
            <div className="">
              <div
                className={`${
                  isTheme ? "" : "text-gray-300"
                } text-[20px] font-semibold`}
              >
                {data?.results?.books?.length
                  ? data?.results?.books?.length
                  : 0}
              </div>
              <div
                className={`${
                  isTheme ? "" : "text-gray-300"
                } text-[20px] font-semibold`}
              >
                Total books
              </div>
            </div>
          </div>
          <div
            className={`${
              theme == "light" ? "bg-white" : "bg-[#273142FF]"
            } rounded-lg`}
          >
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
              <div className="">
                {data?.results?.books ? (
                  data?.results?.books?.length ? (
                    data?.results?.books?.map((el) => (
                      <BookItem key={el.id} book={el} />
                    ))
                  ) : (
                    <div className="flex h-[500px] items-center justify-center gap-3">
                      <i className="text-red-700 text-[30px]  bi bi-search"></i>
                      <span className="text-red-500 text-[30px]">
                        Liblary not found
                      </span>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
