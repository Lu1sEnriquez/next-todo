import { TabBar } from "@/components";
import { cookies } from "next/headers";

export const metadata = {
  title: "Cookies Page",
  description: "Cookies Page",
};

export default function CookiesPage() {
  
  /**
   * para el manejo de cookies del lado de next se implementa
   *  'cookies de next/headers'
   */
    const cookieStore = cookies;
  const cookieTab = cookieStore().get("selectedTab")?.value ?? "1";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl  font-bold">Tabs</span>
        <TabBar currentTab={+cookieTab}></TabBar>
      </div>
    </div>
  );
}
