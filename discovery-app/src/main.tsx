import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThemeProvider from './Context/ThemeData.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthorsComponent from './Components/AuthorsComponent.tsx';
import { Provider } from "react-redux";
import store from './ReduxStore/store.ts'
import BookDetails from './Components/BookDetails.tsx'
import BooksSection from './Components/BooksSection.tsx'
import HomePage from './Components/HomePage.tsx'
import Library from './Components/Library.tsx'
import Footer from './Components/Footer.tsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "discover",
        element: <BooksSection />
      },
      {
        path: 'authors',
        element: <AuthorsComponent />
      },
      {
        path: "library",
        element: <Library />
      },
      {
        path: "contact",
        element: <Footer />
      }
    ]
  },
  {
    path: "discover/:id",
    element: <BookDetails />
  },
      
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={appRouter}/>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
