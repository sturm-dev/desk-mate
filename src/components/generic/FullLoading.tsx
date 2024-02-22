import { Font_Lato100 } from "@/fonts"

export const FullLoading = () => (
  <div className="flex flex-1 flex-col items-center justify-center text-xl">
    <div>
      <p
        className="absolute -ml-10 -mt-16 w-full tracking-widest opacity-40"
        style={{ fontFamily: Font_Lato100.style.fontFamily }}>
        Loading your ...
      </p>
      <div className="flex flex-row justify-center">
        <p
          className="text-6xl"
          style={{ fontFamily: Font_Lato100.style.fontFamily }}>
          desk-mate
        </p>
        <p className="ml-2 text-6xl">🐒</p>
      </div>
    </div>
  </div>
)
