import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "fr";

interface TranslationContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Header
    nav_eyebrow: "SITES WEB · TUNNELS",
    // Hero
    hero_eyebrow: "SITES WEB CLÉ EN MAIN",
    hero_title_part1: "Votre site web et vos tunnels, ",
    hero_title_accent: "clés en main.",
    hero_subtitle_desktop:
      "Nous concevons et développons votre site web, vos tunnels de vente et vos landing pages pour que vos visiteurs deviennent des clients, sans que vous ayez à lever le petit doigt.",
    hero_subtitle_mobile: "Sites web, tunnels et landing pages, conçus et développés pour vous.",
    check_website: "Site web haute conversion",
    check_funnels: "Tunnels de vente",
    check_landing: "Optimisés pour la conversion",
    check_design: "Design sur mesure & responsive",
    // Form
    form_title: "Pour Obtenir Un Site Internet, Remplissez Vos Informations",
    form_subtitle_desktop: "Un agent spécial vous contactera dans les 24h.",
    form_subtitle_mobile: "Prend moins d'une minute.",
    label_firstname: "Prénom",
    placeholder_firstname: "Prénom",
    label_lastname: "Nom",
    placeholder_lastname: "Nom",
    label_phone: "Numéro de téléphone (WhatsApp/SMS)",
    placeholder_phone: "Numéro de téléphone",
    label_business: "Quel genre de site aimeriez-vous avoir?",
    placeholder_business:
      "Ex: Un site vitrine pour mon restaurant, avec commande en ligne et réservations.",
    btn_submit: "Envoyer maintenant",
    btn_submitting: "Envoi en cours...",
    privacy_note:
      "Pas de spam. Nous utilisons vos coordonnées uniquement pour échanger au sujet de votre projet.",
    // Thank you
    thanks_title: "C'est validé. Merci !",
    thanks_desc:
      "Notre équipe vous contactera sous peu pour vous présenter votre plan de site web sur mesure.",
    // Footer
    footer_phone: "+225 77 83 23 17 (whatsapp/sms)",
    footer_email: "bonjour@vmediadigital.com",
    footer_hours: "Lun – Ven : 8h00 – 18h00 (GMT)",
    footer_rights: "© 2026 VMedia Digital. Tous droits réservés.",
    footer_tagline: "Sites web et tunnels clé en main.",
    doodle_hint: "Astuce: Déplacez les petits symboles à la souris ou au doigt!",
  },
};

const LanguageContext = createContext<TranslationContextType>({
  lang: "fr",
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("fr");

  useEffect(() => {
    try {
      localStorage.setItem("vmedia_lang", "fr");
    } catch {
      // localStorage may fail in private mode
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("vmedia_lang", newLang);
    } catch {
      // ignore
    }
  };

  const t = (key: string): string => {
    const table = translations[lang] || translations.fr;
    return (table as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
