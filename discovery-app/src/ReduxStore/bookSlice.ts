import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BookStructure } from '../utils/books';

interface FetchArg{
    category: string;
    specificType: string;
}

const fetchBooks = async ({category, specificType}: FetchArg) =>{
    try{
        const response = await fetch(`https://discover-book-alpha.vercel.app/api/books?category=${category}&specificType=${specificType}`);
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(err){
      console.log(err);
    }
}

export const fetchBooksCollection = createAsyncThunk("books/fetchBooks", fetchBooks);

interface InitialState{
    books: BookStructure[];
    typeSelected: string;
    specificType: string;
    status: "idle" | "loading" | "failed",
    error: string | null;
}

const initialState: InitialState = {
    books: [] as BookStructure[],
    typeSelected: "genres", 
    specificType: "Self-help",
    status: "idle",
    error: null
}

const bookSlice = createSlice({
    name: "bookOptionSelected",
    initialState,
    reducers: {
        changeOptionSelected(state, action){
            state.typeSelected = action.payload;
        },
        changeNavLinkSelected(state, action){
            state.specificType = action.payload
        }
    },
    extraReducers(builders){
        builders.addCase(fetchBooksCollection.fulfilled, (state, action) => {
            state.books = action.payload;
        })
    }
});


export const { changeOptionSelected, changeNavLinkSelected } = bookSlice.actions;
export const bookSliceReducer = bookSlice.reducer;