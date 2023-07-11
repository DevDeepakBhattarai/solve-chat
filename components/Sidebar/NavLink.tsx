"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement, ReactNode } from "react";

interface Props {
  Icon: ReactElement;
  name: string;
  path: string;
}

export default function NavLink({ Icon, name, path }: Props): ReactElement {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Link
      href={path}
      className="flex items-center gap-4 text-white font-semibold tracking-wider isolate relative p-3"
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
