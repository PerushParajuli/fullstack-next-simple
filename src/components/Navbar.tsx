import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sprout, LogInIcon, HomeIcon } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import {SignIn} from "@stackframe/stack";

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full border-b z-50">
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

            <Button variant={"ghost"} asChild>
              <Link href={app.signIn} className="flex items-center gap-x-2">
                <LogInIcon className="w-4 h-4" />
                <span className="hidden md:inline">Sign In</span>
              </Link>
            </Button>
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
