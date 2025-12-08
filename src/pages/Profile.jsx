import { useThemeStore } from "../store/useThemeStore";

export default function Profile() {
  const { theme } = useThemeStore();

  return (
    <div className="">
      <div className="">
        <h2
          className={`${
            theme == "light" ? "text-black" : "text-white"
          } text-[32px] font-bold mb-[27px]`}
        >
          Profile
        </h2>
      </div>
    </div>
  );
}
