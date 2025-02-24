import { FaCartArrowDown } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  BookStructure } from "../utils/books";
import { addBookToLibrary, removeFromLibrary } from "../ReduxStore/librarySlice";
import DetailsPageHeader from "./Headers/DetailsPageHeader";
import { useEffect, useContext, useState } from "react";
import { Themes } from "../Context/ThemeData";


export default function BookDetails() {  

  const { id } = useParams<{ id: string }>(); 
  const dispatch = useDispatch();
  const { theme } = useContext(Themes);
  const [allBooks, setAllBooks] =  useState<BookStructure[]>([]);
  const [matchedBook, setMatchedBooks] = useState<BookStructure|null>(null)


  const fetchAllBooks = async () =>{
    try{
      const response = await fetch(`https://discover-book-alpha.vercel.app/api/books`);
      const book = await response.json();
      setAllBooks(book);
    }
    catch(err){
      console.log(err);
    }
  }

  function limitWords(text: string, maxLength: number) : string{
    const wordsArray = text.split(" ");
    if (wordsArray.length > maxLength){
      return wordsArray.slice(0, maxLength).join(" ") + "...";
    }
    return text;
  }

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    fetchAllBooks();
  },[]);
    
  useEffect(() => {
    if (allBooks.length > 0) {
      const selectedBook = id ? allBooks.find(book => book.id === parseInt(id)) : undefined;
      setMatchedBooks(selectedBook || null);
    }
  }, [allBooks, id]);
  
  if (!matchedBook) {
    return <div>No Book Found</div>;
  }
  
  const { image, summary, author, title, id: BookId, publishedDate } = matchedBook;

  return (
    <section className="bookDetails">
      <DetailsPageHeader />
      <div className="flex flex-col my-10 md:flex-row p-6 md:p-12 max-w-4xl mx-8 sm:mx-6 md:mx-auto bg-white rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <img src={image} alt={title} className="w-72" />
        </div>
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-around">
          <p className="text-purple-500 font-bold font-OpenSans uppercase tracking-widest">
            <span className="text-black">Author: </span> {author}
          </p>
          <p className="text-purple-500 font-bold font-OpenSans uppercase tracking-widest">
            <span className="text-black">Published Date: </span> {publishedDate}
          </p>
          <h1 className="text-3xl font-bold my-2 font-inter">{title}</h1>
          <p className="text-gray-600 font-inter">{limitWords(summary, 20)}</p>
          <div className="flex items-center space-x-4 mt-6">
            <button
              onClick={()=>dispatch(addBookToLibrary({ image, summary, author, title, id: BookId }))}
              className="flex items-center space-x-2 bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
            >
              <FaCartArrowDown size={20} />
              <span>Add to Library</span>
            </button>
            <button
              onClick={()=>dispatch(removeFromLibrary({ image, summary, author, title, id: BookId }))}
              className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
            >
              Remove Book
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
