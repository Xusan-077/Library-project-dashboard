import { useQuery } from "@tanstack/react-query";
import { API } from "../../API/API";
import { useParams } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";

export default function BookDetailPage() {
  const { theme } = useThemeStore();
  const { bookId } = useParams();

  const { data } = useQuery({
    queryFn: async () => {
      const res = await API.get(`books/book/${bookId}/`);

      return res?.data;
    },
    queryKey: ["book", bookId],
  });

  return (
    <section className="">
      <div className="">
        <div className="">
          <h2
            className={`${
              theme == "light" ? "text-black" : "text-white"
            } text-[32px] font-bold mb-[27px]`}
          >
            Book Detail
          </h2>

          <div className=""></div>
        </div>
      </div>
    </section>
  );
}
