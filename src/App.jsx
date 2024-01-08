import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import Products from "./pages/Stock";
import SalesOrders from "./pages/Sell";

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
      path: "/pages/Stock",
      exact: false,
      page: <Products />,
    },
    {
      path: "/pages/Sell",
      exact: false,
      page: <SalesOrders />,
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
