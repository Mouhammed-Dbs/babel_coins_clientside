"use client"

import { NextUIProvider } from "@nextui-org/system"
import { ThemeProvider } from "next-themes"

export default function Providers({children}){
    return(
        <NextUIProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
                {children}
            </ThemeProvider>
        </NextUIProvider>
    )
}