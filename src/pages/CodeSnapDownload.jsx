import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows, faLinux } from "@fortawesome/free-brands-svg-icons";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import CursorParticles from "../components/CursorParticles";

const useTextElements = () => {
  const textElements = useRef([]);

  const registerTextElement = (element) => {
    if (element && !textElements.current.includes(element)) {
      textElements.current.push(element);
    }
  };

  const unregisterTextElement = (element) => {
    textElements.current = textElements.current.filter((el) => el !== element);
  };

  const clearTextElements = () => {
    textElements.current = [];
  };

  return {
    textElements,
    registerTextElement,
    unregisterTextElement,
    clearTextElements,
  };
};

const CodeSnapDownload = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { textElements, registerTextElement, unregisterTextElement } =
    useTextElements();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"; // true or false
  });
  const [selectedOS, setSelectedOS] = useState("windows");

  const handleDownloadW = () => {
    const link = document.createElement("a");
    link.href =
      "https://github.com/The-Dev-Sumit/CodeSnapApp/releases/download/MyApp/CodeSnap.Setup.1.0.0.exe";
    link.target = "_blank"; // Optional, open in new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadL = () => {
    const link = document.createElement("a");
    link.href =
      "https://github.com/The-Dev-Sumit/CodeSnapApp/releases/download/MyApp/codesnap_1.0.0_amd64.deb";
    link.target = "_blank"; // Optional, open in new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const windowsVersions = [
    { version: "NA", date: "NA", size: "NA", changes: "Coming Soon" },
  ];

  const linuxVersions = [
    { version: "NA", date: "NA", size: "NA", changes: "Coming Soon" },
  ];

  return (
    <div
      className={`w-full transition-colors duration-300  ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen relative p-5`}>
      {!isMobile && (
        <CursorParticles
          textElements={textElements}
          screenWidth={window.innerWidth}
        />
      )}

      <header className="flex justify-end p-5">
        <button
          onClick={handleThemeToggle}
          className="rounded-full cursor-pointer h-10 w-10 text-xl transition-all duration-300 hover:scale-110">
          {isDarkMode ? (
            <FontAwesomeIcon icon={faSun} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )}
        </button>
      </header>
      <main className="pt-10">
        <div className="text-center mb-10">
          <h1
            className={`text-[3rem] downSnap font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
            Download CodeSnap
          </h1>
          <p
            className={`text-xl max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>
            Practice Coding and Improve Your Skills with CodeSnap. Download Now
            and Start Coding!
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <div
            className={`p-8 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white hover:bg-gray-50 shadow-lg"
            }`}>
            <div className="flex items-center mb-4">
              <FontAwesomeIcon
                icon={faWindows}
                size="2xl"
                style={{ color: "#9470ff" }}
              />
              <div className="ml-5">
                <h3
                  className={`text-xl font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                  Windows
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                  Version 1.0.0
                </p>
              </div>
            </div>
            <p
              className={`mb-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
              Compatible with Windows 10/11
            </p>
            <p
              className={`mb-6 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}>
              File size: 200 MB
            </p>
            <button
              onClick={handleDownloadW}
              className="!rounded-button cursor-pointer whitespace-nowrap w-full py-3 px-6 bg-blue-600 text-white font-semibold hover:bg-blue-900 transition-colors duration-300">
              Download for Windows
            </button>
          </div>
          {/* Linux Card */}
          <div
            className={`p-8 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white hover:bg-gray-50 shadow-lg"
            }`}>
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faLinux} size="2xl" />
              <div className="ml-5">
                <h3
                  className={`text-xl font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                  Linux
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                  Version 1.0.0
                </p>
              </div>
            </div>
            <p
              className={`mb-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
              Compatible with Ubuntu 20.04+
            </p>
            <p
              className={`mb-6 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}>
              File size: 500 MB
            </p>
            <button
              onClick={handleDownloadL}
              className="!rounded-button cursor-pointer whitespace-nowrap w-full py-3 px-6 bg-blue-600 text-white font-semibold hover:bg-blue-900 transition-colors duration-300">
              Download for Linux
            </button>
          </div>
        </div>
      </main>

      {/* OS Toggle */}
      <div className="flex justify-center mb-8">
        <div
          className={`inline-flex gap-2 tracking-wide ${
            isDarkMode ? "border-b-gray-300" : "border-b-gray-600"
          }`}>
          <div
            onClick={() => setSelectedOS("windows")}
            className={`cursor-pointer whitespace-nowrap bg-transparent px-6 h-9 gap-2 flex items-center transition-colors duration-200 border-b-[2px]  ${
              selectedOS === "windows"
                ? isDarkMode
                  ? "border-b-blue-500  text-white"
                  : "border-b-gray-600 text-gray-900 shadow"
                : isDarkMode
                ? " text-gray-400"
                : " text-gray-600"
            }`}>
            <FontAwesomeIcon icon={faWindows} style={{ color: "#9470ff" }} />
            <p>Windows</p>
          </div>
          <div
            onClick={() => setSelectedOS("linux")}
            className={`cursor-pointer whitespace-nowrap bg-transparent px-6 h-9 gap-2 flex items-center transition-colors duration-200 border-b-[2px]  ${
              selectedOS === "linux"
                ? isDarkMode
                  ? "border-b-blue-500 text-white"
                  : "border-b-gray-600 text-gray-900 shadow"
                : isDarkMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}>
            <FontAwesomeIcon icon={faLinux} />
            <p>Linux</p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mb-16">
        <div
          className={`rounded-lg overflow-hidden ${
            isDarkMode ? "bg-gray-800" : "bg-white shadow-lg"
          }`}>
          <div
            className={`px-6 py-4 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            }`}>
            <h3
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
              Available Versions for{" "}
              {selectedOS === "windows" ? "Windows" : "Linux"}
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {(selectedOS === "windows" ? windowsVersions : linuxVersions).map(
              (version) => (
                <div key={version.version} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className={`text-lg font-medium ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                        Version {version.version}
                      </h4>
                      <p
                        className={`${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                        Released: {version.date} • Size: {version.size}
                      </p>
                      <p
                        className={`mt-1 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                        {version.changes}
                      </p>
                    </div>
                    <button className="!rounded-button cursor-pointer whitespace-nowrap px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
                      Coming Soon.....
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div
        className={`max-w-4xl mx-auto mr-16 ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}>
        <h2
          className={`text-2xl font-bold ml-16 mb-6 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
          What's New in 1.0.0
        </h2>
        <ul className="space-y-3">
          <li>• You can creates file and Folders</li>
          <li>• You can run 4 languages to practice your coding skills</li>
          <li>• Improve your coding skills with codesnap</li>
        </ul>
      </div>
    </div>
  );
};

export default CodeSnapDownload;
