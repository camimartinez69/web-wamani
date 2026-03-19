"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { content, contactInfo } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { language, setLanguage } = useLanguage()
  const t = content.nav[language]
  const contact = contactInfo.cta[language]

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [mounted])

  const navigateToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    setIsMenuOpen(false)
    setIsMobileMenuOpen(false)

    if (href.startsWith("/")) {
      router.push(href)
      return
    }

    if (href.startsWith("#")) {
      if (pathname === "/") {
        const el = document.querySelector(href)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        router.push("/" + href)
      }
    }
  }

  const handleNavClick = navigateToSection

  if (!mounted) return null

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-sand/95 backdrop-blur-md shadow-sm"
            : "bg-gradient-to-b from-carbon/50 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-20">
            <a
              href="#inicio"
              onClick={(e) => handleNavClick(e, "#inicio")}
              className="flex-shrink-0 bg-transparent"
              style={{ background: "transparent" }}
            >
              <img
                src={isScrolled ? "/logos/wamani-color-carbon.svg" : "/logos/wamani-color-bone.svg"}
                alt="Wamani"
                className="h-7 md:h-10 w-auto block"
                style={{ background: "transparent", border: "none", boxShadow: "none" }}
              />
            </a>

            <div className="flex items-center gap-2 md:gap-4">
              <a
                href="#contacto"
                onClick={(e) => handleNavClick(e, "#contacto")}
                className={`hidden md:inline-flex px-3 py-1.5 text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-carbon/70 hover:text-carbon"
                    : "text-sand/80 hover:text-sand"
                }`}
              >
                {contact.contacto}
              </a>

              <span className={`hidden md:block w-px h-5 ${isScrolled ? "bg-carbon/20" : "bg-sand/30"}`} />

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLanguage("es")}
                  className={`px-2 py-1 text-sm font-medium transition-all rounded ${
                    language === "es"
                      ? isScrolled
                        ? "text-copper font-semibold"
                        : "text-sand font-semibold"
                      : isScrolled
                        ? "text-carbon/50 hover:text-carbon"
                        : "text-sand/50 hover:text-sand"
                  }`}
                >
                  ES
                </button>
                <span className={`text-sm ${isScrolled ? "text-carbon/30" : "text-sand/40"}`}>|</span>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2 py-1 text-sm font-medium transition-all rounded ${
                    language === "en"
                      ? isScrolled
                        ? "text-copper font-semibold"
                        : "text-sand font-semibold"
                      : isScrolled
                        ? "text-carbon/50 hover:text-carbon"
                        : "text-sand/50 hover:text-sand"
                  }`}
                >
                  EN
                </button>
              </div>

              <span className={`hidden md:block w-px h-5 ${isScrolled ? "bg-carbon/20" : "bg-sand/30"}`} />

              <a
                href="#contacto"
                onClick={(e) => handleNavClick(e, "#contacto")}
                className={`hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded transition-all ${
                  isScrolled
                    ? "bg-copper text-sand hover:bg-copper/90"
                    : "bg-sand text-carbon hover:bg-sand/90"
                }`}
              >
                {contact.consultar}
              </a>

              <span className={`hidden md:block w-px h-5 ${isScrolled ? "bg-carbon/20" : "bg-sand/30"}`} />

              <div ref={menuRef} className="relative hidden md:block">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors rounded ${
                    isScrolled
                      ? "text-carbon/70 hover:text-carbon hover:bg-carbon/5"
                      : "text-sand/80 hover:text-sand hover:bg-sand/10"
                  }`}
                >
                  {t.menu}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {isMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-sand rounded-lg shadow-xl border border-carbon/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <nav className="py-2">
                      {t.items.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="block px-4 py-2.5 text-carbon/80 hover:text-carbon hover:bg-carbon/5 transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`md:hidden p-2 rounded transition-colors ${
                  isScrolled
                    ? "text-carbon hover:bg-carbon/10"
                    : "text-sand hover:bg-sand/10"
                }`}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-carbon/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-sand shadow-xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b border-carbon/10">
              <img
                src="/logos/wamani-color-carbon.svg"
                alt="Wamani"
                className="h-8 w-auto block"
                style={{ background: "transparent" }}
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-carbon/70 hover:text-carbon transition-colors rounded"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-4">
              {t.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-4 py-3 text-carbon/80 hover:text-carbon hover:bg-carbon/5 rounded transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-carbon/10 space-y-3">
                <a
                  href="#contacto"
                  onClick={(e) => handleNavClick(e, "#contacto")}
                  className="block w-full px-4 py-3 bg-copper text-sand text-center font-medium rounded hover:bg-copper/90 transition-colors"
                >
                  {contact.consultar}
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}