import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLang = (lang: "en" | "es") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => changeLang("en")}>EN</button>
      <button onClick={() => changeLang("es")}>ES</button>
    </div>
  );
};
