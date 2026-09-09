import { useEffect, useState } from "react";

import {
  Download
} from "lucide-react";

function InstallButton() {

  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {

    const handleBeforeInstallPrompt = (event) => {

      event.preventDefault();

      setInstallPrompt(event);

    };

    const handleAppInstalled = () => {

      setInstalled(true);

      setInstallPrompt(null);

    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    if (
      window.matchMedia(
        "(display-mode: standalone)"
      ).matches
    ) {
      setInstalled(true);
    }

    return () => {

      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );

    };

  }, []);

  const installApp = async () => {

    if (!installPrompt) {
      alert(
        "The install option is not currently available. Please use a supported browser such as Chrome or Edge."
      );
      return;
    }

    installPrompt.prompt();

    const result = await installPrompt.userChoice;

    if (result.outcome === "accepted") {
      setInstallPrompt(null);
    }

  };

  if (installed) {
    return (
      <span className="installed-label">
        ✓ Installed
      </span>
    );
  }

  return (
    <button
      className="install-button"
      onClick={installApp}
    >
      <Download size={17} />
      Install App
    </button>
  );
}

export default InstallButton;
