import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './components/Home';
import Product from './components/Product';
import Support from './components/Support';
import { loader as productLoader } from './components/Product';
import Register from './pages/Register';
import Login from './pages/Login';

const routes = createBrowserRouter([
  {
    path: "/", element: <RootLayout></RootLayout>,
    children: [
      { path: "", element: <Home></Home> },
      { path: "/product", element: <Product></Product>, loader: productLoader },
      { path: "/support", element: <Support></Support> },
      { path: "/register", element: <Register></Register> },
      { path: "/login", element: <Login></Login> }
    ]
  }

]);

function App() {
  return <RouterProvider router={routes}></RouterProvider>
}

export default App;
