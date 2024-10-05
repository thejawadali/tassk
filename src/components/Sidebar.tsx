"use client";
import { SignInButton, SignedOut, SignOutButton } from "@clerk/nextjs";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  ArrowLeftIcon,
  CheckIcon,
  HomeIcon,
  ListIcon,
  LoaderCircleIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";
import { useState } from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Sidebar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  
  const { setTheme } = useTheme();
  if (pathname == "/login") {
    return null;
  }
  
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
      title: "Urgent",
      icon: <ListIcon size={20} />,
      link: "/urgent",
    },
  ];

  function handleUserButtonClick() {
    const button = document.querySelector(".cl-userButtonTrigger");
    if (button) {
      (button as HTMLButtonElement).click();
    }
  }

  return (
    <div
      className={`absolute h-[calc(100vh-2rem)] transition-transform duration-300 ease-[cubic-bezier(0.53, 0.21, 0, 1)] ${
        collapsed
          ? "lg:translate-x-0 md:translate-x-[-225px] translate-x-[-216px]"
          : "translate-x-0"
      } z-50 lg:relative w-[12rem] min-w-[12rem] flex flex-col justify-between  border-gray-200 py-6 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white lg:h-full border-2 bg-white rounded-2xl`}
    >
      <button
        className="block lg:hidden py-[0.8rem] px-[0.9rem] absolute right-[-51px] top-[1.8rem] rounded-tr-2xl rounded-br-2xl
      bg-white dark:bg-zinc-800 border-2 dark:border-zinc-700 border-l-0"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <MenuIcon size={20} /> : <ArrowLeftIcon size={20} />}
      </button>
      {user ? (
        <>
          <button
            className="hover:border-opacity-100 border-opacity-0 border-2 dark:border-zinc-700 mx-6 p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-2xl cursor-pointer flex items-center gap-x-4"
            onClick={handleUserButtonClick}
          >
            <UserButton />
            <h1 className="capitalize relative z-10 text-base flex flex-col leading-6">
              {user?.firstName} {user?.lastName}
            </h1>
          </button>

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
          <div className="flex justify-center gap-x-4">
            <SignOutButton>
              <Button variant="outline">
                <LogOutIcon className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </SignOutButton>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* <button className="hover:border-opacity-100 border-opacity-0 border-2 dark:border-zinc-700 mx-6 hover:bg-zinc-100 dark:hover:bg-zinc-900 inline-flex items-center gap-x-4 p-3 rounded-xl">
            Sign Out
          </button> */}
        </>
      ) : (
        <div className="h-full flex justify-center items-center">
          <LoaderCircleIcon className="mr-2 h-10 w-10 animate-spin" />
        </div>
      )}
    </div>
  );
}
