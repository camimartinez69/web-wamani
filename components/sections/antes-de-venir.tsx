"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { content } from "@/lib/content"
import { useLanguage } from "@/contexts/language-context"

export function AntesDeVenirSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { language } = useLanguage()
  const t = content.antesDeVenir[language]

  return (
    <section id="antes-de-venir" className="py-14 md:py-32 bg-bone">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-carbon mb-3 md:mb-4 text-balance">
            {t.title}
          </h2>
          <p className="text-carbon/70 text-base md:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-2 md:space-y-3">
          {t.items.map((item, index) => (
            <div
              key={index}
              className="border border-carbon/10 rounded-lg overflow-hidden bg-sand"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-carbon/5 transition-colors"
              >
                <span className="font-medium text-carbon text-sm md:text-base">{item.title}</span>
                <ChevronDown
                  className={`w-4 h-4 md:w-5 md:h-5 text-carbon/50 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[600px]" : "max-h-0"
                }`}
              >
                <div className="px-4 pb-4 md:px-5 md:pb-5 text-carbon/70 text-sm md:text-base leading-relaxed">
                  {typeof item.content === "string" ? (
                    <p>{item.content}</p>
                  ) : (
                    <div className="space-y-4">
                      {item.content.intro && <p>{item.content.intro}</p>}
                      {item.content.list && (
                        <ul className="list-disc list-inside space-y-2 ml-2">
                          {item.content.list.map((listItem, listIndex) => (
                            <li key={listIndex}>{listItem}</li>
                          ))}
                        </ul>
                      )}
                      {item.content.outro && <p className="mt-4">{item.content.outro}</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
