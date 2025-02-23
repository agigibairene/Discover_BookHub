import { createSlice } from "@reduxjs/toolkit";
import { BookStructure } from "../utils/books";
import Swal from "sweetalert2";

interface LibraryItems {
  items: BookStructure[];
}

function loadFromStorage(): BookStructure[] {
  const storedBooks = localStorage.getItem("libraryBooks");
  return storedBooks ? JSON.parse(storedBooks) : [];
}

function saveToStorage(books: BookStructure[]){
  localStorage.setItem("libraryBooks", JSON.stringify(books));
}


const initialState: LibraryItems = { items: loadFromStorage() };

const librarySlice = createSlice({
  name: "Library",
  initialState,
  reducers: {
    addBookToLibrary(state, action) {
      const newBook = action.payload;
      const existingBook = state.items.find((item) => item.id === newBook.id);

      if (!existingBook) {
        state.items.push(newBook);
        saveToStorage([...state.items]); 

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Book successfully added to your Library",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Book already in your Library",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    removeFromLibrary(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      saveToStorage([...state.items]); // Save to localStorage

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Book successfully removed from library",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
});

export const { addBookToLibrary, removeFromLibrary } = librarySlice.actions;
export const libraryReducer = librarySlice.reducer;
