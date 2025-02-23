import { useContext, useState, RefObject } from "react";
import logo from "../../assets/book.png";
import { IoMoonSharp } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { Themes } from "../../Context/ThemeData";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import { NavAnimation } from "../../utils/animations";
import SearchBar from "../../utils/SearchBar";

interface NavList {
    name: string;
    route: string;
    label: string;
}
const navList : NavList[] = [
    {name: "Home", route: "/", label: "home"},
    {name: "Authors", route: "/authors", label: "authors"},
    {name: "Discover", route: "/discover", label: "bookSection"},
    // {name: "Genres", route: "/genres", label: "bookSection"},
    {name: "Library", route: "/library", label: "library"},
];

type RefProps = { 
    refs: { 
        home: RefObject<HTMLDivElement | null>,
        authors: RefObject<HTMLDivElement | null>,
        bookSection: RefObject<HTMLDivElement | null>,
        library: RefObject<HTMLDivElement | null>
    }
}


export default function Header({ refs}: RefProps){
    const { theme, setTheme } = useContext(Themes);
    const [dropDownMenu, setDropDownMenu] = useState<boolean>(false);


    const scrollToSection = (label: keyof RefProps["refs"]) => {
        const elementRef = refs[label];
        if (elementRef && elementRef.current) {
            window.scrollTo({
                top: elementRef.current.offsetTop - 50 , 
                behavior: 'smooth'
            });
        }
        setDropDownMenu(false);
    };

    console.log(theme)

    return(
        <header>
            <nav className="py-5">
                <div className="flex justify-between items-center font-OpenSans">
                    <motion.div 
                        initial={{opacity: 0, scale: 0}}
                        whileInView={{ opacity: 1, scale: 1}}
                        className="flex items-center gap-2 uppercase text-2xl font-bold"
                    >
                        <img className="book-logo mr-2" src={logo} alt="books" />
                        <p className="nav-icon">Discover</p>
                    </motion.div>
                    <div className="hidden md:block">
                        <ul className="flex items-center gap-8  font-Kumbh">
                            {
                                navList.map((navs, index) =>{
                                    const { name, route, label } = navs;
                                    return(
                                        <motion.li 
                                            variants={NavAnimation(0.2*index)}
                                            initial="hidden"
                                            whileInView={"show"}
                                            key={route}
                                            onClick={()=>scrollToSection(label)}
                                        >
                                            <NavLink 
                                                className={({isActive})=> isActive ? "px-4 py-2 rounded-full text-white active" : ""} 
                                                to={route}
                                            >
                                                {name}
                                            </NavLink>
                                        </motion.li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <motion.div
                        variants={NavAnimation(1)}
                        initial="hidden"
                        whileInView={"show"}
                        className="flex items-center gap-4"
                    >
                       {/* <SearchBar /> */}
                        <button onClick={setTheme }>
                            {
                              theme === "dark" ? <FiSun  size={30} className="nav-icon"/> : 
                                <IoMoonSharp size={25} className="nav-icon"/>
                            } 
                        </button>
                    </motion.div>

                    {/* SMALLER SCREENS - HAMBURGER */}
                    <div className="md:hidden">
                        <RxHamburgerMenu onClick={()=>setDropDownMenu(prevState => !prevState)} className="text-4xl nav-icon"/>
                        <AnimatePresence mode="wait">
                            {
                                dropDownMenu && 
                                <motion.div
                                  initial={{opacity: 0, y: -100}}
                                  animate={{opacity: 1, y: 0}}
                                  exit={{opacity: 0, y: -100}}
                                  className="absolute top-20 left-0 w-full h-screen z-10"
                                >
                                    <div className="font-semibold uppercase dropdown-div text-white py-10 m-6 rounded-3xl">
                                        <ul className="flex flex-col justify-center items-center gap-6 font-inter">
                                            {
                                                navList.map(navs =>{
                                                    const { name, route, label } = navs;
                                                    return(
                                                        <li key={route} onClick={()=>scrollToSection(label)}>
                                                            <NavLink className={({isActive})=> isActive ? "px-4 py-2 rounded-full text-white active" : ""}  to={route}>
                                                                {name}
                                                            </NavLink>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>

                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </nav>
        </header>
    )
}