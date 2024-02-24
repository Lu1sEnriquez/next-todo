"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  icon: React.ReactNode;
  title: string;
}

export const SidebarItem = ({ title, icon, path }: Props) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group 
        hover:bg-gradient-to-r hover:bg-sky-300 hover:text-white
        ${
          pathname == path
            ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400 hover:text-slate-700"
            : ""
        }`}
      >
        {icon}
        <span className="">{title}</span>
      </Link>
    </li>
  );
};
