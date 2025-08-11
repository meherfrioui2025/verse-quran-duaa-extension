import React from "react";
import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";

const Footer: React.FC = () => {
  const { t ,currentLanguage} = useExtensionTranslation();

  return (
    <footer
      className="bg-[var(--islamic-green)] text-white text-sm px-4 py-2 flex items-center justify-between shadow-inner fixed bottom-0 w-full z-50"
    >
      {/* Left/Right side depending on language */}
      <div className={`${currentLanguage==="ar" ? "order-2" : "order-1"}`}>
        © {new Date().getFullYear()} {t("footer.appName", "Islamic Companion")}
      </div>

      <div
        className={`flex gap-3 ${currentLanguage==="ar" ? "order-1" : "order-2"} text-xs opacity-90`}
      >
        <a
          href="https://your-privacy-policy-link"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {t("footer.privacy", "Privacy Policy")}
        </a>
        <a
          href="https://your-about-link"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {t("footer.about", "About")}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
