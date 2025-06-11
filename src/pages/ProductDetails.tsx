import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";
import { useCart } from "../contexts/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 8 }}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Carregando produto...
        </Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h5">Produto não encontrado</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "#111", minHeight: "100vh", color: "#fff" }}>
      {/* Back & Star Header */}
      <Box sx={{ display: "flex", alignItems: "center", px: 2, pt: 2 }}>
        <IconButton
          onClick={() => {
            navigate("/products");
          }}
          sx={{ color: "#fff" }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
      </Box>

      {/* Star Icon */}
      <Box
        sx={{
          height: isMobile ? "25vh" : "30vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StarIcon
          sx={{
            fontSize: isMobile ? 60 : 80,
            color: "#fff",
            animation: "spin 8s linear infinite",
            "@keyframes spin": {
              from: { transform: "rotate(0deg)" },
              to: { transform: "rotate(360deg)" },
            },
          }}
        />
      </Box>

      {/* Product Details Section */}
      <Box
        sx={{
          bgcolor: "#fff",
          color: "#000",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          mt: -4,
          pt: 4,
          px: 3,
          pb: 6,
          maxWidth: 500,
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.title}
          sx={{
            width: "100%",
            height: isMobile ? 250 : 300,
            objectFit: "contain",
            mb: 2,
          }}
        />

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          {product.title}
        </Typography>

        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          ${product.price.toFixed(2)}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={() =>
            addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              quantity: 1,
            })
          }
        >
          Adicionar ao carrinho
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;
