import { Route, Routes } from "react-router";
import MainInsights from "./pages/Insights";
import MainMenu from "./components/Menu";
import Products from "./pages/Stock";
import SalesOrders from "./pages/Sell";

function App() {
  const routes = [
    {
      path: "/",
      exact: true,
      page: <Products />,
    },
    {
      path: "/pages/Insights",
      exact: true,
      page: <MainInsights />,
    },
    {
      path: "/pages/Stock",
      exact: true,
      page: <Products />,
    },
    {
      path: "/pages/Sell",
      exact: true,
      page: <SalesOrders />,
    },
  ];

  return (
    <>
      <MainMenu />
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
