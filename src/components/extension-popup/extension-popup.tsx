import { useState } from "react";

import TabNavigation from "../tab-navigation";
import Footer from "../footer/footer";
import { TabType } from "../../types";
import DuaaTab from "../duaa-tab";
import Header from "../header";

const ExtensionPopup = () => {
  const [activeTab, setActiveTab] = useState<TabType>("duas");

  return (
    <div className="h-full flex flex-col bg-white w-lg">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="overflow-y-auto max-h-96 h-fit p-2">
        {activeTab === "duas" && <DuaaTab />}
      </div>
      <Footer/>
    </div>
  );
};

export default ExtensionPopup;
