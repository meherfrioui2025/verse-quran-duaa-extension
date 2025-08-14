import { useEffect } from "react";

import { useExtensionTranslation } from "../../hooks/useExtensionTranslation";
import ExtensionPopup from "../../components/extension-popup";

const   App=()=> {
  const { t, currentLanguage } = useExtensionTranslation();

  useEffect(() => {
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  }, [currentLanguage]);

  return (
    <div>
      <ExtensionPopup />
      <p>{t("welcome_message")}</p>
    </div>
  );
}


export default App