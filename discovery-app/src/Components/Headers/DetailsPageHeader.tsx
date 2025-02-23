import { motion } from "framer-motion";
import { NavAnimation } from "../../utils/animations";
import { useContext } from "react";
import { Themes } from "../../Context/ThemeData";
import { IoMoonSharp } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import {  NavLink } from "react-router-dom";

export default function DetailsPageHeader(){
    const { theme, setTheme } = useContext(Themes);
    

    return(
        <header>
            <nav className="container flex justify-between items-center font-Kumbh py-4">
                <NavLink className="font-bold text-xl px-3 py-2 bg-purple-700 text-white rounded-lg" to="/">Home</NavLink>
                <motion.div
                        variants={NavAnimation(0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        className="flex items-center gap-4"
                    >
                        <button onClick={setTheme }>
                            {theme === "dark" ? <FiSun  size={30} className="nav-icon"/> : <IoMoonSharp size={25} className="nav-icon"/>} 
                        </button>
                    </motion.div>

            </nav>
        </header>
    )
}