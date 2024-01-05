import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import Products from "./pages/Products";

function App() {
  const routes = [
    {
      path: "/",
      exact: false,
      page: null,
    },
    {
      path: "/pages/Home",
      exact: false,
      page: <Home />,
    },
    {
      path: "/pages/Products",
      exact: false,
      page: <Products />,
    },
  ];

  return (
    <>
      <Menu />
      <Routes>
        {routes.map((route, index) => (
          <Route
            element={route.page}
            exact={route.exact}
            key={index}
            path={route.path}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
