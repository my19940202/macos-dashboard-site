import appsData from "@/data/apps.json";

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

const APP_ICON_BASE_URL =
  "https://eztwwgfhrwnlyfhzqyxe.supabase.co/storage/v1/object/public/mac-dashboard/images";

export function getApps(): AppItem[] {
  const items = appsData as AppJsonItem[];

  return items
    .filter((item) => Boolean(item.deeplinks && item.deeplinks.length))
    .sort((a, b) => {
      if (a.is_system_default === b.is_system_default) {
        return 0;
      }

      return a.is_system_default ? -1 : 1;
    })
    .map((item) => ({
      name: item.name,
      deeplinks: item.deeplinks,
      iconUrl: `${APP_ICON_BASE_URL}/${item.iconFile}`,
    }));
}
