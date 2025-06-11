import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const CartIcon = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const itemCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleClick = () => {
    console.log("Clicou no carrinho");
    navigate("/cart");
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Carrinho com ${itemCount} item(s)`}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "#f0c14b",
        border: "none",
        borderRadius: "50%",
        padding: "10px 15px",
        cursor: "pointer",
        zIndex: 1000,
        fontWeight: "bold",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        fontSize: "16px",
      }}
    >
      🛒 {itemCount}
    </button>
  );
};

export default CartIcon;
