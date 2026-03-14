import LaunchPad from "@/components/LaunchPad";
import PwaInstallButton from "@/components/PwaInstallButton";
import { getApps } from "@/lib/apps";
import { getMessages, type Locale } from "@/lib/i18n";

type HomePageProps = {
  locale: Locale;
};

export default function HomePage({ locale }: HomePageProps) {
  const apps = getApps();
  const messages = getMessages(locale);

  return (
    <main className="min-h-screen bg-base-200">
      <PwaInstallButton messages={messages.pwaInstall} />
      <LaunchPad apps={apps} messages={messages.launchPad} locale={locale} />
    </main>
  );
}
