import { useRef, useState } from "react";
import "./App.css";
import Helpers from "./components/helpers";
import {
  SigVerificationForm,
  GenerateKeyPairs,
  GenHeader,
  HeaderVerify,
} from "./components/sections";
import { ResultSection } from "./components/ResultSection";
import { AppContext } from "./context/AppContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const tabs = [
  "SIGNATURE VALIDATION",
  "HEADER VALIDATION",
  "ENCRYPTION",
  "CREATE HEADER",
  "GENERATE KEYS",
]; // Define your tabs here

function App() {
  const [activeTab, setActiveTab] = useState("verification");
  const [result, setResult] = useState<{ index: number; value: string }[]>([]);
  const numberRef = useRef(0);
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      htmlElement.classList.add("dark");
      setDarkMode(true);
    }
  };

  function MakeTabs() {
    return (
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${
                activeTab === tab
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  function ContentSection() {
    return (
      <div className="flex-1 pr-4">
        {activeTab === "SIGNATURE VALIDATION" && <SigVerificationForm />}
        {activeTab === "HEADER VALIDATION" && <HeaderVerify />}
        {activeTab === "CREATE HEADER" && <GenHeader />}
        {activeTab === "GENERATE KEYS" && <GenerateKeyPairs />}
      </div>
    );
  }

  const pushResult = (item: string) => {
    numberRef.current += 1;
    setResult((prevItems) => {
      const updatedItems = [
        ...prevItems,
        { index: numberRef.current, value: item },
      ];
      return updatedItems.length > 7 ? updatedItems.slice(-7) : updatedItems;
    });
  };

  return (
    <AppContext.Provider value={{ result, setResult, darkMode, pushResult }}>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 w-full">
        <header className="bg-white dark:bg-gray-800 shadow-md relative">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold dark:text-white text-gray-800">
                ONDC Verification Utility
              </h1>
              <div className="flex space-x-4">
                <MakeTabs />
              </div>
            </div>
            <button
              className="absolute top-4 right-4 p-2 text-gray-600 dark:text-gray-300"
              onClick={toggleDarkMode}
            >
              {darkMode ? <MdDarkMode size={24} /> : <MdLightMode size={24} />}
            </button>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-6 py-8 flex">
          <ContentSection />
          <ResultSection />
        </main>
        <Helpers />
      </div>
    </AppContext.Provider>
  );
}

export default App;
