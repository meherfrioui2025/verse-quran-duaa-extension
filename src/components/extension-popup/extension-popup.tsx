import Header from "../header";

const ExtensionPopup = () => {
  return (
    <div
      className="h-full flex flex-col bg-white w-lg"
      data-testid="extension-popup"
    >
      <Header />
    </div>
  );
};

export default ExtensionPopup;
