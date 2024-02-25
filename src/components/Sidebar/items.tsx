import { IoCalendarClearOutline, IoCheckboxOutline, IoListOutline } from "react-icons/io5";

interface Items {
  path: string;
  icon: React.ReactNode;
  title: string;
}

export const items: Items[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <IoCalendarClearOutline size={30} />,
  },
  {
    title: "Rest TODOS",
    path: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline size={30} />,
  },
  {
    title: "Server Actions",
    path: "/dashboard/server-todos",
    icon: <IoListOutline size={30} />,
  },
  
];
