import { useEffect, useRef, useState} from "react";
import { FaStar } from "react-icons/fa";
import { Author } from "../utils/books";

export default function AuthorsComponent() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [authors, setAuthors] = useState<Author[]>([]);

  const fetchAuthors = async () =>{
    try{
      const response = await fetch(`https://discover-book-alpha.vercel.app/api/authors`);
      const data = await response.json();
      setAuthors(data);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchAuthors();
  }, [])

  useEffect(() => {
    const scrollContainer = carouselRef.current;
    if (scrollContainer) {
      let scrollAmount = 0;
      const speed = 1; 
      const scrollStep = () => {
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
          scrollAmount = 0;
        } else {
          scrollContainer.scrollLeft += speed;
          scrollAmount += speed;
        }
      };
      const interval = setInterval(scrollStep, 30);
      return () => clearInterval(interval);
    }
  }, []);


  return (
    <div  className="py-14 mb-10">
      <div className="container">
        <div className="text-left mb-10 max-w-[500px] space-y-2">
          <h1 className="text-6xl font-bold others-h1">Look out for Popular Authors</h1>
        </div>
        <div ref={carouselRef} className="flex overflow-x-auto no-scrollbar  whitespace-nowrap">
          {authors.concat(authors).map((author, index) => {
            const { image, text, name } = author;
            return (
              <div className="my-6   inline-block" key={index}>
                <div className="authors authors-card flex flex-col gap-4 p-8 shadow-lg mx-4 rounded-xl w-80">
                  <div className="flex justify-start items-center gap-5">
                    <img src={image} alt={name} className="rounded-full w-20 h-20 object-cover" />
                    <div>
                      <p className="text-xl font-bold font-OpenSans text-purple-600">{name}</p>
                    </div>
                  </div>
                  <div className="py-6 space-y-4">
                    <p className="text-lg text-gray-500">{text}</p>
                    <p className="flex">
                      {[...Array(4)].map((_,i) => (
                        <FaStar key={i} size={25} color="yellow" />
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

