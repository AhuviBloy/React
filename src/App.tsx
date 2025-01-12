import HomePage from "./components/HomePage/HomePage";
import { Outlet, RouterProvider } from "react-router-dom";
import { myRouter } from "./Router";

const App = () => {
  return (
    <>
      <HomePage/>
      <RouterProvider router={myRouter} />
    </>
  );
};

export default App;
