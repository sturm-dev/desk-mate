import { Lato, Mulish } from "next/font/google"

export const Font_Lato100 = Lato({ subsets: ["latin"], weight: "100" })
export const Font_Lato400 = Lato({ subsets: ["latin"], weight: "400" })
export const Font_Mulish200 = Mulish({ subsets: ["latin"], weight: "200" })
export const Font_Mulish500 = Mulish({ subsets: ["latin"], weight: "600" })

// usage: style={{ fontFamily: Font_Lato100.style.fontFamily }}
