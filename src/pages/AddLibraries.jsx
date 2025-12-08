import { useThemeStore } from "../store/useThemeStore";

export default function AddLibraries() {
  const { theme } = useThemeStore();

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
      </div>
    </div>
  );
}
