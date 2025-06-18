import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import CartIcon from "./contexts/CartIcon";

import Home from "./pages/Home";
import Login1 from "./pages/fs1/Login1.tsx";
import Products1 from "./pages/fs1/Products1.tsx";
import ProductDetails1 from "./pages/fs1/ProductDetails1.tsx";
import CartPage1 from "./pages/fs1/CartPage1.tsx";
import Login2 from "./pages/fs2/Login2.tsx";
import Products2 from "./pages/fs2/Products2.tsx";
import ProductDetails2 from "./pages/fs2/ProductDetails2.tsx";
import CartPage2 from "./pages/fs2/CartPage2.tsx";

function AppRoutes() {
  const location = useLocation();
  const showCart =
    (location.pathname.startsWith("/products1") || location.pathname.startsWith("/products2")) &&
    !location.pathname.startsWith("/cart");

  return (
    <CartProvider>
      <>
        {showCart && <CartIcon />}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login1" element={<Login1 />} />
          <Route path="/products1" element={<Products1 />} />
          <Route path="/products1/:id" element={<ProductDetails1 />} />
          <Route path="/cart1" element={<CartPage1 />} />

          <Route path="/login2" element={<Login2 />} />
          <Route path="/products2" element={<Products2 />} />
          <Route path="/products2/:id" element={<ProductDetails2 />} />
          <Route path="/cart2" element={<CartPage2 />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    </CartProvider>
  );
}

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;