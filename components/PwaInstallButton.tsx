"use client";

import { useEffect, useMemo, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

function isStandaloneMode() {
  const isDisplayModeStandalone = window.matchMedia("(display-mode: standalone)").matches;
  const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
  return isDisplayModeStandalone || navigatorWithStandalone.standalone === true;
}

export default function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(() =>
    typeof window === "undefined" ? false : isStandaloneMode(),
  );
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    async function registerServiceWorker() {
      if (!("serviceWorker" in navigator)) {
        return;
      }

      try {
        await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });
      } catch (error) {
        console.error("Failed to register service worker", error);
      }
    }

    void registerServiceWorker();

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstalled(true);
      setIsInstalling(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const buttonLabel = useMemo(() => {
    if (isInstalling) {
      return "安装中...";
    }
    if (isInstalled) {
      return "已安装";
    }
    return "安装到本地";
  }, [isInstalled, isInstalling]);

  async function handleInstall() {
    if (!deferredPrompt || isInstalling) {
      return;
    }

    setIsInstalling(true);

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome !== "accepted") {
        setIsInstalling(false);
      }
      setDeferredPrompt(null);
    } catch (error) {
      console.error("Failed to install app", error);
      setIsInstalling(false);
    }
  }

  if (!isInstalled && !deferredPrompt) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-30 flex justify-center px-4">
      <button
        type="button"
        className="pointer-events-auto inline-flex items-center rounded-full border border-white/20 bg-white/14 px-4 py-2 text-sm font-medium text-white shadow-[0_12px_30px_rgba(12,10,62,0.28)] backdrop-blur-xl transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-80"
        onClick={handleInstall}
        disabled={isInstalled || isInstalling}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
