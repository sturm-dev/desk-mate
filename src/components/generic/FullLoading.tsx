import { Font_Lato100 } from "@/fonts";

export const FullLoading = () => (
  <div className="flex flex-1 flex-col items-center justify-center text-xl">
    <div>
      <p
        className="absolute opacity-20 tracking-widest -mt-16 w-full -ml-10"
        style={{ fontFamily: Font_Lato100.style.fontFamily }}
      >
        Loading your ...
      </p>
      <div className="flex flex-row justify-center">
        <p
          className="text-6xl"
          style={{ fontFamily: Font_Lato100.style.fontFamily }}
        >
          desk-mate
        </p>
        <p className="text-6xl ml-2">🐒</p>
      </div>
    </div>
  </div>
);
