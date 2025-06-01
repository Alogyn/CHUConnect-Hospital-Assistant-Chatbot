import React from "react";
import { useNavigate } from "react-router";
import { Box, Button, Typography, Stack, Paper, Divider } from "@mui/material";
import FranceIcon from "@mui/icons-material/Language";
import ArabicIcon from "@mui/icons-material/Translate";
import logoCHUConnect from "../../assets/logo_CHU_Connect.webp";
import logoCHU from "../../assets/logo_CHU.jpg";
import chuBg from "../../assets/chu_bg.jpg";

const KioskLangSelect = () => {
  const navigate = useNavigate();
  const isDesktop = window.innerWidth >= 900;
  const columnMinHeight = 235; // Ajuste si besoin

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `
          linear-gradient(120deg, rgba(255,255,255,0.6) 75%, rgba(224,234,252,0.55) 100%),
          url(${chuBg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        p: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Logos */}
      <Stack
        direction="row"
        spacing={4}
        alignItems="center"
        sx={{ mt: 4, mb: 2, zIndex: 2 }}
      >
        <img
          src={logoCHU}
          alt="Logo CHU Oujda"
          style={{
            width: 80,
            height: 80,
            borderRadius: 12,
            background: "#fff",
            padding: 6,
            boxShadow: "0 2px 10px #1976d220",
            objectFit: "contain",
          }}
        />
        <img
          src={logoCHUConnect}
          alt="Logo CHUConnect"
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: "#fff",
            padding: 6,
            boxShadow: "0 2px 12px #13c8ae23",
            objectFit: "contain",
          }}
        />
      </Stack>
      {/* Bloc central aligné */}
      <Paper
        elevation={8}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "stretch",
          justifyContent: "center",
          width: "100%",
          maxWidth: 900,
          minHeight: 330,
          p: 0,
          borderRadius: 4,
          background: "rgba(255,255,255,0.98)",
          boxShadow: "0 4px 30px #1976d221",
          mb: 2,
          mt: 1,
          overflow: "hidden",
        }}
      >
        {/* Bloc FR */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 3, md: 4 },
            minWidth: 0,
            minHeight: columnMinHeight,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#1976d2",
              fontWeight: 700,
              letterSpacing: 1,
              mb: 1,
              textAlign: "center",
              fontSize: 27,
            }}
          >
            Bienvenue au CHUConnect&nbsp;!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#444",
              fontSize: 17,
              mb: 2,
              textAlign: "center",
              maxWidth: 370,
              minHeight: 90,
              display: "flex",
              alignItems: "center",
              lineHeight: 2,
              flexDirection: "column",
            }}
          >
            <b>Cette borne interactive vous informe sur les<br/>
            services hospitaliers, les tarifs<br/>
            et propose un chatbot pour vous<br/>
                orienter au CHU Mohammed VI Oujda.</b>
          </Typography>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: "auto" }}>
            <Button
              onClick={() => navigate("/kiosk/menu?lang=fr")}
              sx={{
                minWidth: 170,
                fontSize: 18,
                bgcolor: "#1976d2",
                color: "#fff",
                "&:hover": { bgcolor: "#13c8ae" },
                boxShadow: 1,
                borderRadius: 3,
                px: 2.5,
                py: 1.1,
              }}
              startIcon={<FranceIcon />}
            >
              FRANÇAIS
            </Button>
          </Box>
        </Box>

        {/* Séparateur */}
        <Divider
          orientation={isDesktop ? "vertical" : "horizontal"}
          flexItem
          sx={{
            mx: 0,
            my: 0,
            bgcolor: "#13c8ae22",
            width: isDesktop ? 0 : "90%",
            height: isDesktop ? "90%" : 0,
            alignSelf: "center",
          }}
        />

        {/* Bloc AR */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 3, md: 4 },
            minWidth: 0,
            minHeight: columnMinHeight,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#388e3c",
              fontWeight: 700,
              fontFamily: "'Amiri', serif",
              direction: "rtl",
              mb: 1,
              textAlign: "center",
              fontSize: 27,
            }}
          >
            !مرحبا بكم في CHUConnect
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#333",
              fontSize: 17,
              fontFamily: "'Amiri', serif",
              direction: "rtl",
              textAlign: "center",
              maxWidth: 370,
              mb: 2,
              minHeight: 90,
              display: "flex",
              alignItems: "center",
              whiteSpace: "pre-line",
              lineHeight: 2.1,
            }}
          >
            تتيح لكم هذه الشاشة معرفة كل الخدمات الطبية<br/>
            والتعريفات ومواقع الأقسام،<br/>
            واستخدام مساعد الدردشة الذكي<br/>
            لتسهيل تنقلاتكم داخل مستشفى محمد السادس بوجدة.
          </Typography>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: "auto" }}>
            <Button
              onClick={() => navigate("/kiosk/menu?lang=ar")}
              sx={{
                minWidth: 170,
                fontSize: 18,
                bgcolor: "#388e3c",
                color: "#fff",
                "&:hover": { bgcolor: "#13c8ae" },
                boxShadow: 1,
                borderRadius: 3,
                px: 2.5,
                py: 1.1,
                fontFamily: "'Amiri', serif",
                direction: "rtl",
              }}
              startIcon={<ArabicIcon />}
            >
              العربية
            </Button>
          </Box>
        </Box>
      </Paper>
      {/* Footer */}
      <Box
        sx={{
          position: "fixed",
          bottom: 8,
          color: "#444",
          opacity: 0.45,
          fontWeight: 400,
          fontSize: 14,
          width: "100%",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        CHU Mohammed VI Oujda &nbsp;•&nbsp; Système CHUConnect 2025
      </Box>
    </Box>
  );
};

export default KioskLangSelect;
