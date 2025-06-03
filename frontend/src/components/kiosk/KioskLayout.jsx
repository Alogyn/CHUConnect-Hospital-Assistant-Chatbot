import React from 'react';
import { Box } from '@mui/material';
import logoCHUConnect from '../../assets/logo_CHU_Connect.webp';
import logoCHU from '../../assets/logo_CHU.jpg';
import chuBg from '../../assets/chu_bg.jpg';

const KioskLayout = ({ children }) => (
  <Box
    sx={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundImage: `
        linear-gradient(120deg, rgba(255,255,255,0.7) 75%, rgba(224,234,252,0.6) 100%),
        url(${chuBg})
      `,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", pt: 3, pb: 1 }}>
      <img src={logoCHUConnect} alt="CHUConnect" style={{ height: 70, marginRight: 24 }} />
      <img src={logoCHU} alt="CHU" style={{ height: 50, borderRadius: 10 }} />
    </Box>
    <Box sx={{ width: "100%", maxWidth: 500, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {children}
    </Box>
  </Box>
);

export default KioskLayout;
