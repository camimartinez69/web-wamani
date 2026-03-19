"use client"

import { LanguageProvider } from "@/contexts/language-context"
import { WelcomePopup } from "@/components/welcome-popup"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero"
import { WamaniSection } from "@/components/sections/wamani"
import { MeaningSection } from "@/components/sections/meaning"
import { ExperienceModesSection } from "@/components/sections/experience-modes"
import { EspaciosSection } from "@/components/sections/espacios"
import { ExperienciasSection } from "@/components/sections/experiencias"
import { GaleriaPreviewSection } from "@/components/sections/galeria-preview"
import { DondeEstamosSection } from "@/components/sections/donde-estamos"
import { ComoLlegarSection } from "@/components/sections/como-llegar"
import { ConservacionPreview } from "@/components/sections/conservacion-preview"
import { AntesDeVenirSection } from "@/components/sections/antes-de-venir"
import { BitacoraSection } from "@/components/sections/bitacora"
import { ContactoSection } from "@/components/sections/contacto"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <LanguageProvider>
      <WelcomePopup />
      <Header />
      <main>
        <HeroSection />
        <WamaniSection />
        <MeaningSection />
        <ExperienceModesSection />
        <EspaciosSection />
        <ExperienciasSection />
        <GaleriaPreviewSection />
        <DondeEstamosSection />
        <ComoLlegarSection />
        <ConservacionPreview />
        <AntesDeVenirSection />
        <BitacoraSection />
        <ContactoSection />
      </main>
      <Footer />
    </LanguageProvider>
  )
}