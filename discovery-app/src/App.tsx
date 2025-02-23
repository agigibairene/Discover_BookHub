import { useContext, useEffect, useRef  } from "react";
import Header from "./Components/Headers/Header";
import { Themes } from "./Context/ThemeData";
import HomePage from "./Components/HomePage";
import AuthorsComponent from "./Components/AuthorsComponent";
import BooksSection from "./Components/BooksSection";
import { FaArrowUp } from "react-icons/fa";
import ScrollToTop from "react-scroll-to-top";
import Library from "./Components/Library";
import Footer from "./Components/Footer";


function App() {
  const home = useRef<HTMLDivElement | null>(null);
  const authors = useRef<HTMLDivElement>(null);
  const bookSection = useRef<HTMLDivElement>(null);
  const library = useRef<HTMLDivElement>(null);
  

  const { theme } = useContext(Themes);
  const refs = {home, authors, bookSection, library};

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);
  

  return (
    <>
      <Header refs={refs}/>
      <div ref={home}><HomePage /></div>
      <div ref={authors}><AuthorsComponent /></div>
      <div ref={bookSection}><BooksSection /></div>
      <div ref={library}><Library/></div>
      <ScrollToTop
        smooth
        className="scrollToTop"
        style={{backgroundColor:"#9333ea"}}
        
        component={<FaArrowUp className="animate-arrow" style={{ fontSize: "20px", color: "white" }} />}
      />
      <Footer />
    </>
  )
}

export default App
