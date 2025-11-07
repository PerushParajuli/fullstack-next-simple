import { getUserDetails } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { stackServerApp } from "@/stack/server";
import { HomeIcon, LogInIcon, LogOutIcon, Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { UserButton } from "@stackframe/stack";

export default async function Navbar() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  const userProfile = await getUserDetails(user?.id);

  return (
    <nav className="sticky top-0 w-full border-b z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-x-2">
          <Image
            src={"/logo.jpeg"}
            alt={"Logo of PlantShelf"}
            width={50}
            height={50}
            className={`hover:cursor-pointer`}
          />
          <Link href={"/"} className="font-semibold tracking-widest">
            Plantshelf
          </Link>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-x-2 md:gap-x-4">
          <div className="flex items-center gap-x-2 md:gap-x-4 font-semibold">
            <Button variant={"ghost"} asChild>
              <Link href={"/plants"} className="flex items-center gap-x-2">
                <Sprout className="w-4 h-4" />
                <span className="hidden md:inline">Plants</span>
              </Link>
            </Button>

            <Button variant={"ghost"} asChild>
              <Link href={"/"} className="flex items-center gap-x-2">
                <HomeIcon className="w-4 h-4" />
                <span className="hidden md:inline">Home</span>
              </Link>
            </Button>
          </div>

          {/* Sign In Button */}
          <div>
            {user ? null : (
              <Button variant={"ghost"} asChild>
                <Link href={app.signIn} className="flex items-center gap-x-2">
                  <LogInIcon className="w-4 h-4" />
                  <span className="hidden md:inline">Sign In</span>
                </Link>
              </Button>
            )}
          </div>

          {/* Night mode and User Indicator */}
          <div className={`${user ? "flex items-center gap-x-2" : ""}`}>
            <ModeToggle />
            {user && <UserButton />}
          </div>
        </div>
      </div>
    </nav>
  );
}
