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
  is_system_default: boolean;
};

function getApps(): AppItem[] {
  const items = appsData as AppJsonItem[];
  return items
    .filter(item => Boolean(item.deeplinks && item.deeplinks.length))
    .sort((a, b) => {
      // is_system_default 为 true 的排前面
      if (a.is_system_default === b.is_system_default) return 0;
      return a.is_system_default ? -1 : 1;
    })
    .map((item) => ({
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
