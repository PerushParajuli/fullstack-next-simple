"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Plant3D = dynamic(() => import("@/components/Plant3D"), { ssr: false });

export default function Hero() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background/80 to-muted/30">
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 px-6 py-0 lg:py-10 h-screen">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center h-full"
        >
          <Badge
            variant="secondary"
            className="rounded-full py-1 border-border px-4 flex items-center w-fit"
            asChild
          >
            <Link href="#">
              Just released v1.0.0 <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Badge>

          <h1 className="mt-6 max-w-[20ch] text-4xl md:text-5xl xl:text-[3.5rem] font-semibold leading-tight tracking-tight">
            Manage Your Plant Inventory Efficiently
          </h1>

          <p className="mt-6 max-w-[60ch] sm:text-lg text-foreground/80">
            Plantshelf helps you track, categorize, and manage your plant
            collection with ease. Add, edit, and organize your inventory with a
            clean and intuitive interface built using modern UI standards.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Button size="lg" className="rounded-full text-base" asChild>
              <Link href="/plants">
                Explore Inventory <ArrowUpRight className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <CirclePlay className="h-5 w-5" /> Watch Demo
            </Button>
          </div>
        </motion.div>

        {/* Right 3D Plant */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full flex items-center justify-center h-full"
        >
          {/* <Plant3D /> */}

          {/* Soft decorative glow */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-700/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
