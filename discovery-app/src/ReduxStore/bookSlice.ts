import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BookStructure } from "../utils/books";

interface FetchArg {
  category: string;
  specificType: string;
}

// Function to fetch books from API
const fetchBooks = async ({ category, specificType }: FetchArg) => {
  try {
    const response = await fetch(
      `https://discover-book-qskd4z5r1-irenes-projects-cb825986.vercel.app/api/books?category=${category}&specificType=${specificType}`
    );

    if (!response.ok) throw new Error("Failed to fetch books");

    const data = await response.json();
    return Array.isArray(data) ? data : []; // Ensure it returns an array
  } catch (err) {
    console.error("Fetch error:", err);
    return []; // Return empty array instead of undefined
  }
};

// Redux Thunk for fetching books
export const fetchBooksCollection = createAsyncThunk("books/fetchBooks", fetchBooks);

// State interface
interface InitialState {
  books: BookStructure[];
  typeSelected: string;
  specificType: string;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

// Initial state
const initialState: InitialState = {
  books: [],
  typeSelected: "genres",
  specificType: "Self-help",
  status: "idle",
  error: null,
};

// Create slice
const bookSlice = createSlice({
  name: "bookOptionSelected",
  initialState,
  reducers: {
    changeOptionSelected(state, action) {
      state.typeSelected = action.payload;
    },
    changeNavLinkSelected(state, action) {
      state.specificType = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(fetchBooksCollection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooksCollection.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = Array.isArray(action.payload) ? action.payload : []; // Prevent undefined issues
      })
      .addCase(fetchBooksCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
        state.books = [];
      });
  },
});

// Export actions & reducer
export const { changeOptionSelected, changeNavLinkSelected } = bookSlice.actions;
export const bookSliceReducer = bookSlice.reducer;
