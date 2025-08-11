import { useState } from "react";

import TabNavigation from "../tab-navigation";
import { TabType } from "../../types";
import Header from "../header";

const ExtensionPopup = () => {
  const [activeTab, setActiveTab] = useState<TabType>("duas");

  return (
    <div className="h-full flex flex-col bg-white w-lg">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default ExtensionPopup;
