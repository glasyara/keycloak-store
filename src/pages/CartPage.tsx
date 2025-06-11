import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleFinalizePurchase = () => {
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    clearCart();
    navigate("/products");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Carrinho de Compras
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Seu carrinho está vazio.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{ height: 200, objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantidade: {item.quantity}
                    </Typography>
                    <Typography variant="body1">
                      Preço: R$ {item.price.toFixed(2)}
                    </Typography>
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      sx={{ mt: 1 }}
                      variant="outlined"
                      color="error"
                    >
                      Remover
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h5" sx={{ mt: 4 }}>
            Total: R$ {total.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFinalizePurchase}
            sx={{ mt: 2 }}
          >
            Finalizar Compra
          </Button>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Compra finalizada com sucesso!
            </Alert>
          </Snackbar>
        </>
      )}
    </Container>
  );
};

export default CartPage;
