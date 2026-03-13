import LaunchPad from "../components/LaunchPad";
import appsData from "../data/apps.json";

export type AppItem = {
  name: string;
  iconUrl: string;
  deeplinks: string[];
};

type AppJsonItem = {
  name: string;
  iconFile: string;
  deeplinks: string[];
};

function getApps(): AppItem[] {
  const items = appsData as AppJsonItem[];
  return items.filter(item => Boolean(item.deeplinks && item.deeplinks.length)).map((item) => ({
    name: item.name,
    deeplinks: item.deeplinks,
    iconUrl: `/api/icon?file=${encodeURIComponent(item.iconFile)}`,
  }));
}

export default function Home() {
  const apps = getApps();

  return (
    <main className="min-h-screen bg-base-200">
      <LaunchPad apps={apps} />
    </main>
  );
}
