"use client"

import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Zap, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  const themes = [
    { name: "light", icon: <Sun className="h-5 w-5" />, label: "Light" },
    { name: "dark", icon: <Moon className="h-5 w-5" />, label: "Dark" },
    { name: "pink-black", icon: <Zap className="h-5 w-5" />, label: "Cyberpunk" },
  ]

  const getCurrentIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />
      case "dark":
        return <Moon className="h-5 w-5" />
      case "pink-black":
        return <Zap className="h-5 w-5" />
      default:
        return <Palette className="h-5 w-5" />
    }
  }

  return (
    <div className="relative">
      <Button variant="outline" size="icon" className="rounded-full" onClick={toggleOpen}>
        {getCurrentIcon()}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 rounded-lg border border-border bg-card shadow-lg z-50"
          >
            <div className="p-2">
              {themes.map((t) => (
                <motion.button
                  key={t.name}
                  whileHover={{ backgroundColor: "rgba(255, 105, 180, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setTheme(t.name as any)
                    setIsOpen(false)
                  }}
                  className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                    theme === t.name ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <span className="mr-2">{t.icon}</span>
                  <span>{t.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
