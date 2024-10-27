// Header.tsx
import React from "react";
import { Box } from "@mui/material";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"; // Asegúrate de que la ruta sea correcta

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box className={styles.header}>
      <Box
        onClick={() => {
          navigate("/");
        }}
        className={styles.logoContainer}
      >
        <img src={logo} alt="Logo de PokeWird" className={styles.logo} />
      </Box>
    </Box>
  );
};

export default Header;
