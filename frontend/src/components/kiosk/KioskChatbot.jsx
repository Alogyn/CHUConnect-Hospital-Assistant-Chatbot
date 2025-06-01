import React from 'react';

const KioskChatbot = () => {
  // Si tu as déjà un composant Chatbot réutilisable (ex : <Chatbot />), importe-le et utilise-le ici.
  // Sinon, tu peux mettre un iframe, une intégration Rasa Webchat, ou un message temporaire.

  return (
    <div style={{ maxWidth: 700, margin: "auto", marginTop: 50 }}>
      <h2 style={{ textAlign: "center" }}>Assistant virtuel / الدردشة الآلية</h2>

      {/* === Option 1 : Si tu as un composant Chatbot custom === */}
      {/* <Chatbot mode="kiosk" /> */}

      {/* === Option 2 : Placeholder ou message temporaire === */}
      <div style={{ border: "1px solid #ccc", padding: 32, borderRadius: 16, textAlign: "center" }}>
        <p>
          <strong>
            Ici s'affichera le chatbot pour aider les visiteurs !<br />
            يمكنك الدردشة مع المساعد الافتراضي هنا.
          </strong>
        </p>
        <br />
        {/*
          Ex: Pour intégrer Rasa Webchat ou Botpress,
          ajoute ici l'iframe, le widget, ou le code d'intégration.
        */}
      </div>
    </div>
  );
};

export default KioskChatbot;
