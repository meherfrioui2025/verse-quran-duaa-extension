import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import initI18n from "./utils/i18n.ts";
import App from "./App.tsx";

import "./index.css";

const Root = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => setReady(true));
  }, []);

  if (!ready) return <div>Loading translations...</div>;

  return <App />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
