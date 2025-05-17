import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import './App.css'

const router = createBrowserRouter([
  {path: "/", element: <Home/>},
  {path: "/checkout", element: <Checkout/>}
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App
