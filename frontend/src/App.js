import { createBrowserRouter,
  RouterProvider, } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './pages/Auth';
import Layout from './pages/Layout';
import MovieDetails from './pages/movieData';
import BookedMovies from './pages/bookedmovies';
import BookMovies from './pages/bookMovies';
import './App.css';

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout/>
      ),
      children:[
        {
          path:"/auth",
          element:<Auth/>
        },
        {
          path:"/searchmovie",
          element: <BookMovies/>
        },{
          path: "/movie/:id",
          element:<MovieDetails/>
        },
        {
          path: "/bookedmovie",
          element:<BookedMovies/>
        }
      ]
      
    }
  ]);
  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
  );
}

export default App;