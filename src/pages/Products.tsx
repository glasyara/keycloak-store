import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
  IconButton,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import keycloak from '../contexts/Keycloak'; // adjust the path if needed


interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Erro ao buscar produtos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>Carregando produtos...</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "#111", minHeight: "100vh", pb: 4 }}>
      {/* Top Navigation */}
      <Box sx={{ display: "flex", alignItems: "center", px: 2, pt: 2 }}>
        <IconButton
          onClick={() => {
          localStorage.removeItem("token"); 
          keycloak.logout();              
        }}
  sx={{ color: "#fff" }}
>
  <ArrowBackIcon />
</IconButton>
      </Box>

      <Box
  sx={{
    height: isMobile ? '25vh' : '30vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <StarIcon
    sx={{
      fontSize: isMobile ? 60 : 80,
      color: '#fff',
      animation: 'spin 8s linear infinite',
      '@keyframes spin': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
    }}
  />
</Box>

      <Container
        maxWidth="sm"
        sx={{
          bgcolor: "#fff",
          mt: 6,
          pt: 4,
          pb: 6,
          px: 3,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          mb={4}
        >
          Produtos
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              key={product.id}
              sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                backgroundColor: "#111",
                borderRadius: 3,
                p: 1.5,
                width: 100,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                '&:hover': {
                  transform: "scale(1.05)",
                },
          }}
      onClick={() => navigate(`/products/${product.id}`)}>
    <Avatar
      variant="rounded"
      src={product.image}
      alt={product.title}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        bgcolor: "#fff",
      }}
    />
  </Box>
</Grid>

          ))}
        </Grid>
      </Container>

    </Box>
  );
};

export default Products;
