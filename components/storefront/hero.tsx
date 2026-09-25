"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function StorefrontHero() {
  return (
    <section className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden bg-[#2B1A13] text-[#F4EEE3]">
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=85&w=2000&auto=format&fit=crop"
            alt="Tamraaya Hand-hammered metalware"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-70"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(43,26,19,0.84),rgba(43,26,19,0.64),rgba(43,26,19,0.24))]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,26,19,0.18),rgba(43,26,19,0.72))]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center space-y-6 px-4 py-24 text-center sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="inline-flex items-center gap-2 border border-[#B58A3C]/60 bg-[#2B1A13]/70 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#D8B875] backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#C9A96A]" />
          <span>Heritage Metalcraft &bull; Handcrafted in India</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: "easeOut" }}
          className="font-serif text-5xl leading-[0.9] tracking-[0.04em] text-[#F4EEE3] sm:text-6xl md:text-7xl lg:text-[7rem]"
        >
          TAMRAYA
          <span className="mt-3 block font-light italic tracking-[0.04em] text-[#C9A96A]">
            THE ARTISAN&apos;S HAND
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="max-w-2xl text-sm uppercase tracking-[0.18em] text-[#F4EEE3]/80 sm:text-base"
        >
          Crafted with tradition.
          <span className="mx-3 text-[#C9A96A]">•</span>
          Designed for generations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="h-[1px] w-20 bg-[#B58A3C]"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="flex w-full flex-col items-center gap-4 pt-2 sm:w-auto sm:flex-row"
        >
          <Link
            href="/collections"
            className="group inline-flex h-12 items-center justify-center gap-2 border border-[#B58A3C] bg-[#B58A3C] px-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2B1A13] transition-all duration-300 hover:bg-[#C9A96A]"
          >
            <span>Explore Collection</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/craft"
            className="inline-flex h-12 items-center justify-center border border-[#F4EEE3]/35 bg-transparent px-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F4EEE3] transition-all duration-300 hover:border-[#B58A3C] hover:text-[#C9A96A]"
          >
            Discover Our Craft
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
