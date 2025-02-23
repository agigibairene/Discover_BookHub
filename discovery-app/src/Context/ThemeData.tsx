/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useEffect, useState } from "react";


interface Props{
    children: ReactNode;
}

interface ThemeContext{
    theme: string;
    setTheme: () => void;
}

export const Themes = createContext<ThemeContext>({
    theme: "light",
    setTheme: ()=>{},
});

export default function ThemeProvider({children} : Props){
    const [theme, setTheme] = useState<string>(() => {
        return localStorage.getItem("theme") || "light"; 
    });

    function handleTheme() {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme); 
            return newTheme;
        });
    }

    useEffect(() => {
        localStorage.setItem("theme", theme); 
    }, [theme]);

    const values: ThemeContext = {
        theme,
        setTheme: handleTheme
    }

    return(
        <Themes.Provider value={values}>
            {children}
        </Themes.Provider>
    )
}