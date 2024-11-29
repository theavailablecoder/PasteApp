import { useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/navbar";
import ViewPaste from "./Components/ViewPaste";
import Paste from "./Components/Paste";
import  {RouterProvider} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        <Navbar />
        {/* <Home /> */}
        <ViewPaste />
      </div>
    ),
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
