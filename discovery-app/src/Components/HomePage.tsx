import { motion } from "framer-motion";
import { SlideRight } from "../utils/animations";
import Lottie from "lottie-react";
import animation from "../assets/animation.json";
import { IoIosCall } from "react-icons/io";
import { Link } from "react-router-dom";

export default function HomePage(){
    return(
        <section  >
            <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[600px] px-12 mx-7">
                <div className="flex flex-col justify-center py-14 md:py-0">
                    <div className="text-center md:text-left space-y-6">
                        <motion.h1 
                            className="text-5xl lg:text-6xl home-h1 font-bold leading-relaxed"
                            variants={SlideRight(0.6)}
                            initial="hidden"
                            animate="visible"
                        >
                            Never wonder what to <span>read📖 next!!</span> Uncover the mystery here 
                        </motion.h1>
                        <motion.p
                            variants={SlideRight(1.2)}
                            initial="hidden"
                            animate="visible"
                            className="text-lg xl:max-w-[500px] font-OpenSans home-para"
                        >
                            Welcome to Discover, your go-to destination for discovering books that inspire, educate, and entertain.
                            We’ve got you covered
                        </motion.p>
                        <motion.div 
                            variants={SlideRight(1.6)}
                            initial="hidden"
                            animate="visible"
                            className="flex justify-center items-center gap-8 md:justify-start !mt-7 font-inter"
                        >
                            <button className="home-btn hover:!scale-110 flex items-center gap-2 py-3 font-semibold px-5">
                                Explore books
                            </button>
                            <Link to="/contact" className="contact flex justify-center items-center gap-2 font-bold">
                                <IoIosCall size={30} /> Contact us
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <Lottie animationData={animation} loop={true} className="h-[450px] w-[450px]"/>
                </div>
            </div>
        </section>
    )
}

