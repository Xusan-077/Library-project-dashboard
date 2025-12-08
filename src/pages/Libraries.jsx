import { useThemeStore } from "../store/useThemeStore";

export default function Libraries() {
  const { theme } = useThemeStore();

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
      </div>
    </div>
  );
}
