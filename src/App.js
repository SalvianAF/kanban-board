// import logo from './logo.svg';
import './App.scss';
import React, {lazy} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import Board from './pages/Board';

const Board = lazy(() => import("./pages/Board"));
const Landing = lazy(() => import("./pages/Landing"));

const router = createBrowserRouter([
  {
    path: "/v1",
    element: <Board/>,
  },
  {
    path: "/",
    element: <Landing/>,
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>

  );
}

export default App;
