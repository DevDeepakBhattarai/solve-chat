"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

interface Props {
  Icon: ReactElement;
  name: string;
  path: string;
}

export default function NavLink({ Icon, name, path }: Props): ReactElement {
  const pathname = usePathname();
  return (
    <Link
      href={path}
      className={cn(
        "flex items-center gap-4 text-white font-semibold tracking-wider isolate relative p-3",
        (!pathname.startsWith(path) && path !== "/") ||
          (path === "/" && path !== pathname)
          ? "hover:scale-105 transition-all duration-150"
          : ""
      )}
    >
      {Icon}
      <span>{name}</span>
      {path != "/" && pathname.startsWith(path) && (
        <motion.div
          layoutId="sidebarhoverbg"
          className="bg-primary rounded-md inset-0 absolute -z-50"
        />
      )}
      {path === "/" && path === pathname && (
        <motion.div
          layoutId="sidebarhoverbg"
          className="bg-primary rounded-md inset-0 absolute -z-50"
        />
      )}
    </Link>
  );
}
