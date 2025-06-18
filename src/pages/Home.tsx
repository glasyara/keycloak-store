import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, useMediaQuery, useTheme, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import keycloak from "../contexts/Keycloak";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    keycloak.logout({ redirectUri: window.location.origin });
  };

  return (
    <Box sx={{ bgcolor: "#111", minHeight: "100vh", pb: 4 }}>
      
      {/* Rotating Star */}
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

      {/* White Content Box */}
      <Box
        sx={{
          bgcolor: "#fff",
          mx: "auto",
          mt: 6,
          pt: 4,
          pb: 6,
          px: 3,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          maxWidth: "sm",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={4}>
          Bem-Vindo
        </Typography>

        <Grid container spacing={2} justifyContent="center" mb={4}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                aspectRatio: "1",
                bgcolor: "#111",
                "&:hover": { bgcolor: "#333" },
              }}
              onClick={() => navigate("/login1")}
            >
              FakeStore 1
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                aspectRatio: "1",
                bgcolor: "#111",
                "&:hover": { bgcolor: "#333" },
              }}
              onClick={() => navigate("/login2")}
            >
              FakeStore 2
            </Button>
          </Grid>
        </Grid>

        {/* Logout Button */}
        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
