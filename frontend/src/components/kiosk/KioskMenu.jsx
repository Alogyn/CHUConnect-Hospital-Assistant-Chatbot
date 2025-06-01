import React from "react";
import { useNavigate, useLocation } from "react-router";
import { Box, Stack, Paper } from "@mui/material";
import ChatIcon from "@mui/icons-material/Forum";
import ServiceIcon from "@mui/icons-material/LocalHospital";
import TarifsIcon from "@mui/icons-material/AttachMoney";
import BackIcon from "@mui/icons-material/ArrowBack";
import logoCHUConnect from "../../assets/logo_CHU_Connect.webp";
import logoCHU from "../../assets/logo_CHU.jpg";
import chuBg from "../../assets/chu_bg.jpg";

const MENU_CONTENT = {
  fr: {
    chatbot: {
      title: "Chatbot",
      desc: "Posez vos questions, obtenez de l’aide et trouvez des informations rapidement sur le CHU.",
    },
    services: {
      title: "Services",
      desc: "Consultez la liste complète des services hospitaliers disponibles.",
    },
    tarifs: {
      title: "Tarifs",
      desc: "Découvrez les tarifs des actes, analyses, hospitalisations, etc.",
    },
    back: "Retour au choix de langue",
  },
  ar: {
    chatbot: {
      title: "الدردشة",
      desc: "اطرح أسئلتك، احصل على المساعدة، واعثر بسرعة على المعلومات حول المستشفى.",
    },
    services: {
      title: "خدمات",
      desc: "تصفح جميع الخدمات الطبية المتوفرة.",
    },
    tarifs: {
      title: "التعريفات",
      desc: "اكتشف تعريفات العلاجات والفحوصات والاستشفاء وغيرها.",
    },
    back: "العودة لاختيار اللغة",
  },
};

const BTN_STYLES = {
  base: {
    width: { xs: 1, sm: 370 },
    maxWidth: 390,
    minHeight: 90,
    px: 2.5,
    py: 2,
    borderRadius: 4,
    boxShadow: "0 2px 10px #0002",
    color: "#fff",
    outline: "none",
    border: "none",
    cursor: "pointer",
    mb: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
    transition: "all 0.18s",
    "&:hover": {
      filter: "brightness(1.09)",
      boxShadow: "0 8px 24px #1976d244",
      transform: "translateY(-2px) scale(1.015)",
    },
  },
  chatbot: { bgcolor: "#1976d2" },
  services: { bgcolor: "#388e3c" },
  tarifs: { bgcolor: "#b39d23" },
  back: {
    bgcolor: "#555",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    mb: 0,
    fontWeight: 600,
    fontSize: 17,
    minHeight: 56,
  },
};

const KioskMenu = () => {
  const navigate = useNavigate();
  const lang = new URLSearchParams(useLocation().search).get("lang") || "fr";
  const content = MENU_CONTENT[lang];

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
      {/* Bloc central */}
      <Paper
        elevation={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: 500,
          borderRadius: 4,
          background: "rgba(255,255,255,0.98)",
          boxShadow: "0 4px 30px #1976d221",
          px: { xs: 1, sm: 3 },
          pt: 3,
          pb: 3.5,
          mb: 2,
          mt: 1,
          overflow: "hidden",
        }}
      >
        {/* Ligne 1 : Chatbot */}
        <Box
          component="button"
          onClick={() => navigate(`/kiosk/chatbot?lang=${lang}`)}
          sx={{ ...BTN_STYLES.base, ...BTN_STYLES.chatbot }}
        >
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
            <ChatIcon sx={{ fontSize: 32, opacity: 0.92 }} />
            <Box sx={{ fontWeight: 700, fontSize: 22, letterSpacing: 0.5 }}>
              {content.chatbot.title}
            </Box>
          </Stack>
          <Box sx={{ fontWeight: 400, fontSize: 15, opacity: 0.97 }}>
            {content.chatbot.desc}
          </Box>
        </Box>
        {/* Ligne 2 : Services + Tarifs */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: "100%",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Box
            component="button"
            onClick={() => navigate(`/kiosk/services?lang=${lang}`)}
            sx={{ ...BTN_STYLES.base, ...BTN_STYLES.services }}
          >
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
              <ServiceIcon sx={{ fontSize: 28 }} />
              <Box sx={{ fontWeight: 700, fontSize: 18 }}>
                {content.services.title}
              </Box>
            </Stack>
            <Box sx={{ fontWeight: 400, fontSize: 14, opacity: 0.98 }}>
              {content.services.desc}
            </Box>
          </Box>
          <Box
            component="button"
            onClick={() => navigate(`/kiosk/tarifs?lang=${lang}`)}
            sx={{ ...BTN_STYLES.base, ...BTN_STYLES.tarifs }}
          >
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
              <TarifsIcon sx={{ fontSize: 28 }} />
              <Box sx={{ fontWeight: 700, fontSize: 18 }}>
                {content.tarifs.title}
              </Box>
            </Stack>
            <Box sx={{ fontWeight: 400, fontSize: 14, opacity: 0.98 }}>
              {content.tarifs.desc}
            </Box>
          </Box>
        </Stack>
        {/* Ligne 3 : Retour */}
        <Box
          component="button"
          onClick={() => navigate("/kiosk")}
          sx={{ ...BTN_STYLES.base, ...BTN_STYLES.back, width: { xs: 1, sm: 340 } }}
        >
          <Stack direction="row" alignItems="center" spacing={1.7}>
            <BackIcon sx={{ fontSize: 23 }} />
            <span>{content.back}</span>
          </Stack>
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

export default KioskMenu;
