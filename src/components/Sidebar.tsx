"use client";
import { SignInButton, SignedOut } from "@clerk/nextjs";

import { UserButton, useUser } from "@clerk/nextjs";
import NavItem from "./NavItem";
import { CheckIcon, HomeIcon, ListIcon, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { user } = useUser();
  const pathname = usePathname();

  const menu = [
    {
      id: 1,
      title: "All Tasks",
      icon: <HomeIcon size={20} />,
      link: "/",
    },
    {
      id: 2,
      title: "Important!",
      icon: <ListIcon size={20} />,
      link: "/important",
    },
    {
      id: 3,
      title: "Completed!",
      icon: <CheckIcon size={20} />,
      link: "/completed",
    },
    {
      id: 4,
      title: "Do It Now",
      icon: <ListIcon size={20} />,
      link: "/incomplete",
    },
  ];

  return (
    <div className="w-[12rem] min-w-[12rem] flex flex-col justify-between  border-gray-200 py-6 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white h-full border-2 bg-white rounded-2xl">
      {user ? (
        <>
          <div className="hover:border-opacity-100 border-opacity-0 border-2 border-zinc-700 mx-6 p-3 box-border hover:bg-zinc-900 rounded-2xl cursor-pointer flex items-center gap-x-4">
            <UserButton />
            <h1 className="capitalize relative z-10 text-base flex flex-col leading-6">
              {user?.firstName} {user?.lastName}
            </h1>
          </div>

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <div className="">
            {menu.map((item) => (
              <NavItem
                key={item.id}
                active={item.link === pathname}
                href={item.link}
                label={item.title}
                icon={item.icon}
              />
            ))}
          </div>
          <button className="inline-flex items-center gap-x-4 hover:bg-zinc-900 mx-auto p-3 rounded-xl">
            <LogOutIcon size={20}></LogOutIcon>
            Sign Out
          </button>
        </>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
