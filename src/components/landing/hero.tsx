"use client"

import Image from "next/image"

import { AmbientGradient } from "./ambient-gradient"
import { HeroCTA } from "./hero-cta"
import { HeroTitle } from "./hero-title"
import { Container } from "./primitives/layout"

export function Hero() {
  return (
    <section className="pb-16">
      <Container>
        <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden border border-black/10 border-t-0 bg-white [border-bottom-left-radius:32px] [border-bottom-right-radius:32px] dark:border-white/10 dark:bg-black max-md:[border-bottom-left-radius:24px] max-md:[border-bottom-right-radius:24px]">
          <AmbientGradient color="white" position="top-right" />
          <AmbientGradient color="blue" position="bottom-left" />
          {/* Background Image */}
          <div className="pointer-events-none absolute inset-0 top-[-20px] select-none">
            <Image
              alt=""
              className="hidden h-full w-full object-cover blur-[4px] dark:block"
              draggable={false}
              height={743 * 2}
              priority
              src="/images/hero/hero-background@dark.png"
              width={1400 * 2}
            />
            <Image
              alt=""
              className="block h-full w-full object-cover blur-[2px] dark:hidden"
              draggable={false}
              height={743 * 2}
              priority
              src="/images/hero/hero-background@light.png"
              width={1400 * 2}
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center gap-[29px] px-8 pt-[48px] pb-12 text-center sm:px-16 lg:px-24">
            <HeroTitle />
            <HeroCTA />
          </div>
        </div>
      </Container>
    </section>
  )
}
