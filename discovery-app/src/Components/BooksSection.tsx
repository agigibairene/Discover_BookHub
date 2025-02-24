import { useSelector, shallowEqual, useDispatch } from "react-redux";
import BooksHeader from "./Headers/BooksHeader";
import { AppDispatch, IRootState } from "../ReduxStore/store";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchBooksCollection } from "../ReduxStore/bookSlice";
import { BookStructure } from "../utils/books";

export default function BooksSection(){
  
  const { specificType, typeSelected, booksArr } = useSelector(
    (state: IRootState) => ({
      specificType: state.bookSlicer.specificType,
      typeSelected: state.bookSlicer.typeSelected,
      booksArr: state.bookSlicer.books,
    }),
    shallowEqual
  );

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchBooksCollection({ category: typeSelected, specificType }));
  }, [dispatch, typeSelected, specificType]);

  return (
    <div className="min-h-screen text-white p-10 container">
      <BooksHeader />
      
      {booksArr && booksArr.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {booksArr.map((book: BookStructure, index) => {
            const { title, image, id } = book;
            return (
              <Link key={index} to={`discover/${id}`}>
                <div className="h-56 relative rounded-lg flex items-center justify-center">
                  <img src={image} alt={title} className="object-contain absolute inset-0 h-full w-full"/>
                </div>
                <h2 className="book-title mt-2 text-lg font-semibold text-black text-center font-Kumbh">
                  {title}
                </h2>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-400">No books available.</p>
      )}
    </div>
  );
  
};


