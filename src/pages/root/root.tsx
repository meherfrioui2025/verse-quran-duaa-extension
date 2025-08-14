import { FC, useEffect, useState } from "react";

import initI18n from "../../utils/i18n.ts";
import App from "../app/App.tsx";

 const Root:FC=()=> {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => setReady(true));
  }, []);

  if (!ready) return <div>Loading translations...</div>;

  return <App />;
}

export default Root
