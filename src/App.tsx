import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import CartIcon from "./contexts/CartIcon"; // corrigido
import { CartProvider } from "./contexts/CartContext";

function AppRoutes() {
  const location = useLocation();
  const showCart =
    location.pathname.startsWith("/products") && location.pathname !== "/cart";

  const token = localStorage.getItem("token");

  return (
    <CartProvider>
      <>
        {showCart && <CartIcon />}
        <Routes>
          {!token && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
          {token && (
            <>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/login"
                element={<Navigate to="/products" replace />}
              />
              <Route path="*" element={<Navigate to="/products" replace />} />
            </>
          )}
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
